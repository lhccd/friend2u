"use strict";

import React from 'react';

import UserLogin from '../components/UserLogin';

import AuthService from '../services/AuthService';


export class UserLoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async login(user) {
        try {
            let ret = await AuthService.login(user.username, user.password);
            this.props.history.push('/');
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
