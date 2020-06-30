"use strict";

const ActivityModel = require('../models/activities');
const UserModel = require('../models/user');
const stringSimilarity = require('string-similarity');

// Creating a new DB-Entrie for a new activity.
const create = (req, res) => {
    // Check whether there is something to store in our DB.
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    // Try to crate an activity.
    ActivityModel.create(req.body)
        .then(activity => res.status(201).json(activity))
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_create',
            message: error.message
        }));
};

// Reading an existing activity.
const read   = (req, res) => {
    ActivityModel.findById(req.params.id).exec()
        .then(activity => {

            if (!activity) return res.status(404).json({
                error: 'Not Found',
                message: `Activity not found`
            });

            res.status(200).json(activity)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error - activities_read',
            message: error.message
        }));
};


// Updating an existing activity.
const update = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    // console.log(req.body);

    ActivityModel.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true}).exec()
        .then(activity => res.status(200).json(activity))
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_update',
            message: error.message
        }));
};

// Add a person to the participants-list.
const joined = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    ActivityModel.findByIdAndUpdate(req.params.id, { $addToSet: {participants: req.body.newParticipant}},{
        new: true,
        runValidators: true}).exec()
        .then(activity => res.status(200).json(activity))
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_joined',
            message: error.message
        }));

}

// Get a list of all joined persons of an activity;
// Final selections still has to take place.
const listOfJoinedPersons = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    ActivityModel.findById(req.params.id).exec()
        .then(result => {
            res.status(200).json(result.participants)
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_listOfJoinedPersons',
            message: error.message
        }));
}


// Should the participant NOT have joined the activity yet,
// then the return value is -1; Otherwiese greater than -1.
const alreadyJoined = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    ActivityModel.findById(req.params.id).exec()
        .then(result => {
            if(result.participants.indexOf(req.body.newParticipant) > -1) {
                res.status(200).json({result: true})
            } else {
                res.status(200).json({result: false})
            }
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_alreadyJoined',
            message: error.message
        }));
}
// Returns true if activity with corresponding id exists 
// and false otherwise
const ActivityExists = (req, res) => {
    ActivityModel.findById(req.params.id).exec()
        .then(activity => {
            if (!activity) {
                res.status(200).json({result: false})
            } else {
                res.status(200).json({result: true})
            }
            //console.log(res)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error - activities_read',
            message: error.message
        }));
}

// Remove a person from the participants-list.
const unjoin = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    
    //ActivityModel.collection.drop();

    ActivityModel.findByIdAndUpdate(req.params.id, { $pull: {participants: req.body.oldParticipant}},{
        new: true,
        runValidators: true}).exec()
        .then(activity => res.status(200).json(activity))
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_unjoin',
            message: error.message
        }));

}

// Set vote for participant.
const creatorVoteForParticipant = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    ActivityModel.findByIdAndUpdate(req.params.id, { voteForselPerson: req.body.voteForselPerson},{
        new: true,
        runValidators: true}).exec()
        .then(activity => res.status(200).json(activity))
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_creatorVoteForParticipant',
            message: error.message
        }));

}

// Set vote for creator.
const participantVoteForCreator = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    ActivityModel.findByIdAndUpdate(req.params.id, { voteForCreator: req.body.voteForCreator},{
        new: true,
        runValidators: true}).exec()
        .then(activity => res.status(200).json(activity))
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_participantVoteForCreator',
            message: error.message
        }));

}


// Change the status of an activity;
// Do NOT forget to also set the selected person,
// when setting the status from 0 to 1!
const changeStatus = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    ActivityModel.findByIdAndUpdate(req.params.id, { status: req.body.newStatus},{
        new: true,
        runValidators: true}).exec()
        .then(activity => {res.status(200).json(activity)})
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_creatorVoteForParticipant',
            message: error.message
        }));

}

// Set the selected person for an activity
const setSelectedPerson = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    ActivityModel.findByIdAndUpdate(req.params.id, { selPerson: req.body.selPerson},{
        new: true,
        runValidators: true}).exec()
        .then(activity => {res.status(200).json(activity)})
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_creatorVoteForParticipant',
            message: error.message
        }));

}



