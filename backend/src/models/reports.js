//"use strict";

const mongoose = require('mongoose');

const ReportSchema  = new mongoose.Schema({
    /*reason: {
        type: String,
        enum: ["untrustworthy", "advertisement", "spam", "forbidden", "wrong category", "sexual", "fraudulent"],
        required: true
    },*/
    description: {
        type: String,
        required: true
    },
    issuer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User.username',
        required: true,
    }
},
{
	discriminatorKey: 'category'
});


// Disable versioning of db-entries, but
// enable timestamps(createdAt & updatedAt are now present).
ReportSchema.set('timestamps', true);
ReportSchema.index({issuer: 1, category: 1, reported: 1}, {unique:true});

module.exports = mongoose.model('Report', ReportSchema);
