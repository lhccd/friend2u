const express = require('express');
const router = express.Router();

const ReportHandler = require('../controllers/reports')

router.get('/', ReportHandler.list);
router.post('/', ReportHandler.create);
router.delete('/:id', ReportHandler.remove);

module.exports = router;