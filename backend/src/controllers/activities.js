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
const search = ((req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    ActivityModel.find({
        /*
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
        fromAge: req.body.fromAge,
        toAge: req.body.toAge,
        category: req.body.category,
        */
        // Search the Time&Date +/- a given houre-count.
        dateTime: { 
            $lt: new Date(req.body.toTime), //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()+req.dtpm)),
            $gte: new Date(req.body.fromTime) //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()-req.dtpm))
        }
    })
    .exec()
    .then(activities => res.status(200).json(activities))
    .catch(error => res.status(500).json({
        error: 'Internal server error - activities_search',
        message: error.message
    }));
})


// Find activities by dateTime & category & status==0;
// DateTime will be converted to Date-Objects.
function dtandc(fromdt, todt, category) {
    return ActivityModel.find({
        dateTime: { 
            $lt: new Date(todt), //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()+req.dtpm)),
            $gte: new Date(fromdt) //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()-req.dtpm))
        },
        category: category,
        status: 0
    })
    /*
    .exec()
    .then(activities => {
        if(activities.length==0) {
            console.log("No activities found!")
            return []
        }
        else {
            return activities
        }
    })
    .catch(error => {
        console.log("Error in dtandc: "+error)
        return []
    })
    */
}


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

    console.log(req.body.fromTime)
    var dt = new Date(req.body.fromTime).toString;
    console.log(dt);


    // Narrow the result of activities down, by Timeframe and Category.
    console.log("fdtandc: ")
    var resdtandc = await dtandc(req.body.fromTime, req.body.toTime, req.body.category)
    //console.log(resdtandc)
    console.log("end test1")

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
    

    /*
    return res.status(400).json({
        result: req.body.dateTime
    });
    */

   /*
    
    ActivityModel.find({
        dateTime: { 
            $lt: new Date(req.body.toTime), //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()+req.dtpm)),
            $gte: new Date(req.body.fromTime) //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()-req.dtpm))
        },
        category: req.body.category,
        /*
        // Searching for the activity name;
        // Search-query does also accept partial name;
        // Better to use stringsimilarity.
        $text: { $search: req.body.activityName },
        */
        // Status has to be 0, otherwise it should no longer be findable through the search.
 /*       status: 0
    })
    .exec()
    .then(activities => {
        var ressearch = []
        if(activities.length==0) {
            console.log("No activities found!")
            res.status(200).json(ressearch)
        }
        else {
            // Count how many activities have already been searched through.
            var ac = 0;

            // Loop over all found activities.
            for(var i=0; i<activities.length; i++) {
                    
                /*
                console.log(activities.length)
                console.log(activities[i]["creator"])
                console.log(i)

                var curact = activities[i]
                */

 /*               console.log(UserModel.findById(activities[i]["creator"]).birthday)


                UserModel.findById(activities[i]["creator"]).exec()
                .then(user => {
                    if (!user) {
                        res.status(500).json({
                            error: 'Internal Server Error - User not found.',
                            message: error.message
                        })
                    } else {

                        var x = -1;

                        // Search for index of the activity based on the creator_id;
                        // This has to be done, because index i might not hold the correct
                        // value anymore, due to the asynchronous behaviour.
                        for(var j=0; j<activities.length; j++) {
                            //console.log("user._id: "+user._id+"; creator_id: "+activities[j]["creator"])
                            if(user._id == activities[j]["creator"]) {
                                x = j;
                                //console.log("x="+x)
                            }
                        }
                        
                        /*
                        console.log(user)
                        console.log(x)

                        console.log(getAge(user["birthday"]))
                        console.log(req.body.fromAge)
                        console.log(curact)
                        console.log(j)
                        */

 /*                       var ageofuser = getAge(user["birthday"])

                        // Compare both activity-Names with the compareTwoStrings-function of a nodejs library;
                        // Resulting value is between 0 (No similarity) and 1 (Complete similarity).
                        //console.log(activities[x]["activityName"]+"; "+ req.body.activityName)
                        //console.log("String similarity index ActivityName: "+stringSimilarity.compareTwoStrings(activities[x]["activityName"], req.body.activityName))
                        var sli = stringSimilarity.compareTwoStrings(activities[x]["activityName"], req.body.activityName)
                        console.log(sli)
                        // Setting the compare-factor to 0.4, to allow for false positives instead of false negatives.
                        if(sli>0.4) {
                            console.log("True1")
                            // Match the age-span of the user.
                            if(ageofuser>=req.body.fromAge && ageofuser<=req.body.toAge) {
                                // Match the price-span.
                                if(activities[x]["price"]<=req.body.maxPrice && activities[x]["price"]>=req.body.minPrice) {
                                    // Match category-specific entries.
                                    switch(req.body.category) {
                                        case "Sport":
                                            // Physical condition has to match upper and lower bound.
                                            if(activities[x]["phyCondition"]<=req.body.maxPrice && activities[x]["phyCondition"]>=req.body.minPrice) {
                                                ressearch.push(activities[x]);
                                            }
                                            break;
                                        case "Food":
                                            // Kitchen-type has to match exactly.
                                            if(!activities[x]["kitchen"].localeCompare(req.body.kitchen)) {
                                                ressearch.push(activities[x]);
                                            }
                                            break;
                                        case "Entertainment":
                                            // String-compare library is able to compare to strings according to their similarity;
                                            // The output of this function is between 0 (not similar) and 1 (identical).
                                            console.log("String similarity index Entertainment-title: "+stringSimilarity.compareTwoStrings(activities[x]["title"], req.body.title))
                                            if(stringSimilarity.compareTwoStrings(activities[x]["title"], req.body.title)>0.5) {
                                                ressearch.push(activities[x]);
                                            }
                                            break;
                                        case "Other":
                                            // There is nothing to compare here, therefore the activity will directly be added.
                                            ressearch.push(activities[x]);
                                            break;
                                        default:
                                            return res.status(500).json({
                                                error: 'Internal Server Error - activities_match_category',
                                            });
                                    }
                                }
                            }
                        }
                        
                        ac++;
                        console.log("ac++=="+ac)
                        console.log(activities[x])
                        // Should all activities have been searched through, return the final result.
                        if(ac == activities.length) res.status(200).json(ressearch);
                    }
                    //console.log(res)





                    // Still ToDo:
                    // - Use stringsimilarity also for activityname,
                    // - Up to now only the user preferences are checked against the creator-profile,
                    //   this has also to be done the other way round!
                    //   I will do that probably tomorrow (16.06.2020)














                })
                .catch(error => res.status(500).json({
                    error: 'Internal Server Error - activities_read_test',
                    message: error.message
                }));
            }
        

            console.log("Up no!")
            

            //ressearch.push(activities[i])
        }
        
        //var bday = UserModel.findById(req.body.id).birthday

        //console.log(bday)

        /*
        fromAge: {
            $gte: req.body.fromAge,
        },
        toAge: {
            $lt: req.body.toAge
        }*/
    

 /*   
    })
    .catch(error => res.status(500).json({
        error: 'Internal server error - activities_list',
        message: error.message
    }));
    */
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
    test
};