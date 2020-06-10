"use strict";

const UserModel = require('../models/user');


//create only for testing other methods
const create = (req, res) => {
    // Check whether there is something to store in our DB.
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    // Try to crate an user.
    UserModel.create(req.body)
        .then(user=> res.status(201).json(user))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};


// Reading an existing User. 
const read = (req, res) => {
    UserModel.findById(req.params.id).exec()
        .then(user => {

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });
            user = user.toObject();
            delete user.password;
            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};


// Updating an existing user.
const update = (req, res) => {
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }

    console.log(req.body);
    
    const editableUser = {
        birthday: req.body.birthday,
        name: req.body.name,
        surname: req.body.surname,
        gender: req.body.gender,   
    }

    UserModel.findByIdAndUpdate(req.params.id,{$set: editableUser},{
        new: true,
        runValidators: true}).exec()
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

// Remove an existing user.
const remove = (req, res) => {
    UserModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `User with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

// List all the users
const list  = (req, res) => {
    UserModel.find({}).then(users => {
        users.forEach((user) => {
            user = user.toObject();
            delete user.password;
            res.status(200).json(user);  
        })}).catch(error => res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                  }));
};


module.exports = {
    create,
    read,
    update,
    remove,
    list,
};
