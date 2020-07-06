//"use strict";

const mongoose = require('mongoose');
const ReportModel = require('./reports');


const ReportedActivity = ReportModel.discriminator('activity', new mongoose.Schema({
  reported: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User.username',
    required: true
  }
}));

// Export the Report model
module.exports = mongoose.model('activity');
