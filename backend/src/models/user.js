"use strict";

const mongoose = require('mongoose');

const requiredProperties = require('./user_config')

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

/* * * * * * * * * * *
 * 
 *  AUX FUNCTIONS
 * 
 * * * * * * * * * * */

const getAge = (birthday) => {
	var today = new Date();
	var age = today.getFullYear() - birthday.getFullYear();
	var m = today.getMonth() - birthday.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
		age--;
	}
	return age;
}


//-------------------------------------------------------------------


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
		default: 'http://127.0.0.1:3000/static/images/profile/default.png'
	},

	
	role: {
		type: String,
		enum: ['user','moderator','admin'],
		default: 'user',
	},
	
	banUntilDate: {
		type: Number
	},

	
};

for (var prop of requiredProperties){
	schema[prop].required = true;
}

const UserSchema  = new mongoose.Schema(schema,{getters: true})

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

UserSchema.pre('findOneAndUpdate', function(next) {
    var user = this;

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user._update.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user._update.password = hash;
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


//Compute the age from the birthday
UserSchema.virtual('age').get(function() {
	return getAge(this.birthday);
});


//Check if the user is over 18 to sign up
UserSchema.path('birthday').validate(function(birthday) {
	
	if(getAge(birthday) < 18)
		this.invalidate('birthday', 'You must be over 18 to sign up');
		
}, null);

// Export the User model
module.exports = mongoose.model('User', UserSchema);
