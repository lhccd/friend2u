const ReportModel = require('../models/reports');

const create = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    // Check whether there is something to store in our DB.
    const category = req.body.category;
    const reason = req.body.reason;
    const description = req.body.description;
    const issuer = req.body.issuer;
    const reported = req.body.reported;

    const newReport = new Reportmodel({category, reason, description, issuer, reported});

    newReport.save()
        .then(() => res.json('Report added!'))
        .catch(err => res.status(400).json('Error: ' + err));

    /*if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    // Try to create a report.
    ReportModel.create(req.body)
        .then(activity => res.status(201).json(activity))
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_create',
            message: error.message
        }));*/
};

const list  = (req, res) => {
    ReportModel.find({}).exec()
        .then(reports => res.status(200).json(reports))
        .catch(error => res.status(500).json({
            error: 'Internal server error - reports_list',
            message: error.message
        }));
};

// Remove an existing report.
const remove = (req, res) => {
    ReportModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Report with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error - activities_remove',
            message: error.message
        }));
};

module.exports = {
    create,
    list,
    remove
}