//"use strict";

const mongoose = require('mongoose');

// Definition of Activity-Schema;
// As we do have four categories (sport, food, entertainment and others),
// also different categorie-specific data has to be stored
// '-> One Schema and check for data-completeness during storing.

const ReportSchema  = new mongoose.Schema({
    category: {
        type: String,
        enum: ['user', 'activity'],
        required: true
    },
    reason: {
        type: String,
        enum: ["untrustworthy", "advertisement", "spam", "forbidden", "wrong category", "sexual", "fraudulent"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    issuer: {
        type: String,
    },
    reported: {
        type: String,
    }
});

// Disable versioning of db-entries, but
// enable timestamps(createdAt & updatedAt are now present).
ReportSchema.set('versionKey', false);
ReportSchema.set('timestamps', true);
ReportSchema.set({issuer:1, activity:1}, {unique:true});

// Export the Report model
module.exports = mongoose.model('Report', ReportSchema);
