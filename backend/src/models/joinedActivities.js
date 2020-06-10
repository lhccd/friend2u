"use strict";

const mongoose = require('mongoose');

// In this Schema the relation between joined users and acitivity is stored;
//  '-> Better access to joined activities.

const JoinedActivitySchema = new mongoose.Schema({
    activityID: {
        type: String,
        required: true
    },
    joinedPersonID: {
        type: String,
        required: true
    }
})


JoinedActivitySchema.set('versionKey', false);
JoinedActivitySchema.set('timestamps', true);


module.exports = mongoose.model('JoinedActivity', JoinedActivitySchema);