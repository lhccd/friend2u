"use strict";

//Configuration variables for our backend.
const port      = process.env.PORT        || '3000';
const mongoURI  = process.env.MONGODB_URI || 'mongodb://localhost:27017/friend2udb';
const accessTokenSecret = process.env.ACCESS_SECRET  || 'very secret secret';
const refreshTokenSecret = process.env.REFRESH_SECRET  || 'very secret secret';

//Access token is valid for 5 min
const accessTokenLife = process.env.ACCESS_LIFE  || 3000; //300;
//Refresh token is valid for 1 day
const refreshTokenLife = process.env.REFRESH_LIFE  || 86400;

module.exports = {
    port,
    mongoURI,
    accessTokenSecret,
    refreshTokenSecret,
    accessTokenLife,
    refreshTokenLife,
};
