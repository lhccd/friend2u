"use strict";

const ActivityModel = require('../models/activities');
const UserModel = require('../models/user');
const stringSimilarity = require('string-similarity');
const ActivityReportModel = require('../models/activityReports');

// Creating a new DB-Entrie for a new activity.
const create = (req, res) => {
    // Check whether there is something to store in our DB.
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });	

    // Check, whether all category-specific data is present.
    if(req.category === "sport") {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'phyCondition')) {
            return res.status(400).json({
            error: 'Bad Request',
            message: `The request body must contain a PHYSICAL CONDITION property`
            });
        }
    }
    if(req.category === "entertainment") {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'title')) {
            return res.status(400).json({
            error: 'Bad Request',
            message: `The request body must contain a TITEL property`
            });
        }
    }
    if(req.category === "food") {
        if (!Object.prototype.hasOwnProperty.call(req.body, 'kitchen')) {
            return res.status(400).json({
            error: 'Bad Request',
            message: `The request body must contain a KITCHEN TYPE property`
            });
        }
    }
    

    console.log("create the following: ")
    req.body.creator = req.id
    req.body.participants = []
    req.body.status = 0
    console.log(req.body)
    console.log(req.id)
    // Try to crate an activity.
    
    ActivityModel.create(req.body)
        .then(activity => {
            console.log("The following activity was created:")
            console.log(activity)
            res.status(201).json(activity)
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_create',
            message: error.message
        }));
    
};

// Reading an existing activity.
const read = (req, res) => {

    ActivityModel.findById(req.params.id).exec()
        .then(activity => {

            if (!activity) return res.status(404).json({
                error: 'Not Found',
                message: `Activity not found`
            });

            console.log()
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
    console.log("Update with the following:")
    console.log(req.body);
    req.body.location.type = 'Point'

    ActivityModel.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true}).exec()
        .then(activity => {
            console.log("Update was made, result:")
            console.log(activity)
            res.status(200).json(activity)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
            error: 'Internal server error - activities_update',
            message: error.message
            }
        )});
};

