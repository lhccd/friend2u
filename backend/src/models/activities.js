"use strict";

const mongoose = require('mongoose');

// Definition of Activity-Schema;
// As we do have four categories (sport, food, entertainment and others),
// also different categorie-specific data has to be stored
//  '-> One Schema and check for data-completeness during storing.

const ActivitySchema  = new mongoose.Schema({
    category: {
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
        default: 18
    },
    toAge: {
        type: Number,
        default: 150
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
            message: props => `The physical condition (${props.value}) is NOT allowed to have decimals!`
        }
    },
    // For categorie: Food.
    kitchen: {
        type: String,
        enum: ['Italian', 'Japanese', 'Chinese', 'German', 'FastFood', 'StreetFood', 'Other'],
        //default: 'Japanese'
    },
    // For categorie: Entertainment.
    title: String,


    // Additional internal information about the activity.
    // List of participants.
    participants: [String],

    // Status: 0=Open for joining, 1=Person selected, 2=Blocked;
    // Activity can be seen as finished, when person was selected (status==1) and duration has expired.
    status: {
        type: Number,
        min: 0,
        max: 2,
        validate: {
            validator: Number.isInteger,
            message: props => `The status (${props.value}) is NOT allowed to have decimals!`
        },
        required: true
    },

    // Storing the ID of the creator.
    creator: String,

    // Storing the selected persons ID.
    selPerson: String,

    // Storing the vote from the selPerson for the creator.
    voteForCreator: {
        type: Number,
        min: 0,
        max: 2,
        validate: {
            validator: Number.isInteger,
            message: props => `The voteForCreator (${props.value}) is NOT allowed to have decimals!`
        },
        default: 1
    },

    // Storing the vote from the creator for the selPerson.
    voteForselPerson: {
        type: Number,
        min: 0,
        max: 2,
        validate: {
            validator: Number.isInteger,
            message: props => `The voteForselPerson (${props.value}) is NOT allowed to have decimals!`
        },
        default: 1
    },

    // Storing the location of the Activity by usage of an GeoJSON-Object;
    // See also: https://mongoosejs.com/docs/geojson.html
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          default: 'Point'
        },
        coordinates: {
          type: [Number],
          required: true
        },
      }






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


ActivitySchema.index({ location: '2dsphere', activityName: 'text' });


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
