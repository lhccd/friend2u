"use strict";

const jwt    = require('jsonwebtoken');

const config = require ('../config');

const checkBody = (req,res,next,requiredProperties) => {
	for(var prop of requiredProperties){
		if (!Object.prototype.hasOwnProperty.call(req.body, prop)) return res.status(400).json({
			error: 'Bad Request',
			message: `The request body must contain a ${prop} property`
		});
	};
	
	next();
}

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');

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
		
		console.log(decoded.banTime)
		console.log(Date.now())
		
		console.log(decoded.banTime)
		if(decoded.banTime && decoded.banTime > Date.now()){
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
    errorHandler,
    checkBody
};
