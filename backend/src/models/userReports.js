//"use strict";

const mongoose = require('mongoose');
const ReportModel = require('./reports');


const ReportedUser = ReportModel.discriminator('user', new mongoose.Schema({
  reported: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  },
  reason: {
        type: String,
        enum: ["untrustworthy", "advertisement", "spam", "unavailable", "sexual", "fraudulent"],
        required: true
    },
}));

//ReportedUser.index({issuer:1, category:1, reported:1}, {unique:true});

// Export the Report model
module.exports = mongoose.model('user');
