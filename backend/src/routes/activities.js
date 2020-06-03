"use strict";

const express  = require('express');
const router   = express.Router();

//const middlewares    = require('../middlewares');
const ActivityHandler = require('../controllers/activities');


router.get('/', ActivityHandler.list); // List all activities
router.post('/', ActivityHandler.create); // Create a new activitie
router.get('/:id', ActivityHandler.read); // Read a activitie by Id
router.put('/:id', ActivityHandler.update); // Update a activitie by Id
router.delete('/:id', ActivityHandler.remove); // Delete a activitie by Id


module.exports = router;