"use strict";

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');

const config           = require('../config');
const UserSchema       = require('../models/user');

const objectID = require('mongoose').Types.ObjectId


const makeModerator = (req, res) => {
    
    if (!Object.prototype.hasOwnProperty.call(req.body, 'user')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a user property'
    });
    
    if(!objectID.isValid(req.body.user)) return res.status(400).json({
			error: 'Bad Request',
			message: 'The provided id is not correct'
	});
    
    const update = {
		role: 'moderator',
	}
	
	const query = {
		_id: req.body.user,
		role: 'user',
	}
	
	UserSchema.findOneAndUpdate(query, update, {new: true}, (err,result) => {
		if(err){
			console.log(err);
			return res.status(500).json({
				error: 'Internal server error',
				message: 'It was not possible to update the user'
			})
		}
		else if(result){
			return res.status(200).json({message: 'The user has been promototed to moderator'})
		}
		else return res.status(404).json({message: 'The user doesn\'t exist or can\'t be promoted to moderator'})
	})
};

const revokeModerator = (req, res, type) => {
    
    if (!Object.prototype.hasOwnProperty.call(req.body, 'user')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a user property'
    });
    
    if(!objectID.isValid(req.body.user)) return res.status(400).json({
			error: 'Bad Request',
			message: 'The provided id is not correct'
	});
    
    const update = {
		role: 'user',
	}
	
	const query = {
		_id: req.body.user,
		role: 'moderator',
	}
	
	UserSchema.findOneAndUpdate(query, update, {new: true},(err,result) => {
		if(err){
			console.log(err);
			return res.status(500).json({
				error: 'Internal server error',
				message: 'It was not possible to update the user'
			})
		}
		else if(result){
			return res.status(200).json({message: 'The user has been demoted to user'})
		}
		else return res.status(404).json({message: 'The user doesn\'t exist or can\'t be demoted to user'})
	})
}





module.exports = {
	makeModerator,
	revokeModerator,
};
