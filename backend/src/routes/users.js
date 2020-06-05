"use strict";

const express  = require('express');
const router   = express.Router();

//const middlewares    = require('../middlewares');
const UserHandler = require('../controllers/users');

router.post('/', UserHandler.create); 
router.get('/', UserHandler.list); // List all users
router.get('/:id', UserHandler.read); // Read a user by Id
router.put('/:id', UserHandler.update); // Update a user by Id
router.delete('/:id', UserHandler.remove); // Delete a user by Id


module.exports = router;