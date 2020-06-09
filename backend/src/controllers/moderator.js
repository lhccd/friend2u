"use strict";

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');

const config           = require('../config');
const UserSchema       = require('../models/user');
const AuthSchema       = require('../models/auth');
const UserReportSchema       = require('../models/reports/user');
const ActivityReportSchema       = require('../models/reports/user');
const requiredProperties  = require('../models/user_config');

const DEFAULT_TIME = 86400000 //1 day

//The momentary approach is that a moderator can block a user for a certain amount of time
const blockUser = (req,res) => {
	if (!Object.prototype.hasOwnProperty.call(req.body, 'banningUser')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a banningUser property'
    });
    
    var time = req.body.time || DEFAULT_TIME;
    
    UserSchema.findOneAndUpdate({_id: req.body.banningUser, role: 'user'}, {$set: {banUntilDate: Date.now() + time}},{new: true},(err, user) => {
		if(err) return res.status(400).json({"error": err});
		if(!user) return res.status(404).json({"error": "The user doesn't exist. Are you trying to ban a moderator?"}); //No civil war!
		console.log(user)
		return res.status(200).json({"message": "user banned"})	
	})
    
}

const unblockUser = (req,res) => {
	if (!Object.prototype.hasOwnProperty.call(req.body, 'unbanningUser')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a banningUser property'
    });
    
    var time = req.body.time || DEFAULT_TIME;
    
    UserSchema.findOneAndUpdate({_id: req.body.banningUser, role: 'user'}, {$unset: {banUntilDate: ""}},(err, user) => {
		if(err) return res.status(400).json({"error": "The user doesn't exist"});
	
		return res.status(200).json({"message": "user unbanned"})	
	})
    
}

//--------------------------------------------------------------------------------------------
//An activity is deleted once and for all
const removeActivity = (req,res) => {
	
}

//--------------------------------------------------------------------------------------------

const listReports = (req,res,type) => {
	var schema = (type == 'user')?UserReportSchema:ActivityReportSchema;
	
	schema.find({}, (err, reports) => {
		if(err) return res.status(500).send(err);
		
		return res.status(200).json({list: reports})
	})
}


module.exports = {
    blockUser,
    unblockUser,
    listReports
};
