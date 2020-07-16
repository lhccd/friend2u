"use strict";

const jwt         = require('jsonwebtoken');
const bcrypt      = require('bcryptjs');
const nodemailer  = require('nodemailer');

const config              = require('../config');
const UserSchema          = require('../models/user');
const AuthSchema          = require('../models/auth');
const requiredProperties  = require('../models/user_config');


const transporter = nodemailer.createTransport({
	host: 'smtp.office365.com', // Office 365 server
	port: 587,     // secure SMTP
	secure: false,
	auth: {
		user: config.email_address,
		pass: config.email_password
	},
	tls: {
		ciphers: 'SSLv3'
	}
})



const authenticationFailedCB = (res,err) => {
	if(err === 404){
		return res.status(404).json({"error": "Not found", "message":"Authentication failed"});
	}
	console.log(err)
	return res.status(500).json(err);
}

const login = async (req,res) => {
	
	console.log(req.body)
	
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

	
	//Login with username only
	//Can be added email login
    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });
 
    
    UserSchema.findOne({username: req.body.username}, (err, user) => {
		if(err) return authenticationFailedCB(res,err);
		if(!user) return authenticationFailedCB(res,404);
		
		user.comparePassword(req.body.password, (err,match) => {
			//If an error occured or if the passwords didn't match we throw an error
			if(err) return authenticationFailedCB(res,err);
			if(!match) return authenticationFailedCB(res,404);
			
			//Otherwise we generate the tokens
			//The access token contains only the id and the username of the user
			
			const payload = {id: user._id, username: user.username, role: user.role}
			
			if(user.banUntilDate) payload.banTime = user.banUntilDate;
			
			const accessToken  = jwt.sign(payload, config.accessTokenSecret, {expiresIn: config.accessTokenLife});
			const refreshToken = jwt.sign(payload, config.refreshTokenSecret, {expiresIn: config.refreshTokenLife});
			
			console.log('[*] User logged in: ' + accessToken); 
			
			const response = {
				"accessToken": accessToken,
				"refreshToken": refreshToken,
			}
			
			/*res.cookie('refreshToken', refreshToken, {
				maxAge: config.refreshTokenLife,
				httpOnly: true,
				sameSite: 'strict',
			});*/
			
			res.status(200).json(response);
			
			
			//The idea is that when you login, your refresh token is stored.
			//For the moment we only allow one access at a time do the old refresh token is replaced by the new one
			//
			// It could be possible to add a refresh token for device.
			//
			const query = {
				user: user._id
			};
			
			const update = {
				refreshToken: refreshToken
			};
			
			const options = {
				upsert: true,
				new: true,
				setDefaultsOnInsert: true
			};
			
			AuthSchema.findOneAndUpdate(query, update, options, (err,o) => {
				if(err) console.log(err)
				console.log(o)
			})
			
		})
	})

};



const refresh_token = async (req,res) => {
    // refresh the token
    const refreshToken = req.body.refreshToken
    //console.log(req.cookies)
    //const refreshToken = req.cookies['refreshToken']
    
    if(refreshToken) {
		
		//check if token exists
		try{
			console.log(req.id)
			const user = await AuthSchema.findOne({user: req.id});
			console.log(user)
			if(!user.refreshToken || user.refreshToken !== refreshToken) throw new Error("Invalid token!")
		}
		catch(err){
			console.log(err)
			return res.status(401).json({
				error: 'Unauthorized',
				message: 'Failed to authenticate token.'
			});
		}
		
		jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
			if (err){
				console.log(err)
				return res.status(401).json({
					error: 'Unauthorized',
					message: 'Failed to authenticate token.'
				});
			}

			// if everything is good, save to request for use in other routes
			const accessToken = jwt.sign({id: decoded.id, username: decoded.username, role: decoded.role}, config.accessTokenSecret, {expiresIn: config.accessTokenLife});
			const response = {
				"accessToken": accessToken,
			}
			// update the token in the list
			//tokenList[refreshToken].token = token
			console.log("sending access token")
			res.status(200).json(response);    
		});
		
    } else {
        res.status(401).json({
			error: 'Unauthorized',
			message: 'Invalid request'
		});
    }
}




//For the registration we require all the information to be given
const register = async (req,res) => {
	
	var newUser = {}
	
	for(var prop of requiredProperties){
		if (!Object.prototype.hasOwnProperty.call(req.body, prop)) return res.status(400).json({
			error: 'Bad Request',
			message: `The request body must contain a ${prop} property`
		});
		else newUser[prop] = req.body[prop];
	};

    
    UserSchema.create(newUser, (err, user) => {
		if(err){
			let message = {};
			let status = 401;
			let error = 'Error'
			switch (err.name) {
				case 'ValidationError':
					for(let field in err.errors) {
						message[field] = err.errors[field].message
					}
					error = 'Invalid user'
					break;
				case 'MongoError':
					if(err.code = 11000){
						error= 'User exists'
						message = `A user with this ${Object.keys(err.keyPattern)[0]} already exists`
					}
					else{
						message = 'Internal server error'
					}
					break;
				default:
					message = 'Internal server error';
					status = 500;
			}
			
			return res.status(status).json({
				error: error,
				message: message,
			})
			
		}
		else{
			return res.status(200).json({
				id: user._id,
			})
		}
		
	});

};


