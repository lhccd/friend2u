	"use strict";

import React from 'react';

import ResetPassword from '../components/ResetPassword';

import AuthService from '../services/AuthService';
import TokenService from '../services/TokenService';

import { withRouter } from 'react-router-dom';

export class ResetPasswordView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        
        this.id = this.props.match.params.id;
        this.token = this.props.match.params.token;
        this.resetPassword = this.resetPassword.bind(this)
    }

    async resetPassword(password) {
        try {
            let res = await AuthService.resetPassword(password,this.id,this.token);
            console.log(res)
            this.setState({success: true, error: null})
        } catch(err) {
			console.log("Error");
            console.error(err);
            
            let error = 'It was not possible to update the password. Remember that you can use this link only once.'
            if(err == 'Update error'){
				error = 'You can\'t use a password equal to the previous one'
			}
			this.setState({success: false, error: error});
        }
    }

    render() {
        return (
			//There could be a error (e.g. the user could have entered a wrong email) but we consider all the results as success for security reasons
			<ResetPassword success={this.state.success} error={this.state.error} onSubmit={this.resetPassword}/>
        );
    }
}

