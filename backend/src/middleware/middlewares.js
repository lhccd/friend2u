"use strict";

const jwt    = require('jsonwebtoken');
const config = require ('../config');
const objectID = require('mongoose').Types.ObjectId

//Useful utility to check if an id is a valid object id so mongoose doens't return error
//Should be used when there is an :id in the path
const checkIfValidId = (req,res,next) => {
	
	let id = req.params.id
	
	if(objectID.isValid(id)) return next()
	return res.status(400).json({
			error: 'Bad Request',
			message: 'The id is not correct'
	});
}

// Check if the provided category is really one, or if
// something went wrong in our website.
const checkIfValidCategory = (req, res, next) => {
	let category = req.params.category

	if(category !== "sport" || category !== "entertainment" || category !== "food" || category !== "other") {
		console.log(category)
		return next()
	} else {
		return res.status(400).json({
			error: 'Bad Request',
			message: `The category: ${category} is not correct`
		});
	}
}


const checkBody = (req,res,next,requiredProperties) => {
	console.log(req.body)
	for(var prop of requiredProperties){
		//console.log("Curr prop: "+prop+", hasWP: "+Object.prototype.hasOwnProperty.call(req.body, prop))
		if (!Object.prototype.hasOwnProperty.call(req.body, prop)) return res.status(400).json({
			error: 'Bad Request',
			message: `The request body must contain a ${prop} property`
		});
	};
	
	next();
}

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.status(200).send(200);
    }
    else {
        next();
    }
};


const checkAuthentication = (req, res, next) => {

    // check header or url parameters or post parameters for token
    let token = "";
    if(req.headers.authorization) {
		var tokenArray = req.headers.authorization.split(" ");
		if(tokenArray.length !== 2 || tokenArray[0] !== 'Bearer')
			return res.status(401).send({
				error: 'Unauthorized',
				message: 'No token provided in the request. Did you add \'Bearer\' before the token?'
			});
        token = tokenArray[1];
    }

    // verifies secret and checks exp
    jwt.verify(token, config.accessTokenSecret, (err, decoded) => {
		if(err){
			var response = {};
			if(err.name === 'TokenExpiredError'){
				if(req.url === '/refresh_token'){
					const payload = jwt.verify(token, config.accessTokenSecret, {ignoreExpiration: true} );
					req.id = payload.id;
					return next();
				}
				
				response = {
					error: 'TokenExpired',
					message: 'The provided token is no longer valid',
				}
			}
			else response = {
				error: 'Unauthorized',
				message: 'Failed to authenticate token.'
			};

			console.log(err)
			return res.status(401).send({
				error: 'Unauthorized',
				message: 'Failed to authenticate token.'
			});
		}
		
		if(decoded.banTime && (decoded.banTime === -1 || decoded.banTime > Date.now())){
			return res.status(403).send({
				error: 'Banned',
				message: "This user is banned",
				time: decoded.banTime,
			});
		} 
		
        // if everything is good, save to request for use in other routes
        req.id = decoded.id;
        req.username = decoded.username;
        req.role = decoded.role;
        next();
    });

};

const isUserModerator = (req,res,next) => {
	if(req.role === 'moderator') next();
	else return res.status(403).json({message: "You don't have the permission to access this content"})
}

const isUserAdmin = (req,res,next) => {
	if(req.role === 'admin') next();
	else return res.status(403).json({message: "You don't have the permission to access this content"})
}

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500);
    res.render('error', { error: err })
};


module.exports = {
    allowCrossDomain,
    checkAuthentication,
    isUserModerator,
    isUserAdmin,
    errorHandler,
    checkBody,
	checkIfValidId,
	checkIfValidCategory	
};
