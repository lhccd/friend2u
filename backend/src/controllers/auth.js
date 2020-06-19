"use strict";

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');


const config           = require('../config');
const UserSchema       = require('../models/user');
const AuthSchema       = require('../models/auth');
const requiredProperties  = require('../models/user_config');


const authenticationFailedCB = (res,err) => {
	if(err === 404){
		return res.status(401).json("Authentication failed");
	}
	console.log(err)
	return res.status(500).json(err);
}

const login = async (req,res) => {
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
			
			res.status(200).json(response);
			
			
			//The idea is that when you login, your refresh token is stored.
			//In this way you can manage different access and revoke tokens
			const query = {
				user: user._id
			};
			
			const update = {
				$push: {
					refreshTokens: refreshToken,
				}
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
    
    // if refresh token exists
    
    if(refreshToken) {
		
		jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
			if (err){
				console.log(err)
				return res.status(401).json({
					error: 'Unauthorized',
					message: 'Failed to authenticate token.'
				});
			}

			// if everything is good, save to request for use in other routes
			const accessToken  = jwt.sign({id: decoded.id, username: decoded.username, role: decoded.role}, config.accessTokenSecret, {expiresIn: config.accessTokenLife});
			const response = {
				"accessToken": accessToken,
			}
			// update the token in the list
			//tokenList[refreshToken].token = token
			console.log("sendin access token")
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
			if (err.code == 11000) {
				return res.status(400).json({
					error: 'User exists',
					message: err.message
				});
			} else {
				return res.status(500).json({
					error: 'Internal server error',
					message: err.message
				});
			}
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
	const all = req.query.all;
	
	const query = {
		user: id
	};
	
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


module.exports = {
    login,
    register,
    refresh_token,
    logout,
    me,
    moderator,
    changePassword
};
