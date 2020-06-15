"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares    = require('../middleware/middlewares');
const activityMiddlewares    = require('../middleware/activities');

const ActivityHandler = require('../controllers/activities');
const JoinedActivityHandler = require('../controllers/joinedActivities')


//TO DO
//Add the middleware where necessary

router.get('/', ActivityHandler.list); // List all activities
router.post('/', ActivityHandler.create); // Create a new activitie
router.get('/userjoined/', JoinedActivityHandler.getJoinedActivities); // Get a list of joined activities for a specific user.
router.get('/userActivityRelation', JoinedActivityHandler.list);
router.get('/withinRadius', ActivityHandler.getActivitiesInRadius); // All activities within a specified radius are returned.
router.get('/test', ActivityHandler.test)
router.get('/:id', ActivityHandler.read); // Read a activitie by Id
router.put('/:id', ActivityHandler.update); // Update a activitie by Id
router.post('/join/:id', JoinedActivityHandler.join, ActivityHandler.joined); // Add a user to the participants-list.
router.get('/join/:id', ActivityHandler.listOfJoinedPersons); // Get a list of joined persons from a specific activity.
router.get('/alreadyJoined/:id', ActivityHandler.alreadyJoined); // Check whether a person already joined the activity.
router.get('/activityExists/:id', ActivityHandler.ActivityExists); // Check, whether activity exists => {result: true} if so or {result: false} if not.
router.delete('/unjoin/:id', JoinedActivityHandler.unjoin, ActivityHandler.unjoin); // Remove a user form the participants-list.
router.put('/creatorVoteForParticipant/:id', ActivityHandler.creatorVoteForParticipant); // Set the vote of the creator for the selPerson.
router.put('/participantVoteForCreator/:id', ActivityHandler.participantVoteForCreator); // Set the vote of the selPerson for the creator.
router.delete('/:id', ActivityHandler.remove); // Delete a activitie by Id
router.put('/setSelectedPerson/:id', ActivityHandler.setSelectedPerson); // Set the selected person for an activity.
router.put('/updateStatus/:id', ActivityHandler.changeStatus); // Change the status of an activity; For valuerepresentation look into the controller.

module.exports = router;
