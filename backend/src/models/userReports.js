//"use strict";

const mongoose = require('mongoose');
const ReportModel = require('./reports');


const ReportedUser = ReportModel.discriminator('user', new mongoose.Schema({
  reported: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
  }
}));

// Export the Report model
module.exports = mongoose.model('user');
