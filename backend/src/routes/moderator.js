"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middleware/middlewares');
const ModeratorController = require('../controllers/moderator');


router.post('/user/block',[middlewares.checkAuthentication, middlewares.isUserModerator], ModeratorController.blockUser);
router.post('/user/unblock',[middlewares.checkAuthentication, middlewares.isUserModerator], ModeratorController.unblockUser);

router.get('/report/users',[middlewares.checkAuthentication, middlewares.isUserModerator], (req,res) => {ModeratorController.groupReportsById(req,res,'user')});
router.get('/report/users/:id',[middlewares.checkAuthentication, middlewares.isUserModerator], (req,res) => {ModeratorController.listReports(req,res,'user')});
router.delete('/report/users/:id',[middlewares.checkAuthentication, middlewares.isUserModerator], (req,res) => {ModeratorController.removeReportsByReported(req,res,'user')});

router.delete('/report/:id',[middlewares.checkAuthentication, middlewares.isUserModerator], (req,res) => {ModeratorController.removeReport(req,res)});

router.get('/report/activities',[middlewares.checkAuthentication, middlewares.isUserModerator], (req,res) => {ModeratorController.listReports(req,res,'activity')});
router.get('/report/activities/:id',[middlewares.checkAuthentication, middlewares.isUserModerator], (req,res) => {ModeratorController.listReports(req,res,'activity')});
router.delete('/report/activities/:id',[middlewares.checkAuthentication, middlewares.isUserModerator], (req,res) => {ModeratorController.removeReportsByReported(req,res,'activity')});

module.exports = router;
