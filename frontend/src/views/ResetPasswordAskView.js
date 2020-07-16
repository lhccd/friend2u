	"use strict";

import React from 'react';

import ResetPasswordAsk from '../components/ResetPasswordAsk';

import AuthService from '../services/AuthService';
import TokenService from '../services/TokenService';

import { withRouter } from 'react-router-dom';

export class ResetPasswordAskView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        
        this.resetPasswordAsk = this.resetPasswordAsk.bind(this)
    }

    async resetPasswordAsk(email) {
        try {
            let res = await AuthService.resetPasswordAsk(email);
            console.log(res)
            this.setState({success: true})
        } catch(err) {
			console.log("Error");
            console.error(err);
            this.setState({
                success: true
            });
        }
    }

    render() {
        return (
			//There could be a error (e.g. the user could have entered a wrong email) but we consider all the results as success for security reasons
			<ResetPasswordAsk success={this.state.success} onSubmit={this.resetPasswordAsk}/>
        );
    }
}

