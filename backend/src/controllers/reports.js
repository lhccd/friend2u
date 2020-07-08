const UserReportModel = require('../models/userReports');
const ActivityReportModel = require('../models/activityReports');

const create = (req, res) => {
	
    const category = req.body.category;
    const reason = req.body.reason;
    const description = req.body.description;
    const issuer = req.id;
    const reported = req.body.reported;
    
    if(category === 'user' && issuer === reported) {
		return res.status(400).json({error: 'Bad Request', message: 'You can\'t report yourself. Why would you do that? :('})
	}

    const newReport = (category === 'user')?new UserReportModel({reason, description, issuer, reported}):ActivityReportModel({reason, description, issuer, reported});
    
	newReport.populate('reported', 'username', function(err,report) {
		if(err){
			console.log(err);
			return res.status(500).json({error: 'Internal error', message: 'It was not possible to create a new report'})
		}
		
		if(!report.reported) return res.status(404).json({error: `${category} not found`, message: `The reported ${category} doesn\'t exist`})
		
		//report = report.toObject()
		//report['test'] = 'aaa'
		
		//console.log("here: " + report.reason)
		
		//report = UserReportModel({reason: report.reason, description: report.description, issuer: report.issuer, reported: report.reported._id, username: report.reported.username})
		//report = UserReportModel({reason:'untrustworthy', description:'ciaociaociao', issuer:'5f032b4f8b7b6359c7d7c911', reported:'5f032b4f8b7b6359c7d7c988'})
		//console.log(report)
		
		report.save().then((report) =>{
			console.log(report)
			return res.status(200).json({message: 'Report created successfully', id: report._id})
			
			})
        .catch((err) => {
			console.log(err)
			if(err.code === 11000) return res.status(401).json({error: 'Duplicate key', message: `The user has already reported this ${category}`})
			else return res.status(500).json({error: 'Internal error', message: 'It was not possible to create a new report'})
		});
	});
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
