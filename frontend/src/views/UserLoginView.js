"use strict";

import React from 'react';

import UserLogin from '../components/UserLogin';

import AuthService from '../services/AuthService';
import TokenService from '../services/TokenService';

import { withRouter } from 'react-router-dom';



export class UserLoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async login(user) {
        try {
            let tokens = await AuthService.login(user.username, user.password);
            if(tokens.hasOwnProperty('accessToken') && tokens.hasOwnProperty('refreshToken')){
				TokenService.setTokens(tokens.accessToken,tokens.refreshToken);
			}
			
			const {location} = this.props;
            if(location.state && location.state.from) {
				this.props.history.push(location.state.from);
			} else {
				this.props.history.push('/');
			}
        } catch(err) {
            console.error(err);
            this.setState({
                error: err
            });
        }
    }

    render() {
        return (
          <UserLogin onSubmit={(user) => this.login(user)} error={this.state.error}></UserLogin>
        );
    }
}

