"use strict";

const mongoose = require('mongoose');

const schema  = {	
    issuer: {
        type: String,
        required: true
    },
    
    user: {
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

const UserReportSchema  = new mongoose.Schema(schema)

UserReportSchema.index({issuer: 1, activity: 1},{unique: true});

UserReportSchema.set('versionKey', false);

module.exports = mongoose.model('UserReport', UserReportSchema);
