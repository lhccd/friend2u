"use strict";

const ActivityModel = require('../models/activities');
const UserModel = require('../models/user');

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


// Search for an activity with specified parameters.
const test = ((req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    console.log(req.body.fromTime)
    var dt = new Date(req.body.fromTime).toString;
    console.log(dt);

    /*
    return res.status(400).json({
        result: req.body.dateTime
    });
    */

   
    
    ActivityModel.find({
        dateTime: { 
            $lt: new Date(req.body.toTime), //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()+req.dtpm)),
            $gte: new Date(req.body.fromTime) //new Date(new Date(req.dateTime).setDate(new Date(req.dateTime).getDate()-req.dtpm))
        },
        category: req.body.category,
        activityName: { $search: req.body.activityName },
        status: 0
    })
    .exec()
    .then(activities => {
        var ressearch = []
        if(activities.length==0) {
            console.log("No activities found!")
            res.status(200).json(ressearch)
        }
        else {
            for(var i=0; i<activities.length; i++) {
                        
                console.log(activities.length)
                console.log(activities[i]["creator"])
                console.log(i)

                var curact = activities[i]


                UserModel.findById(activities[i]["creator"]).exec()
                .then(user => {
                    if (!user) {
                        res.status(500).json({
                            error: 'Internal Server Error - User not found.',
                            message: error.message
                        })
                    } else {
                        
                        console.log(user)

                        console.log(getAge(user["birthday"]))
                        console.log(req.body.fromAge)
                        console.log(curact)
                        console.log(i)

                        var ageofuser = getAge(user["birthday"])

                        if(ageofuser>=req.body.fromAge && ageofuser<=req.body.toAge) {
                            ressearch.push(activities[i-1])
                        }

                        // Search for specific category entries.
                        // Price smaller than...

                        res.status(200).json(ressearch)
                        
                    }
                    //console.log(res)
                })
                .catch(error => res.status(500).json({
                    error: 'Internal Server Error - activities_read',
                    message: error.message
                }));
            }
        


            

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
    
    
    })
    .catch(error => res.status(500).json({
        error: 'Internal server error - activities_list',
        message: error.message
    }));
    
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