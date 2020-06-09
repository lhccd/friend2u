"use strict";

const mongoose = require('mongoose');

const schema  = {	
    issuer: {
        type: String,
        required: true
    },
    
    activity: {
		type: String,
		required: true
	},
	
	reason: {
		type: String,
		enum: ['untrustworthy','advertisement','spam','forbidden','wrong category','sexual','fraudolen'],
		required: true,
	},
	
	message: {
		type: String,
		default: "",
	}
};

const ActivityReportSchema  = new mongoose.Schema(schema)

ActivityReportSchema.index({issuer: 1, activity: 1},{unique: true});

ActivityReportSchema.set('versionKey', false);

module.exports = mongoose.model('ActivityReport', ActivityReportSchema);
