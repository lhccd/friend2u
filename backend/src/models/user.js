"use strict";

const mongoose = require('mongoose');

const requiredProperties = require('./user_config')

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const schema  = {	
    username: {
        type: String,
        unique: true,
    },
    
    password: {
        type: String,
    },
    
    email: {
		type: String,
		validate: /^.+\@.+\..+$/,
		unique: true,
	},
	
	name: {
		type: String,
	},
	
	surname: {
		type: String,
	},
	
	mobile: {
		type: String,
		validate: /^\+?\d{1,16}$/
	},
	
	//This must be passed already as a Date object
	birthday: {
		type: Date,
	},
	
	bio: {
		type: String,
		default: "I'm bored. Let's hang out!"
	},
	
	gender: {
		type: String,
		enum: ['male','female','other','notDeclared']
	},
	
	profilePicture: {
		type: String,
		default: 'https://friend2u.s3.amazonaws.com/profile_pictures/default.png'
	},

	
	role: {
		type: String,
		enum: ['user','moderator','admin'],
		default: 'user',
<<<<<<< HEAD
	}	
=======
	},
	
	banUntilDate: {
		type: Number
	},

	
>>>>>>> auth
};

for (var prop of requiredProperties){
	schema[prop].required = true;
}

const UserSchema  = new mongoose.Schema(schema)

//We create the hashed password directly when we insert a new user.
//We also use salt.
//NB: this hook doesn't work with findOneAndUpdate
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

//Also comparing the two passwords is done here
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


//Updating the password
UserSchema.methods.updatePassword = function(oldPassword, newPassword, cb) {
	var user = this;
	
    bcrypt.compare(oldPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        if(!isMatch) return cb(404);
        
        user.password = newPassword;
        
        user.save((err) => {
			cb(err);
		})
        
        
    });
};

UserSchema.set('versionKey', false);


// Export the User model
module.exports = mongoose.model('User', UserSchema);
