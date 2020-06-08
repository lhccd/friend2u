"use strict";

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');


const config           = require('../config');
const UserSchema       = require('../models/user');
const requiredProperties  = require('../models/user_config');

//Now we use a list
//Must be lift to a DB
const tokenList = {}

//TO DO
//this is from the movie app. It must be changed
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

    const cb = (err) => {
		if(err === 404){
			return res.status(401).json("Authentication failed");
		}
		console.log(err)
		return res.status(500).json(err);
	}
    
    UserSchema.findOne({username: req.body.username}, (err, user) => {
		if(err) return cb(err);
		if(!user) return cb(404);
		
		user.comparePassword(req.body.password, (err,match) => {
			//If an error occured or if the passwords didn't match we throw an error
			if(err) return cb(err);
			if(!match) return cb(404);
			
			//Otherwise we generate the tokens
			//The access token contains only the id and the username of the user
			const accessToken  = jwt.sign({id: user._id, username: user.username, role: user.role}, config.accessTokenSecret, {expiresIn: config.accessTokenLife});
			const refreshToken = jwt.sign({id: user._id, username: user.username, role: user.role}, config.refreshTokenSecret, {expiresIn: config.refreshTokenLife});
			
			console.log('[*] User logged in: ' + accessToken); 
			
			const response = {
				"accessToken": accessToken,
				"refreshToken": refreshToken,
			}
			
			tokenList[refreshToken] = response;
			
			res.status(200).json(response);		
			
		})
	})

};



const token = async (req,res) => {
    // refresh the token
    const refreshToken = req.body.token
    // if refresh token exists
    
    if((refreshToken) && (refreshToken in tokenList)) {
		
		jwt.verify(refreshToken, config.refreshTokenSecret, (err, decoded) => {
			if (err){
				console.log(err)
				return res.status(401).send({
					error: 'Unauthorized',
					message: 'Failed to authenticate token.'
				});
			}

			// if everything is good, save to request for use in other routes
			const accessToken  = jwt.sign({id: decoded.id, username: decoded.username, role: decoded.role}, config.accessTokenSecret, {expiresIn: config.accessTokenLife});
			const response = {
				"token": accessToken,
			}
			// update the token in the list
			tokenList[refreshToken].token = token
			res.status(200).json(response);    
		});
		
    } else {
        res.status(404).send('Invalid request')
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


//For the logout the refresh token is required so that it can be deleted from the array/storage.
//The access token is not deleted but the short expiration is set for this reason.
const logout = (req, res) => {
	const refreshToken = req.body.token
    
    if((refreshToken) && (refreshToken in tokenList)) {
		delete tokenList[refreshToken];
    }
	
    res.status(200).send({ token: null });
};


module.exports = {
    login,
    register,
    token,
    logout,
    me,
    moderator
};
