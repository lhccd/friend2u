"use strict";

const config = require ('../config');

const ActivitySchema = require('../models/activities');


const isUserCreatorOfActivity = (req, res, next) => {
	if (!Object.prototype.hasOwnProperty.call(req.body, 'activity')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain an activity property'
    });
	
	ActivitySchema.findById(req.body.activity, (err, activity) => {
		if(err) return res.json(500).json({status: "error", message: err})
		if(!activity) return res.json(404).json({status: "error", message: "The activity doesn't exist"})
		if(activity.creator != req.id) return res.json(403).json({status: "Forbidden", message: "You are not allowed to access this resource"})
		
		next();
	});

};


module.exports = {
    isUserCreatorOfActivity,
};
