//"use strict";

const mongoose = require('mongoose');

// Definition of Activity-Schema;
// As we do have four categories (sport, food, entertainment and others),
// also different categorie-specific data has to be stored
//  '-> One Schema and check for data-completeness during storing.

const ActivitySchema  = new mongoose.Schema({
    categorie: {
        type: String,
        enum: ['Sport', 'Food', 'Entertainment', 'Others'],
        //default: 'Others',
        required: true
    },
    activityName: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true
    },
    approxTime: {
        type: Boolean,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    prefGender: {
        type: String,
        enum: ['Female', 'Male', 'Other', 'NotDeclared'],
        //default: 'NotDeclared',
        required: true
    },
    fromAge: {
        type: Number,
        min: 18,
        required: true
    },
    toAge: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // Price has to be mentioned for every categorie.
    price: {
        type: Number,
        min: 1,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: props => `The price (${props.value}) is NOT allowed to have decimals!`
        },
        required: true
    },
    // The following attributes are categorie-specific
    //  '-> Not mandatory!
    // For categorie: Sport.
    phyCondition: {
        type: Number,
        min: 1,
        max: 4,
        validate: {
            validator: Number.isInteger,
            message: 'The physical condition is NOT allowed to have decimals!'
        }
    },
    // For categorie: Food.
    kitchen: {
        type: String,
        enum: ['Italian', 'Japanese', 'Chinese', 'German', 'FastFood', 'StreetFood', 'Other'],
        //default: 'Japanese'
    },
    // For categorie: Entertainment.
    title: String




    /*
    synopsis: String,
    runtime: Number,
    mpaa_rating: String,
    year: {
        type: Number,
        required: true
    },
    posters: {
            thumbnail: String,
            profile: String,
            detailed: String,
            original: String
        }
        */
});



// Disable versioning of db-entries, but 
// enable timestamps(createdAt & updatedAt are now present).
ActivitySchema.set('versionKey', false);
ActivitySchema.set('timestamps', true);



/*
const ActivityModel = mongoose.model('Activity', ActivitySchema);

var test

try {
    test = new ActivityModel({
    activity_name: "Test"
});
}
catch(e) {
    console.log(e)
}


console.log(test);


*/


// Export the Movie model
module.exports = mongoose.model('Activity', ActivitySchema);