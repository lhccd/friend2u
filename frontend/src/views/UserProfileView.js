"use strict";

import React from 'react';

import { UserProfile } from '../components/UserProfile';
import { LoadingScreen } from '../components/LoadingScreen';
import { NotFound } from '../components/NotFound';
import { ServerError } from '../components/ServerError';

import UserService from '../services/UserService'
import AuthService from '../services/AuthService'


export class UserProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			user: null,
			notFound: false,
			loading: true,
			serverError: false,
			reports: [],
			showModal: false,
		}
		
		this.id = this.props.match.params.id;
    }
    
    async componentWillMount() {
		let id = this.id
		try{
			let user = await UserService.getUserProfile(id)
			this.setState({user: user, loading: false})
		}
		catch(err){
			if(err.error === 'Bad Request' || err.error == 'Not Found'){
				this.setState({notFound: true, loading: false})
			}
			else{
				this.setState({serverError: true, loading: false})
			}
		}
	}

	
	renderOtherProfile(user,editable,id) {
		return <UserProfile user={user} id={id} role={this.props.role} editable={editable}/>
	}

	
	renderLoading() {
		return <LoadingScreen />
	}
	
	renderNotFound() {
		return <NotFound />
	}
	
	renderServerError() {
		return <ServerError />
	}


    render() {
		
		let { loading, user, notFound, serverError } = this.state
		
		if(serverError) return this.renderServerError()
		
		if(loading) return this.renderLoading();
		
		if(notFound) return this.renderNotFound()
		
		let me = AuthService.getCurrentUser()
		if(me && me.id === this.id)		
			return this.renderOtherProfile(user,true,this.id)
        else
			return this.renderOtherProfile(user,false,this.id)
    }
}
