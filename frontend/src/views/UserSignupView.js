"use strict";

import React from 'react';

import UserSignup from '../components/UserSignup';

import UserService from '../services/AuthService';


export class UserSignupView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async signup(user) {
        try {
            let ret = await UserService.register(user);
            this.props.history.push('/login');
        } catch(err) {
			let error = err.duplicateKey? `The ${err.duplicateKey} has already be taken. Please select another.`:'An error occured. Please contact us.' 
            if(err.duplicateKey)
				this.setState({
					error: error,
					duplicateKey: err.duplicateKey
				});
			else
				this.setState({
					error: error,
				});
        }
    }

    render() {
        return (
            <UserSignup onSubmit={(user) => this.signup(user)} error={this.state.error} duplicateKey={this.state.duplicateKey} ></UserSignup>
        );
    }
}
