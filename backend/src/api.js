"use strict";

const express      = require('express');
const bodyParser   = require('body-parser');
const helmet       = require('helmet');
const cookieParser = require('cookie-parser');
const cors         = require('cors');


const middlewares = require('./middleware/middlewares');

const auth  = require('./routes/auth');
const activities = require('./routes/activities');
const users = require('./routes/users');
const moderator = require('./routes/moderator');
const reports = require('./routes/reports');
const images = require('./routes/images');
const admin = require('./routes/admin');

const api = express();


// Uploading pictures: https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);
api.use('/static', express.static(__dirname + '/public'));
api.use(cookieParser());
api.use(cors({
	origin: 'http://127.0.0.1:8000',
	credentials: true
}));


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'Friend2U-Backend'
    });
});

// API routes
api.use('/auth', auth);
api.use('/activities', activities);
api.use('/users', users);
api.use('/moderator', moderator);
api.use('/reports', reports);
api.use('/images', images);
api.use('/admin', admin);

//Serving static files
//TO DO
//
//We probably won't need this because the static files will be served in the front end.
//Now it is used to serve the default profile picture
api.use('/static', express.static('public'));


module.exports = api;