// Add a person to the participants-list.
const joined = (req, res) => {
    
    ActivityModel.findByIdAndUpdate(req.params.id, { $addToSet: {participants: req.id}},{
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
    
    //ActivityModel.collection.drop();

    ActivityModel.findByIdAndUpdate(req.params.id, { $pull: {participants: req.id}},{
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
const remove = async (req, res) => {

    //console.log("Trying to remove: "+req.params.id)

    //console.log("Trying to delete activity: "+req.params.id+" from: "+delAct.creator+"="+req.id+"; Are the ID's equal?: "+delAct.creator === req.id)

    var delAct = await ActivityModel.findById(req.params.id)

    //console.log("Trying to delete activity: "+req.params.id+" from: "+delAct.creator+"="+req.id)
    //console.log("Are the ID's equal?: "+(delAct.creator.toString() === req.id.toString()))

    // Check wheter the user who wants to delete an activity is also the creator;
    // Special check for moderators might still be required.
    if(req.role !== 'moderator' && req.id.toString() !== delAct.creator.toString()) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'You are not the creator of the activity!'
        })
    }
    
    console.log(req.role)

    // Remove the activity from the ActivityModel.
    ActivityModel.findByIdAndRemove(req.params.id).exec()
        .then(() => {
            // As the activity does not longer exist, all the reports for this
            // specific category can be deleted.
            ActivityReportModel.deleteMany({category: 'activity', reported: req.params.id})
                .then(activity => {
                    res.status(200).json({message: `Activity and its corresponding ActivityReports for id${req.params.id} were deleted`})
                })
                .catch(error => res.status(500).json({
                    error: 'Internal server error - activities_deleteManyReports',
                    message: error.message
                }));
        })
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

// List all existing activities for a specific category, while
// also ensuring, that the user fullfills the creators preferences.
const getActivitiesByCategory  = async (req, res) => {
    //console.log("Searching activities in category: "+req.params.category)
    var propCurrUser = await UserModel.findById(req.id)
    var ageCurrUser = getAge(propCurrUser["birthday"])
    //console.log("Properties of current user:")
    //console.log(propCurrUser)
    //console.log(ageCurrUser)
    var catForSearch = req.params.category.charAt(0).toUpperCase() + req.params.category.substring(1)
    //console.log(catForSearch)
    ActivityModel.find({
        status: 0,
        category: catForSearch,
        fromAge: { $lte: ageCurrUser},
        toAge: { $gte: ageCurrUser},
        dateTime: { $gte: new Date()}
    }).exec()
        .then(activities => {
            var resact = []
            for(var i=0; i<activities.length; i++) {
                /*
                var activityTime = new Date(activities[i].dateTime)
                var currTime = new Date()
                console.log("ActTime: "+activityTime)
                console.log("CurrTime: "+currTime)
                console.log(activityTime<=currTime)
                */
                //console.log("IDCheck - CurrUser: "+req.id+"; ActCreator: "+activities[i].creator)
                //console.log(req.id.toString() === activities[i].creator.toString())
                console.log("Gendercheck: "+activities[i].prefGender.toLowerCase()+" === "+propCurrUser.gender.toLowerCase()+"; results in: "+(activities[i].prefGender.toLowerCase() === propCurrUser.gender.toLowerCase() || activities[i].prefGender.toLowerCase() === "notdeclared" || propCurrUser.gender.toLowerCase() === "notdeclared"))
                if(activities[i].prefGender.toLowerCase() === propCurrUser.gender.toLowerCase() || propCurrUser.gender.toLowerCase() === "notdeclared" || activities[i].prefGender.toLowerCase()=== "notdeclared") {
                    resact.push(activities[i])
                }
            }
            res.status(200).json(resact)
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_list',
            message: error.message
        }));
};

const findActivitiesForUser  = (req, res) => {
    ActivityModel.find({ creator: req.params.id}).exec()
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
    console.log(req.id)

	var query = {
		fromTime: +new Date(),
		toTime: +new Date(),
		category: 'Sport',
		long: 11.5969768950502,
		lat: 48.14137159149285,
		maxDistance: 100*1000,
		fromAge: 18,
		toAge: 150,
		activityName: '',
		minPrice: 1,
		maxPrice: 5,
		minPhyCondition: 1,
		maxPhyCondition: 4,
		kitchen: 'Other',
		title: '',
		gender: 'notDeclared',
	}
	
	for(var k in query){
		console.log(k)
		if(Object.prototype.hasOwnProperty.call(req.body, k)){
			query[k] = req.body[k]
		}
	}
    
    console.log(new Date(req.body.fromTime))
    console.log(query)	
    
    // The first letter has to upper-case!
    var catForSearch = req.body.category.charAt(0).toUpperCase() + req.body.category.substring(1)
    
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
                    $geometry: { type: "Point",  coordinates: [ parseFloat(query.long), parseFloat(query.lat) ] },
                    $minDistance: 0,
                    $maxDistance: parseInt(query.maxDistance)
                    }
                }
            ,
            //category: req.body.category,
            //dateTime: { 
            //    $lt: new Date(query.toTime), //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()+req.dtpm)),
            //    $gte: new Date(query.fromTime) //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()-req.dtpm))
            //},
            category: catForSearch,
            status: 0
    })
    .catch(error => {return res.status(500).json({
        error: 'Internal server error - activities_search_find',
        message: error.message
    })});

    console.log("Pre-Selection: ")
    console.log(resdtandc)


    
    // For every found activity, narrow the result further down.
    for(var i=0; i<resdtandc.length; i++) {
        // First compare the age of the creator with the filter set by the searcher.
        var rescrator = await UserModel.findById(resdtandc[i]["creator"])
        // Calculate the age of the creator, by using a separate function.
        var ageOfCreator = getAge(rescrator["birthday"])
        // Only if creator-age matches move further on.
        if(ageOfCreator>=query.fromAge && ageOfCreator<=query.toAge) {

            console.log("Age of creator is ok")

            // Now we have to do the same age-check vice versa
            // => Match the searcher age to the one specified in the activity.
            var ressearcher = await UserModel.findById(req.id)
            // Calculate age of searcher.
            var ageOfSearcher = getAge(ressearcher["birthday"])
            // Only if searcher-age matches move further on.
            if(ageOfSearcher>=resdtandc[i]["fromAge"] && ageOfSearcher<=resdtandc[i]["toAge"]) {

                console.log("Age of searcher is ok")

                // The genders have also to be matched accordingly;
                // First off we match the gender-preference of the activity against the gender of the searcher.
                if(!resdtandc[i].prefGender.toLowerCase().localeCompare("notdeclared") || !resdtandc[i].prefGender.toLowerCase().localeCompare(ressearcher.gender.toLowerCase())) {
                    // Secondly we mtach the gender-preferences of the searcher against the one of the creator.
                    if(!req.body.prefGender.toLowerCase().localeCompare("notdeclared") || !req.body.prefGender.toLowerCase().localeCompare(rescrator.gender.toLowerCase())) {

                        console.log("Gender-preferences are ok")

                        // Now we have tompare the searched activityName with the one from the current activity;
                        // The provided method compareTwoStrings from a nodejs library returns a number
                        // between 0 (no match) to 1 (complete match); The value 0.4 was choosen to allow
                        // for more false postives and less false negatives.
                        if(stringSimilarity.compareTwoStrings(resdtandc[i]["activityName"], query.activityName)>0.4) {
                            // Match the price-span.
                            if(resdtandc[i]["price"]<=query.maxPrice && resdtandc[i]["price"]>=query.minPrice) {
                                // Match category-specific entries.
                                switch(catForSearch) {
                                    case "Sport":
                                        // Physical condition has to match upper and lower bound.
                                        if(resdtandc[i]["phyCondition"]<=query.maxPhyCondition && resdtandc[i]["phyCondition"]>=query.minPhyCondition) {
                                            ressearch.push(resdtandc[i]);
                                        }
                                        break;
                                    case "Food":
                                        // Kitchen-type has to match exactly.
                                        if(!resdtandc[i]["kitchen"].localeCompare(query.kitchen)) {
                                            ressearch.push(resdtandc[i]);
                                        }
                                        break;
                                    case "Entertainment":
                                        // String-compare library is able to compare to strings according to their similarity;
                                        // The output of this function is between 0 (not similar) and 1 (identical).
                                        //console.log("String similarity index Entertainment-title: "+stringSimilarity.compareTwoStrings(resdtandc[i]["title"], req.body.title))
                                        if(stringSimilarity.compareTwoStrings(resdtandc[i]["title"], query.title)>0.5) {
                                            ressearch.push(resdtandc[i]);
                                        }
                                        break;
                                    case "Others":
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
}

const getContact = async (req, res) => {
    const creator = req.query.creator;
    const participant = req.query.participant;

    if(creator == participant) {
		return res.status(400).json({error: 'Bad Request', message: 'You can\'t pair yourself'})
	}

    var activity = await ActivityModel.findById(req.params.id).exec()
    if (activity.selPerson == participant && activity.creator == creator){
        var populateQuery = [{path:'selPerson', select:['email','mobile']}, { path:'creator', select:['email','mobile']}];
        activity.populate(populateQuery,function (err, contacts) {
            if (err) return res.status(500).json({
                error: 'Internal server error - getContact',
                message: error.message
            });
            let contact = {}
		if(contacts.length !== 0){
			contact.creator = contacts.creator
			contact.participant = contacts.selPerson
		}
		else{
            contact.creator = []
            contact.participant = []
		}	
		return res.status(200).json(contact)
          });
    } else return res.status(202).json(activity)
        
     
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
    getVotes,
    findActivitiesForUser,
    getActivitiesByCategory,
    getContact
};
