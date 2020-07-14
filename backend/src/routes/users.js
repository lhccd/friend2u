"use strict";

const express  = require('express');
const router   = express.Router();

const middlewares = require('../middleware/middlewares');
const UserHandler = require('../controllers/users');

//uploading images
const multer  = require('multer')


var storage = multer.diskStorage({
    destination: 'public/images/profile/',
    filename: function (req, file, cb) {
        cb(null, req.id + '-profilepic')
    }
})

var upload = multer({ storage: storage })

router.post('/', UserHandler.create);
router.post('/profilePicture', [middlewares.checkAuthentication, upload.single('image')], UserHandler.uploadProfilePicture);
router.get('/profilePicture/:id', [middlewares.checkIfValidId], UserHandler.getProfilePicture);
router.get('/', UserHandler.list); // List all users
router.get('/:id', [middlewares.checkAuthentication, middlewares.checkIfValidId], UserHandler.read); // Read a user by Id
router.put('/', middlewares.checkAuthentication, UserHandler.update); // Update a user by Id
router.delete('/:id', UserHandler.remove); // Delete a user by Id


module.exports = router;
