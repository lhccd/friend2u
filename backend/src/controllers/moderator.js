"use strict";

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');

const config           = require('../config');
const UserSchema       = require('../models/user');
const AuthSchema       = require('../models/auth');
const ReportSchema       = require('../models/reports');
const requiredProperties  = require('../models/user_config');

const DEFAULT_TIME = 86400000 //1 day

//The momentary approach is that a moderator can block a user for a certain amount of time
//Once a user is blocked all the reports about him are deleted
const blockUser = (req,res) => {
	if (!Object.prototype.hasOwnProperty.call(req.body, 'banningUser')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a banningUser property'
    });
    
    var time = req.body.time || DEFAULT_TIME;
    
    UserSchema.findOneAndUpdate({_id: req.body.banningUser, role: 'user'}, {$set: {banUntilDate: Date.now() + time}},{new: true},(err, user) => {
		if(err) return res.status(400).json({"error": err});
		if(!user) return res.status(404).json({"error": "The user doesn't exist. Are you trying to ban a moderator?"}); //No civil war!
		
		ReportSchema.deleteMany({category: 'user', reported: req.body.banningUser},(err,result) => {
			if(err) console.log(err)
			else console.log(result)
		})
		
		return res.status(200).json({"message": "user banned"})
	})
    
}

const unblockUser = (req,res) => {
	if (!Object.prototype.hasOwnProperty.call(req.body, 'unbanningUser')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a unbanningUser property'
    });

    
    UserSchema.findOneAndUpdate({_id: req.body.unbanningUser, role: 'user'}, {$unset: {banUntilDate: ""}},(err, user) => {
		if(err) return res.status(400).json({"error": "The user doesn't exist"});
		console.log(user)
		return res.status(200).json({"message": "user unbanned"})	
	})
    
}

//--------------------------------------------------------------------------------------------
//An activity is deleted once and for all
const removeActivity = (req,res) => {
	
}

//--------------------------------------------------------------------------------------------

const listReports = (req,res,type) => {
	
	//In any case I don't want to return too many results
	const limit = (req.query.limit && !isNaN(req.query.limit) && parseInt(req.query.limit) < 50)?parseInt(req.query.limit):50;
	
	let query = {
		category: type
	}
	
	if(req.query.timestamp) query.createdAt = { $gt : req.query.timestamp }
	if(req.params.id) query.reported = req.params.id
	
	console.log('here')
	
	ReportSchema.find(query, null, {limit: limit}).populate('reported', ['username']).exec((err, reports) => {
		if(err) return res.status(500).send(err);
		
		let ret = {}
		
		let last_timestamp;
		if(reports.length !== 0){
			ret.reports = reports
			ret.last_timestamp = reports[reports.length - 1].createdAt
		}
		else{
			ret.reports = []
		}
		
		return res.status(200).json(ret)
	})
}

const groupReportsById = (req,res,type) => {
	
	//In any case I don't want to return too many results
	const limit = (req.query.limit && !isNaN(req.query.limit) && parseInt(req.query.limit) < 50)?parseInt(req.query.limit):50;
	const skip = (req.query.skip && !isNaN(req.query.skip))?parseInt(req.query.skip):0;
	
	let query = {
		category: type
	}
	
	const aggregatorOpts = [
		{
			$group: {
				_id: "$reported",
				count: { $sum: 1 }
			}
		},
		{
			$sort: {
				count: -1,
				_id: 1,
			}
		},
		{
			$skip: skip,
		},
		{
			$limit: limit,
		},
		{
			$lookup: {
				from: UserSchema.collection.name,
				localField: '_id',
				foreignField: '_id',
				as: 'reported'
			}
		},
		{
			"$project": {
				"reported.username": 1,
				"reported.banUntilDate": 1,
				"count": 1.
			 }
		 }
	]
	
	ReportSchema.aggregate(aggregatorOpts, (err, reports) => {
		if(err) return res.status(500).send(err);
		console.log(reports)
		let ret = {}
		
		let last_timestamp;
		if(reports.length !== 0){
			ret.reports = reports
		}
		else{
			ret.reports = []
		}
		
		return res.status(200).json(ret)
	})
}

// Remove an existing report by id.
const removeReport = (req, res) => {
	if (!Object.prototype.hasOwnProperty.call(req.body, 'id')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a id property'
    });
    
    ReportSchema.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Report with id ${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_remove',
            message: error.message
        }));
};


const removeReportsByReported = (req, res, type) => {
    
    var query = {
		reported: req.params.id,
		category: type
	}
	
	ReportSchema.deleteMany(query,(err,result) => {
		if(err){
			console.log(err);
			return res.status(500).json({
				error: 'Internal server error - activities_remove',
				message: error.message
			})
		}
		else{
			console.log(result)
			return res.status(200).json({message: `${result.deletedCount} reports have been deleted`})
		}
	})
};





module.exports = {
    blockUser,
    unblockUser,
    listReports,
    groupReportsById,
    removeReport,
    removeReportsByReported
};
