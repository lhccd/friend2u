"use strict";

const mongoose = require('mongoose');
	
const UserSchema  = new mongoose.Schema({
	required: [
		'username',
		'hashedPassword',
		'email',
		'birthday',
		'name',
		'username',
		
		//We consider that people use the app have a mobile phone
		'mobile',
	]
	
    username: {
        type: String,
        unique: true,
    },
    
    hashedPassword: {
        type: String,
    },
    
    email: {
		type: String,
		validate: '^.+\@.+\..+$',
		unique: true,
	},
	
	name: {
		type: String,
	}
	
	surname: {
		type: String,
	}
	
	mobile: {
		type: String
		validate: '^\+?\d{1,16}$'
	}
	
	birthday: {
		type: Date,
	},
	
	bio: {
		type: String,
		default: "I'm bored. Let's hang out!"
	}
	
	gender: {
		type: String,
		enum: ['Male','Female','Other','NotDeclared']
	}
	
});

UserSchema.set('versionKey', false);


// Export the Movie model
module.exports = mongoose.model('User', UserSchema);
