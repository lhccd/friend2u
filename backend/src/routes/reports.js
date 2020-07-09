const express = require('express');
const router = express.Router();

const ReportHandler = require('../controllers/reports')
const middlewares = require('../middleware/middlewares');

const requiredProperties = require('./requiredProperties');


router.get('/', ReportHandler.list);
router.post('/',[middlewares.checkAuthentication, (req,res,next) => middlewares.checkBody(req,res,next,requiredProperties.reportProperties)], ReportHandler.create);
router.delete('/:id', ReportHandler.remove);

module.exports = router;
