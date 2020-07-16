//"use strict";

const mongoose = require('mongoose');
const ReportModel = require('./reports');


const ReportedActivity = ReportModel.discriminator('activity', new mongoose.Schema({
	reported: {
		type: mongoose.Schema.Types.ObjectId, ref: 'Activity',
		required: true
	},
	reason: {
		type: String,
		enum: ["untrustworthy", "advertisement", "spam", "unavailable", "sexual", "fraudulent"],
        required: true
     },
  
}));

// Export the Report model
module.exports = mongoose.model('activity');
