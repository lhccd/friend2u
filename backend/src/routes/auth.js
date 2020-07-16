"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middleware/middlewares');
const AuthController = require('../controllers/auth');


router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/refresh_token', middlewares.checkAuthentication, AuthController.refresh_token);
router.post('/password/change', middlewares.checkAuthentication, AuthController.changePassword);
router.post('/password/reset', AuthController.sendPasswordResetEmail);
router.post('/password/reset/:id/:token', AuthController.resetPassword);

router.get('/me', middlewares.checkAuthentication , AuthController.me);
router.get('/moderator', [middlewares.checkAuthentication, middlewares.isUserModerator] , AuthController.moderator);
router.post('/logout', middlewares.checkAuthentication, AuthController.logout);


module.exports = router;
