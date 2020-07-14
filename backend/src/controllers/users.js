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
	
	//We want to only some information
	let attributes = [
		'username',
		'name',
		'surname',
		'gender',
		'bio',
		'birthday',
		'profilePicture',
		'role',
	]
	
	
    UserModel.findById(req.params.id).select(attributes).exec()
        .then(user => {
            
            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });
            
            let age = user.age
            user = user.toObject();
            user.age = age
            
            res.status(200).json(user)
        })
        .catch((error) => {
			res.status(500).json({
					error: 'Internal Server Error',
					message: error.message
			})
		})
};


// Updating an existing user.
const update = (req, res) => {
	/*
    if (Object.keys(req.body).length === 0)
    {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'The request body is empty'
        });
    }
    */

    console.log(req.body);   
    
    const editableUser = {
        //birthday: req.body.birthday,
        //name: req.body.name,
        //surname: req.body.surname,
        //gender: req.body.gender,
        //bio: req.body.bio,
    }
    

    
    if(req.body.name) editableUser.name = req.body.name
    if(req.body.surname) editableUser.surname = req.body.surname
    if(req.body.bio) editableUser.bio = req.body.bio
    

	//The id is taken from the token
    UserModel.findByIdAndUpdate(req.id,{$set: editableUser},{
        new: true,
        runValidators: true}).exec()
        .then((user) => {
			res.status(200).json({"ok": true, "message": "Profile updated successfully", user: {name: user.name, surname: user.surname, bio: user.bio, id: user._id} })
		})
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};


//uploadProfilePicture
const uploadProfilePicture = (req, res) => {
    
    //req.file contains the image. Now we simply store it in this server since we don't have an object storage
    //We should upload the image on the object storage and then pass the link
    
    //req.file
    
    let url = `http://127.0.0.1:3000/static/images/profile/${req.id}-profilepic`
    
	UserModel.findByIdAndUpdate(req.id,{$set: {profilePicture: url}},{
		new: true,
		runValidators: true
	})
	.exec()
	.then((user) => {
		res.status(200).json({"ok": true, "message": "Profile picture updated successfully", url: user.profilePicture})
	})
	.catch(error => res.status(500).json({
		error: 'Internal server error',
		message: error.message
	}));
};

const getProfilePicture = (req, res) => {
    // Check whether there is something to store in our DB.
    
    UserModel.findById(req.params.id).select('profilePicture').exec()
        .then(user => {
            
            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });
            
            let pic = user.profilePicture
            res.writeHead(200, {
				'Content-Type': 'image/png',
				'Content-Length': pic.buffer.length
			});
			res.end(Buffer.from(pic.buffer, 'binary'));
        })
        .catch((error) => {
			res.status(500).json({
					error: 'Internal Server Error',
					message: error.message
			})
	})
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
        var listusers = new Array();
        users.forEach((user) => {
            user = user.toObject();
            delete user.password;
            listusers.push(user);
            })
            res.status(200).json(listusers);  
        }).catch(error => res.status(500).json({
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
    uploadProfilePicture,
    getProfilePicture,
};
