"use strict";

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');

const config     = require('../config');
const UserModel  = require('../models/user');
const requiredProperties  = require('../models/user_config');


//TO DO
//this is from the movie app. It must be changed
const login = async (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });

    try {
        let user = await UserModel.findOne({username: req.body.username}).exec();

        // check if the password is valid
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) return res.status(401).send({token: null});

        // if user is found and password is valid
        // create a token
        const token = jwt.sign({id: user._id, username: user.username}, config.JwtSecret, {
            expiresIn: 86400 // expires in 24 hours
        });

        return res.status(200).json({token: token});
    } catch(err) {
        return res.status(404).json({
            error: 'User Not Found',
            message: err.message
        });
    }
};


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
	
	/*
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });
    
    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a email property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'birthday')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a birthday property'
    });
    
    if (!Object.prototype.hasOwnProperty.call(req.body, 'name')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a name property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'surname')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a surname property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'gender')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a gender property'
    });
    
    if (!Object.prototype.hasOwnProperty.call(req.body, 'mobile')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a mobile property'
    });
    */

    //const user = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});
    
    UserModel.create(newUser, (err, user) => {
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
	
	/*
    try {
        let retUser = await UserModel.create(user);

        // if user is registered without errors
        // create a token
        //const token = jwt.sign({id: retUser._id, username: retUser.username}, config.JwtSecret, {
        //    expiresIn: 86400 // expires in 24 hours
        //});

        //res.status(200).json({token: token});
    } catch(err) {
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
    */
};


const me = async (req, res) => {
    try {
        let user = await UserModel.findById(req.userId).select('username').exec();

        if (!user) return res.status(404).json({
            error: 'Not Found',
            message: `User not found`
        });

        return res.status(200).json(user);
    } catch(err) {
        return res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};


module.exports = {
    login,
    register,
    logout,
    me
};
