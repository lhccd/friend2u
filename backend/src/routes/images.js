"use strict";

const express  = require('express');
const router   = express.Router();
const uploadControllerHandler = require('../controllers/images');

router.post('/upload', uploadControllerHandler.uploadFile);
router.get('/:id', uploadControllerHandler.displayFile);
module.exports = router;