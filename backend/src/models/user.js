"use strict";

const mongoose = require('mongoose');

const requiredProperties = require('./user_config')

const UserSchema  = new mongoose.Schema({
	required: requiredProperties,
	
    username: {
        type: String,
        unique: true,
    },
    
    hashedPassword: {
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
		default: 'static/images/default.png'
	}
	
	
});


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

UserSchema.set('versionKey', false);


// Export the Movie model
module.exports = mongoose.model('User', UserSchema);