// Remove an existing activity.
const remove = (req, res) => {
    ActivityModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Activity with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_remove',
            message: error.message
        }));
};

// List all existing activities.
const list  = (req, res) => {
    ActivityModel.find({}).exec()
        .then(activities => res.status(200).json(activities))
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_list',
            message: error.message
        }));
};

// Find activities within a radius;
// Minimum is fixed to 0m, but maximum has to be provided in body.
const getActivitiesInRadius = ((req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    ActivityModel.find({
        location: {
            $near: {
                // Note: First comes longitude and then latitude!
                // Distances are given in Meteres
                $geometry: { type: "Point",  coordinates: [ req.body.long, req.body.lat ] },
                $minDistance: 0,
                $maxDistance: req.body.maxDistance
                }
            }
        })
    .exec()
    .then(activities => res.status(200).json(activities))
    .catch(error => res.status(500).json({
        error: 'Internal server error - activities_list',
        message: error.message
    }));
})


// Search for an activity with specified parameters.
const search = (async(req, res) => {

    console.log("Request was made with: ")
    console.log(req.body)

    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    // Should an activity match all the filters,
    // only then it will be appended to the ressearch-array.
    var ressearch = []
    // Narrow the result of activities down, by Timeframe, Category, Status and Location.
    var resdtandc = await ActivityModel
        .find({
            location: {
                $near: {
                    // Note: First comes longitude and then latitude!
                    // Distances are given in Meteres
                    $geometry: { type: "Point",  coordinates: [ req.body.long, req.body.lat ] },
                    $minDistance: 0,
                    $maxDistance: req.body.maxDistance
                    }
                }
            ,
            dateTime: { 
                $lt: new Date(req.body.toTime), //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()+req.dtpm)),
                $gte: new Date(req.body.fromTime) //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()-req.dtpm))
            },
            category: req.body.category,
            status: 0
    })
    .catch(error => res.status(500).json({
        error: 'Internal server error - activities_search_find',
        message: error.message
    }));

    // For every found activity, narrow the result further down.
    for(var i=0; i<resdtandc.length; i++) {
        // First compare the age of the creator with the filter set by the searcher.
        var rescrator = await UserModel.findById(resdtandc[i]["creator"])
        // Calculate the age of the creator, by using a separate function.
        var ageOfCreator = getAge(rescrator["birthday"])
        // Only if creator-age matches move further on.
        if(ageOfCreator>=req.body.fromAge && ageOfCreator<=req.body.toAge) {
            // Now we have to do the same age-check vice versa
            // => Match the searcher age to the one specified in the activity.
            var ressearcher = await UserModel.findById(req.body.searcherID)
            // Calculate age of searcher.
            var ageOfSearcher = getAge(ressearcher["birthday"])
            // Only if searcher-age matches move further on.
            if(ageOfSearcher>=resdtandc[i]["fromAge"] && ageOfSearcher<=resdtandc[i]["toAge"]) {
                // The genders have also to be matched accordingly;
                // First off we match the gender-preference of the activity against the gender of the searcher.
                if(!resdtandc[i].prefGender.toLowerCase().localeCompare("notdeclared") || !resdtandc[i].prefGender.toLowerCase().localeCompare(ressearcher.gender.toLowerCase())) {
                    // Secondly we mtach the gender-preferences of the searcher against the one of the creator.
                    if(!req.body.gender.toLowerCase().localeCompare("notdeclared") || !req.body.gender.toLowerCase().localeCompare(rescrator.gender.toLowerCase())) {
                        // Now we have tompare the searched activityName with the one from the current activity;
                        // The provided method compareTwoStrings from a nodejs library returns a number
                        // between 0 (no match) to 1 (complete match); The value 0.4 was choosen to allow
                        // for more false postives and less false negatives.
                        if(stringSimilarity.compareTwoStrings(resdtandc[i]["activityName"], req.body.activityName)>0.4) {
                            // Match the price-span.
                            if(resdtandc[i]["price"]<=req.body.maxPrice && resdtandc[i]["price"]>=req.body.minPrice) {
                                // Match category-specific entries.
                                switch(req.body.category) {
                                    case "Sport":
                                        // Physical condition has to match upper and lower bound.
                                        if(resdtandc[i]["phyCondition"]<=req.body.maxPhyCondition && resdtandc[i]["phyCondition"]>=req.body.minPhyCondition) {
                                            ressearch.push(resdtandc[i]);
                                        }
                                        break;
                                    case "Food":
                                        // Kitchen-type has to match exactly.
                                        if(!resdtandc[i]["kitchen"].localeCompare(req.body.kitchen)) {
                                            ressearch.push(resdtandc[i]);
                                        }
                                        break;
                                    case "Entertainment":
                                        // String-compare library is able to compare to strings according to their similarity;
                                        // The output of this function is between 0 (not similar) and 1 (identical).
                                        //console.log("String similarity index Entertainment-title: "+stringSimilarity.compareTwoStrings(resdtandc[i]["title"], req.body.title))
                                        if(stringSimilarity.compareTwoStrings(resdtandc[i]["title"], req.body.title)>0.5) {
                                            ressearch.push(resdtandc[i]);
                                        }
                                        break;
                                    case "Other":
                                        // There is nothing to compare here, therefore the activity will directly be added.
                                        ressearch.push(resdtandc[i]);
                                        break;
                                    default:
                                        return res.status(500).json({
                                            error: 'Internal Server Error - activities_match_category',
                                        });
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // After all activities have been searched through,
    // we can finally return the result.
    console.log(ressearch)
    return res.status(200).json(ressearch)
})


// Search for an activity with specified parameters.
const test = (async (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    // Should an activity match all the filters,
    // only then it will be appended to the ressearch-array.
    var ressearch = []

    /*
    console.log(req.body.fromTime)
    var dt = new Date(req.body.fromTime).toString;
    console.log(dt);
    */


    // Narrow the result of activities down, by Timeframe, Category, Status and Location.
    //console.log("fdtandc: ")
    var resdtandc = await ActivityModel
        .find({
            dateTime: { 
                $lt: new Date(req.body.toTime), //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()+req.dtpm)),
                $gte: new Date(req.body.fromTime) //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()-req.dtpm))
            },
            category: req.body.category,
            status: 0
    })
    //console.log(resdtandc)
    //console.log("end test1")

    // For every found activity, narrow the result further down.
    for(var i=0; i<resdtandc.length; i++) {
        // First compare the age of the creator with the filter set by the searcher.
        console.log("Find creator["+i+"]: (id="+resdtandc[i]["creator"]+")")
        var rescrator = await UserModel.findById(resdtandc[i]["creator"])
        console.log(rescrator)
        console.log("end Find creator")
        // Calculate the age of the creator, by using a separate function.
        var ageOfCreator = getAge(rescrator["birthday"])
        // Only if creator-age matches move further on.
        if(ageOfCreator>=req.body.fromAge && ageOfCreator<=req.body.toAge) {
            // Now we have to do the same age-check vice versa
            // => Match the searcher age to the one specified in the activity.
            console.log("Find searcher["+i+"]: (id="+req.body.searcherID+")")
            var ressearcher = await UserModel.findById(req.body.searcherID)
            console.log(ressearcher)
            console.log("end Find creator")
            // Calculate age of searcher.
            var ageOfSearcher = getAge(ressearcher["birthday"])
            // Only if searcher-age matches move further on.
            if(ageOfSearcher>=resdtandc[i]["fromAge"] && ageOfSearcher<=resdtandc[i]["toAge"]) {
                // The genders have also to be matched accordingly;
                // First off we match the gender-preference of the activity against the gender of the searcher.
                if(!resdtandc[i].prefGender.toLowerCase().localeCompare("notdeclared") || !resdtandc[i].prefGender.toLowerCase().localeCompare(ressearcher.gender.toLowerCase())) {
                    // Secondly we mtach the gender-preferences of the searcher against the one of the creator.
                    if(!req.body.gender.toLowerCase().localeCompare("notdeclared") || !req.body.gender.toLowerCase().localeCompare(rescrator.gender.toLowerCase())) {
                        // Now we have tompare the searched activityName with the one from the current activity;
                        // The provided method compareTwoStrings from a nodejs library returns a number
                        // between 0 (no match) to 1 (complete match); The value 0.4 was choosen to allow
                        // for more false postives and less false negatives.
                        console.log(resdtandc[i]["activityName"])
                        console.log(req.body.activityName)
                        if(stringSimilarity.compareTwoStrings(resdtandc[i]["activityName"], req.body.activityName)>0.4) {
                            // Match the price-span.
                            if(resdtandc[i]["price"]<=req.body.maxPrice && resdtandc[i]["price"]>=req.body.minPrice) {
                                // Match category-specific entries.
                                switch(req.body.category) {
                                    case "Sport":
                                        // Physical condition has to match upper and lower bound.
                                        if(resdtandc[i]["phyCondition"]<=req.body.maxPrice && resdtandc[i]["phyCondition"]>=req.body.minPrice) {
                                            ressearch.push(resdtandc[i]);
                                        }
                                        break;
                                    case "Food":
                                        // Kitchen-type has to match exactly.
                                        if(!resdtandc[i]["kitchen"].localeCompare(req.body.kitchen)) {
                                            ressearch.push(resdtandc[i]);
                                        }
                                        break;
                                    case "Entertainment":
                                        // String-compare library is able to compare to strings according to their similarity;
                                        // The output of this function is between 0 (not similar) and 1 (identical).
                                        console.log("String similarity index Entertainment-title: "+stringSimilarity.compareTwoStrings(resdtandc[i]["title"], req.body.title))
                                        if(stringSimilarity.compareTwoStrings(resdtandc[i]["title"], req.body.title)>0.5) {
                                            ressearch.push(resdtandc[i]);
                                        }
                                        break;
                                    case "Other":
                                        // There is nothing to compare here, therefore the activity will directly be added.
                                        ressearch.push(resdtandc[i]);
                                        break;
                                    default:
                                        return res.status(500).json({
                                            error: 'Internal Server Error - activities_match_category',
                                        });
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // After all activities have been searched through,
    // we can finally return the result.
    return res.status(200).json({ressearch})
})

// Calculate the age from a given time-string;
// The reference-date is the current time.
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}



// Getting all the votes for a specific user.
const getVotes  = async (req, res) => {

    var upVotes = 0;
    var downVotes = 0;
    var notYetDecided = 0;

    // Counting the votes for user as creator.
    var userActivities = await ActivityModel
    .find({
        $or:[ {creator: req.body.id}, {selPerson: req.body.id} ]
        
    })

    for(var i=0; i<userActivities.length; i++) {
        if(userActivities[i].voteForCreator == 0) {
            downVotes++;
        }
        else if(userActivities[i].voteForCreator == 1) {
            notYetDecided++;
        }
        else if(userActivities[i].voteForCreator == 2) {
            upVotes++;
        }
        else {
            return res.status(500).json({
                error: 'Internal Server Error - activities_get_Votes_wrong_Votenumber',
            });
        }
    }
    // After all votes for the user are counted;
    // They will be returned.
    return res.status(200).json({
        upVotes: upVotes,
        downVotes: downVotes,
        notYetDecided: notYetDecided
    })    
};


module.exports = {
    create,
    read,
    ActivityExists,
    update,
    joined,
    listOfJoinedPersons,
    alreadyJoined,
    unjoin,
    creatorVoteForParticipant,
    participantVoteForCreator,
    remove,
    list,
    setSelectedPerson,
    changeStatus,
    getActivitiesInRadius,
    search,
    test,
    getVotes
};