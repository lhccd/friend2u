"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middleware/middlewares');
const AuthController = require('../controllers/auth');


router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/token', AuthController.token);
router.post('/changePassword', middlewares.checkAuthentication, AuthController.changePassword);

router.get('/me', middlewares.checkAuthentication , AuthController.me);
router.get('/moderator', [middlewares.checkAuthentication, middlewares.isUserModerator] , AuthController.moderator);
<<<<<<< HEAD
router.post('/logout', AuthController.logout);
=======
router.post('/logout', middlewares.checkAuthentication, AuthController.logout);
>>>>>>> auth


module.exports = router;
