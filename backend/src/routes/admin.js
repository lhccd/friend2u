"use strict";

const express = require('express');
const router = express.Router();

const middlewares = require('../middleware/middlewares');
const AdminController = require('../controllers/admin');


router.put('/moderator/make',[middlewares.checkAuthentication, middlewares.isUserAdmin], AdminController.makeModerator);
router.put('/moderator/revoke',[middlewares.checkAuthentication, middlewares.isUserAdmin], AdminController.revokeModerator);


module.exports = router;
