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
        
        console.log(this.context)
    }

    async login(user) {
        try {
            let tokens = await AuthService.login(user.username, user.password);
            if(tokens.hasOwnProperty('accessToken')){
				TokenService.setTokens(tokens.accessToken);
				
				this.props.setRole(AuthService.getUserRole(tokens.accessToken))
			
				const {location} = this.props;
				
				if(location.state && location.state.from) {
					this.props.history.push(location.state.from);
				}
				else {
					this.props.history.push('/');
				}
			}
			else{
				this.setState({
					error: 'Wrong credentials!'
				});
			}
        } catch(err) {
			console.log("Error");
            console.error(err);
            let error = 'It was not possible to login'
            if(err === 'Not found'){
				error = 'Wrong credentials!'
			}
            this.setState({error: error});
        }
    }

    render() {
		
		
        return (
          <UserLogin onSubmit={(user) => this.login(user)} error={this.state.error} />
        );
    }
}

