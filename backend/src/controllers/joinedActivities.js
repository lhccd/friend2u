"use strict";


const request = require('request')
const config = require('../config')
const JoinedActivityModel = require('../models/joinedActivities')
// Required, because of check, whether a user already joined an activity.
const ActivityModel = require('../models/activities')

const join = (req, res, next) => {
    // Check whether there is something to store in our DB.
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });


    // Before adding a user to the JoinedActivityModel, we are checking, whether the given
    // ID for the activity actually exists and also whether it is the first time, that
    // the user wants to join this activity; Douplicated entries should be prevented.
    ActivityModel.findById(req.params.id).exec()
        .then(activity => {
            if (!activity) {
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'The request cannot be executed as the requested activity does not exitst!'
                });
            } else {
                console.log('Activity does exist!')


                ActivityModel.findById(req.params.id).exec()
                    .then(result => {
                        if(result.participants.indexOf(req.body.newParticipant) > -1) {
                            return res.status(400).json({
                                error: 'Bad Request',
                                message: 'The request cannot be executed as the user already joined this acitivty!'
                            });
                        } else {
                            
                            JoinedActivityModel.create({activityID: req.params.id, joinedPersonID: req.body.newParticipant})
                                .then(activity => {
                                    //res.status(201).json(activity);
                                    next();
                                })
                                .catch(error => res.status(500).json({
                                    error: 'Internal server error - joinedActivities_join',
                                    message: error.message
                                }));


                        }
                    })
                    .catch(error => res.status(500).json({
                        error: 'Internal server error - activities_alreadyJoined',
                        message: error.message
                    }));

            }
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error - activities_read',
            message: error.message
        }));

/*
    // Check, whether ActivityID exitsts.
    var actExists = false;
    // Check, whether user already joined the activity.
    var usrJoined = false;
    activityExisting(config.port, req.params.id, (err, result) => { 
        if(err) {console.log(err); }
        else {
            //console.log('AE: '+result);
            actExists=result;
/*
            var reqAE = {
                params: {
                    id: req.params.id
                }
            }
            */

            //var resAE = ActivityModel.internActivityExists(req.params.id)

            //console.log('resAE: '+resAE)

            
            

/*
            ActivityModel.internActivityExists(reqAE, (resAE) => {
                //console.log(resAE)
            })
            */

            //console.log(resAE)
/*
            userJoinedAlready(config.port, req.params.id, req.body, (err, result) => {
                if(err) {console.log(err); }
                else {
                    //console.log('UJ: '+result);
                    usrJoined=result;
        
                    //console.log('All: '+(actExists && !usrJoined))
        
        
                    if((actExists && !usrJoined) === true) {
                        JoinedActivityModel.create({activityID: req.params.id, joinedPersonID: req.body.newParticipant})
                        .then(activity => {
                            //res.status(201).json(activity);
                            next();
                        })
                        .catch(error => res.status(500).json({
                            error: 'Internal server error - joinedActivities_join',
                            message: error.message
                        }));
                    }
                    else {
                        //console.log('Mhhhhhh.....!')
                        //console.log('Last: '+(actExists && !usrJoined))
                        return res.status(400).json({
                            error: 'Bad Request',
                            message: 'The request cannot be executed as either the activity does not exitst or the current user already joined the activity earlier on!'
                        });
                    }
            }
            });

        }

    });

    
    */
    

    

            
}

    /*
    var options = {
        uri: 'https://www.googleapis.com/urlshortener/v1/url',
        method: 'POST',
        json: {
          "longUrl": "http://www.google.com/"
        }
      };
      
      request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body.id) // Print the shortened url.
        }
      });

*/

    /*
    // Try to crate an activity.
    JoinedActivityModel.create({activityID: req.params.id, joinedPersonID: req.body.newParticipant})
        .then(activity => {
            //res.status(201).json(activity);
            next();
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error - joinedActivities_join',
            message: error.message
        }));
        */




/*
 function daemonGetNodeStatus(kubeURL, nodeName, callback) {
    console.log(nodeName);
    var request = require("request");
    var options = {
        method: 'GET',
        url: kubeURL+'/api/v1/nodes/'+nodeName+'/status',
        headers: {
            'Cache-Control': 'no-cache',
            'Authorization': 'Bearer '+constants.accessToken
        }
    };

    request(options, function(error, response, body) {
        if (error)
        {
            callback(error);
        } else {

            var bodyJSON = JSON.parse(body);

            var result = [];

            var temp = {};

            for (var i = 0; i < bodyJSON.status.conditions.length; i++) {
                if(bodyJSON.status.conditions[i].status == "True"){
                    result.push(bodyJSON.status.conditions[i].type);
                }

            }
            callback(null, result);
        }
    });
 }




 */

function activityExisting(port, id, callback) {
    var urlreq1 = 'http://localhost:'+port+'/activities/activityExists/'+id
    var options1 = {
        uri: urlreq1,
        method: 'GET',
        json: []
    }
    request(options1, (err, res, body) => {
        //console.log(body);
        var actExists = body.result
        callback(err, actExists)
    });
}


function userJoinedAlready(port, id, jsonbody, callback) {
    var urlreq2 = 'http://localhost:'+port+'/activities/alreadyJoined/'+id
    console.log(jsonbody)
    var options2 = {
        uri: urlreq2,
        method: 'GET',
        json: jsonbody
    }
    request(options2, (err, res, body) => {
        //console.log(body);
        var usrJoined = body.result
        callback(err, usrJoined)
    });
}






const getJoinedActivities = (req, res) => {

    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    JoinedActivityModel.find({joinedPersonID: req.body.user})
        .then(activity => {
            res.status(201).json(activity);
            
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error - getJoinedActivities',
            message: error.message
    }));
}

// Delete a user from one activity.
const unjoin = (req, res, next) => {
    // Check whether there is something to store in our DB.
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    // Try to crate an activity.
    JoinedActivityModel.deleteMany({activityID: req.params.id, joinedPersonID: req.body.oldParticipant})
        .then(activity => {
            //res.status(201).json(activity);
            next();
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error - joinedActivities_join',
            message: error.message
        }));
}

// List the existing relations.
const list  = (req, res) => {
    JoinedActivityModel.find({}).exec()
        .then(activities => res.status(200).json(activities))
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_list',
            message: error.message
        }));
};



module.exports = {
    join,
    getJoinedActivities,
    unjoin,
    list
}