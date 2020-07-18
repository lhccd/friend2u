"use strict";

//Configuration variables for our backend.
const backend_address = process.env.BACKEND_ADDRESS || 'http://localhost:3000';
//const backend_address = "http://47c17049fbb6.ngrok.io" || 'http://localhost:3000';

module.exports = {
	backend_address
};
