"use strict";

const ActivityModel = require('../models/activities');

// Creating a new DB-Entrie for a new activity.
const create = (req, res) => {
    // Check whether there is something to store in our DB.
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    // Try to crate an activity.
    ActivityModel.create(req.body)
        .then(activity => res.status(201).json(activity))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

// Reading an existing activity.
const read   = (req, res) => {
    ActivityModel.findById(req.params.id).exec()
        .then(activity => {

            if (!activity) return res.status(404).json({
                error: 'Not Found',
                message: `Activity not found`
            });

            res.status(200).json(activity)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};


// Updating an existing activity.
const update = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    console.log(req.body);

    ActivityModel.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true}).exec()
        .then(activity => res.status(200).json(activity))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

// Remove an existing activity.
const remove = (req, res) => {
    ActivityModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Activity with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

// List all existing activities.
const list  = (req, res) => {
    ActivityModel.find({}).exec()
        .then(activities => res.status(200).json(activities))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};


module.exports = {
    create,
    read,
    update,
    remove,
    list
};