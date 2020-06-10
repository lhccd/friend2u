"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middleware/middlewares');
const AuthController = require('../controllers/moderator');


router.post('/user/block',[middlewares.checkAuthentication, middlewares.isUserModerator], AuthController.blockUser);
router.post('/user/unblock',[middlewares.checkAuthentication, middlewares.isUserModerator], AuthController.unblockUser);

router.get('/report/users',[middlewares.checkAuthentication, middlewares.isUserModerator], (req,res) => {AuthController.listReports(req,res,'user')});
router.get('/report/activities',[middlewares.checkAuthentication, middlewares.isUserModerator], (req,res) => {AuthController.listReports(req,res,'activity')});

module.exports = router;
