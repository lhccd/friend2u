"use strict";

const express  = require('express');
const router   = express.Router();
const cors       = require('cors');

const middlewares    = require('../middleware/middlewares');
const activityMiddlewares    = require('../middleware/activities');

const ActivityHandler = require('../controllers/activities');
const JoinedActivityHandler = require('../controllers/joinedActivities');
const uploadControllerHandler = require('../controllers/images');
// Using the checkBody method from middlewares to validate the body before pushing to backend, it is compared to requiredProperties
const requiredProperties = require('./requiredProperties');
//TO DO
//Add the middleware where necessary

router.get('/', ActivityHandler.list); // List all activities
router.post('/', [middlewares.checkAuthentication, (req,res,next) => middlewares.checkBody(req,res,next,requiredProperties.activityPropertiesBasic)], ActivityHandler.create); // Create a new activity
router.get('/userjoined/:id', middlewares.checkAuthentication, middlewares.checkIfValidId, JoinedActivityHandler.getJoinedActivities); // Get a list of joined activities for a specific user.
router.get('/userActivityRelation', JoinedActivityHandler.list);
router.get('/withinRadius', ActivityHandler.getActivitiesInRadius); // All activities within a specified radius are returned.
router.put('/search', middlewares.checkAuthentication, ActivityHandler.search) // Searching for activities with all possible filters; Should one filter not be applied, then one should provide the max range in the json-body, e.g. fromAge = 18 and toAge = 150 (min./max. allowed values in schema).
router.get('/test', ActivityHandler.test) // !!! Do NOT call it in production !!!
router.get('/getVotes/:id', ActivityHandler.getVotes) // Get the vote of a user, by specifing its id inside the body.
router.get('/:id', middlewares.checkAuthentication, middlewares.checkIfValidId, ActivityHandler.read); // Read a activitie by Id
router.put('/:id', middlewares.checkIfValidId, middlewares.checkAuthentication, ActivityHandler.update); // Update a activitie by Id
router.post('/join/:id', middlewares.checkIfValidId, middlewares.checkAuthentication, JoinedActivityHandler.join, ActivityHandler.joined); // Add a user to the participants-list.
router.get('/join/:id', middlewares.checkIfValidId, ActivityHandler.listOfJoinedPersons); // Get a list of joined persons from a specific activity.
router.get('/alreadyJoined/:id', middlewares.checkIfValidId, ActivityHandler.alreadyJoined); // Check whether a person already joined the activity.
router.get('/activityExists/:id', middlewares.checkIfValidId, ActivityHandler.ActivityExists); // Check, whether activity exists => {result: true} if so or {result: false} if not.
router.delete('/unjoin/:id', middlewares.checkIfValidId, middlewares.checkAuthentication, JoinedActivityHandler.unjoin, ActivityHandler.unjoin); // Remove a user form the participants-list.
router.put('/creatorVoteForParticipant/:id', middlewares.checkIfValidId, ActivityHandler.creatorVoteForParticipant); // Set the vote of the creator for the selPerson.
router.put('/participantVoteForCreator/:id', middlewares.checkIfValidId, ActivityHandler.participantVoteForCreator); // Set the vote of the selPerson for the creator.
router.delete('/:id', middlewares.checkIfValidId, middlewares.checkAuthentication, ActivityHandler.remove); // Delete a activitie by Id
router.put('/setSelectedPerson/:id', middlewares.checkIfValidId, ActivityHandler.setSelectedPerson); // Set the selected person for an activity.
router.put('/updateStatus/:id', middlewares.checkIfValidId, middlewares.checkAuthentication, ActivityHandler.changeStatus); // Change the status of an activity; For valuerepresentation look into the controller.
router.get('/list/:category', middlewares.checkIfValidCategory, middlewares.checkAuthentication, ActivityHandler.getActivitiesByCategory)
router.get('/user/:id', middlewares.checkIfValidId, middlewares.checkAuthentication, ActivityHandler.findActivitiesForUser); //Get a list of created activities for a specific user.
router.get('/match/:id', middlewares.checkIfValidId, middlewares.checkAuthentication, ActivityHandler.getContact); // get the contact details if matched 
module.exports = router;
