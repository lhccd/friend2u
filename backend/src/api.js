"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('./middleware/middlewares');

//const auth  = require('./routes/auth');
const activities = require('./routes/activities');
const users = require('./routes/users');

const api = express();


// Uploading pictures: https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'Friend2U-Backend'
    });
});

// API routes
// api.use('/auth'  , auth);
api.use('/activities', activities);
api.use('/users', users);


//Serving static files
//TO DO
//
//We probably won't need this because the static files will be served in the front end.
//Now it is used to serve the default profile picture
api.use('/static', express.static('public'));


module.exports = api;