const me = async (req, res) => {
    return res.status(200).json({id:req.id, username: req.username, role: req.role})
}

const moderator = (req,res) => {
	return res.status(200).json({message: 'Hello moderator ' + req.username})
}

const changePassword = (req,res) => {
	
	if (!Object.prototype.hasOwnProperty.call(req.body, 'oldPassword')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain an oldPassword property'
    });
	
	if (!Object.prototype.hasOwnProperty.call(req.body, 'newPassword')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a newPassword property'
    });
	
	const id = req.id;
	
	UserSchema.findById(id, (err, user) => {
		if(err) return authenticationFailedCB(res,err);
		if(!user) return authenticationFailedCB(res,404);
		
		user.updatePassword(req.body.oldPassword, req.body.newPassword, (err) => {
			//If an error occured or if the passwords didn't match we throw an error
			if(err) return authenticationFailedCB(res,err);
			
			const response = {
				"ok": true,
				"message": "Password changed succesfully!",
			}
			
			return res.status(200).json(response);		
			
		})
	})
}

//For the logout the refresh token is required so that it can be deleted from the array/storage.
//The access token is not deleted but the short expiration is set for this reason.
const logout = (req, res) => {
	const refreshToken = req.body.refreshToken
	const id = req.id
	//const all = req.query.all;
	
	const query = {
		user: id
	};
	
	var update = {
		$unset: {
			refreshToken: 1,
		}
	}
	
	/*
	var update = {}
	if(all)
		update = {
			$set: {
				refreshTokens: [],
			}
		};
	else
		update = {
			$pull: {
				refreshTokens: refreshToken,
			}
		};
	*/
	
	const options = {
		new: true,
		setDefaultsOnInsert: true
	};
	
    AuthSchema.findOneAndUpdate(query, update, options, (err,auth) => {
		
		if(err) console.log(err)
		console.log(auth)
		return res.status(200).send({ message: 'Logout successful!' });
		
	});

};





//----------------------------------------------------------------------------------
// Functions for password reset

const createTokenFromPassword = (password,id) => {
	
	//We use our secrete and the password to create a new secret for the token
	const secret = password + "-" + config.resetPasswordSecret
	
	//We sign the id of the user requesting for the password
	const token = jwt.sign({id: id}, secret, {expiresIn: config.resetPasswordLife});
	
	return token;

}

const resetPasswordEmailTemplate = (email, name, url) => {
	const from = config.email_address
	const to = email
	const subject = "Friend2U Password Reset"
	const html = `<p>Hey ${name},</p>
				  <p>It seems that you asked for a password reset.</p>
			      <p>You can use the following link to reset your password:</p>
			      <a href=${url}>${url}</a>
			      <p>If you didn't ask for a password reset you can ignore this email</p>
			      <p>Hope you enjoyed our application! </p>
			      <p>---Friend2U team---</p>
				  `

	return { from, to, subject, html }
}

//Send Password Link
const sendPasswordResetEmail = (req, res) => {
	if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a email property'
    });
    
    const email = req.body.email;
    
    UserSchema.findOne({email: email}, (err, user) => {
		if(err) return authenticationFailedCB(res,err);
		else if(!user) return res.status(404).json({ok: false, message: "No user with that email"});
		
		const token = createTokenFromPassword(user.password, user._id);
		const url = `http://localhost:8000/#/password/reset/${user._id}/${token}`;
		const template = resetPasswordEmailTemplate(user.email, user.name, url);
	
		//return res.status(200).json({ok: true, urls: url})	
		
		
		transporter.sendMail(template, (err, info) => {
			if (err) {
				return authenticationFailedCB(res,err);
			}

			console.log(`** Email sent **`, info.response)
			
			return res.status(200).json({"ok": true, "message": "Email sent successfully"})
		})
		
		
	})
}

//Reset password with link
const resetPassword = (req, res) => {
	if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });
    
    const password = req.body.password
    const { id, token } = req.params
    
    //First we find the user by id
    UserSchema.findById(id, (err, user) => {
		if(err) return authenticationFailedCB(res,err);
		else if(!user) return res.status(404).json({ok: false, message: "No user found"});
		
		const secret = user.password + "-" + config.resetPasswordSecret
		
		jwt.verify(token, secret, (err, decoded) => {
			if (err){
				console.log(err)
				return res.status(400).json({
					error: 'Token invalid',
					message: 'The token provided is invalid',
				});
			}
			
			
			user.comparePassword(password,(err, match) => {
				if(err) return authenticationFailedCB(res,err);
				if(match) return res.status(400).json({error: "Update error", message: "The new password should be different from the old one"});
				
				UserSchema.findByIdAndUpdate(id, {password: password}, {new: true}, (err, user) => {
					if(err) return authenticationFailedCB(res,err);
					console.log(user)
					return res.status(200).json({ok: true, message: "Password updated successfully"})
				})
			})
		})
		
	})
    
    
	
} 


module.exports = {
    login,
    register,
    refresh_token,
    logout,
    me,
    moderator,
    changePassword,
    sendPasswordResetEmail,
    resetPassword
};
