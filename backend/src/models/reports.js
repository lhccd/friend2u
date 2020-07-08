//"use strict";

const mongoose = require('mongoose');

// Definition of Activity-Schema;
// As we do have four categories (sport, food, entertainment and others),
// also different categorie-specific data has to be stored
// '-> One Schema and check for data-completeness during storing.

const ReportSchema  = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId, ref: 'User.username',
    }
},
{
	discriminatorKey: 'category'
});


// Disable versioning of db-entries, but
// enable timestamps(createdAt & updatedAt are now present).
ReportSchema.set('timestamps', true);
ReportSchema.index({issuer:1, category:1, reported:1}, {unique:true});

module.exports = mongoose.model('Report', ReportSchema);
