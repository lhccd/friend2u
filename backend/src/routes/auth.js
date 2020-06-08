"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middleware/middlewares');
const AuthController = require('../controllers/auth');


router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/token', AuthController.token);

router.get('/me', middlewares.checkAuthentication , AuthController.me);
router.get('/moderator', [middlewares.checkAuthentication, middlewares.isUserModerator] , AuthController.moderator);
router.post('/logout', AuthController.logout);


module.exports = router;
