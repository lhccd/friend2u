"use strict";

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');

const config           = require('../config');
const UserSchema       = require('../models/user');
const ActivitySchema       = require('../models/activities');
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
    
    
    
    //If the request contains the property 'forever' the prop time will be ignored and the banTime will be -1 (special value which means forever)
    
    var time = 0;
    
    if(Object.prototype.hasOwnProperty.call(req.body, 'forever')) time = -1;
    else if(req.body.time && !isNaN(req.body.time) && Number.isInteger(+(req.body.time)) && +(req.body.time) > 0) time = Date.now() + +(req.body.time);
    else time = Date.now() + DEFAULT_TIME;
    
    let query = {
		_id: req.body.banningUser,
		role: 'user',
	}
	
	if(time !== -1){
		query.banUntilDate = {
			$ne: -1,
			$lt: time
		}
	} 
		
    
    //We can't set the banning time lower than the actual one
    UserSchema.findOneAndUpdate(query, {$set: {banUntilDate: time}},{new: true},(err, user) => {
		if(err) return res.status(400).json({"error": err});
		if(!user) return res.status(404).json({"error": "You can\'t ban a moderator or set a banning time lower then the actual one. Or the user doesn't exist. "}); //No civil war!
		
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
	
	const projection = (type === 'user')?'username':'activityName';

	ReportSchema.find(query, null, {limit: limit}).populate('reported', ['_id']).exec((err, reports) => {
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
	
	let projection = (type === 'user')?{"$project": {"reported.username": 1,"reported.banUntilDate": 1,"count": 1}}:{"$project": {"reported.activityName": 1,"count": 1}}
	
	const aggregatorOpts = [
		{
			$match: {
				category: type
			}
		},
		{
			$group: {
				_id: "$reported",
				count: { $sum: 1 }
			}
		},
		{
			$sort: {
				count: -1,
				_id: -1,
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
				from: type === 'user'?UserSchema.collection.name:ActivitySchema.collection.name,
				localField: '_id',
				foreignField: '_id',
				as: 'reported'
			}
		},
		projection
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
