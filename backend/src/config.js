"use strict";

//Configuration variables for our backend.
const port      = process.env.PORT        || '3000';
const mongoURI  = process.env.MONGODB_URI || 'mongodb://localhost:27017/friend2udb_test2'//'mongodb+srv://lorenz:friend2u@cluster0-g5wgv.gcp.mongodb.net/test?retryWrites=true&w=majority';
const accessTokenSecret = process.env.ACCESS_SECRET  || 'very secret';
const refreshTokenSecret = process.env.REFRESH_SECRET  || 'very secret secret';
const resetPasswordSecret = process.env.RESET_PASSWORD_SECRET  || 'even more secret';

//Access token is valid for 5 min
const accessTokenLife = process.env.ACCESS_LIFE  || 300;
//Refresh token is valid for 1 day
const refreshTokenLife = process.env.REFRESH_LIFE  || 86400;
//Reset password link is valid for 1 hour
const resetPasswordLife = process.env.RESET_PASSWORD_LIFE || 3600;


//Of course we shouldn't write the password in plaintext, but this email address is only to make the application working in a local environment
const email_address = process.env.EMAIL_ADDRESS  || 'friend2Uteam@outlook.com'
const email_password = process.env.EMAIL_PASSWORD  || 'Sebamaster2020'

module.exports = {
    port,
    mongoURI,
    accessTokenSecret,
    refreshTokenSecret,
    resetPasswordSecret,
    accessTokenLife,
    refreshTokenLife,
    resetPasswordLife,
    email_address,
    email_password
};


//'mongodb://localhost:27017/friend2udb'