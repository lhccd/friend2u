"use strict";

const mongoose = require('mongoose');

const schema  = {	
    user: {
        type: String,
        unique: true,
    },
    
    refreshToken: String
	
};

const AuthSchema  = new mongoose.Schema(schema)

AuthSchema.set('versionKey', false);

module.exports = mongoose.model('Auth', AuthSchema);
