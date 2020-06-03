"use strict";

//Configuration variables for our backend.
const port      = process.env.PORT        || '3000';
const mongoURI  = process.env.MONGODB_URI || 'mongodb://localhost:27017/friend2udb';
const JwtSecret = process.env.JWT_SECRET  || 'very secret secret';

module.exports = {
    port,
    mongoURI,
    JwtSecret,
};