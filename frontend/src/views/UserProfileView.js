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
			loading: true,
			serverError: false,
			reports: [],
			showModal: false,
			id: null,
		}
		
		this.updateUser = this.updateUser.bind(this)
		
    }
    
    
    async componentWillMount(){
		let id = this.props.match.params.id
		this.setState({loading: true})
		await this.updateUser(id)
	}
	
    async componentWillReceiveProps(newProps){
		this.setState({loading: true})
		let id = newProps.match.params.id
		if(this.props.match.params.id !== id){
			await this.updateUser(id)
		}
	}
	
    
    async updateUser(id) {
		try{
			let user = await UserService.getUserProfile(id)
			this.setState({user: user, loading: false, id: id})
		}
		catch(err){
			if(err.error === 'Bad Request' || err.error == 'Not Found'){
				this.setState({id: null, loading: false})
			}
			else{
				this.setState({id: null, serverError: true, loading: false})
			}
		}
	}

	
	renderOtherProfile(user,editable,id) {
		return <UserProfile updateUser={this.updateUser} user={user} id={id} role={this.props.role} editable={editable}/>
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
		
		let { loading, user, notFound, serverError, id } = this.state
		
		console.log(user)
		
		if(serverError) return this.renderServerError()
		
		if(loading) return this.renderLoading();
		
		if(!id || user.banUntilDate) return this.renderNotFound()
		
		let me = AuthService.getCurrentUser()
		if(me && me.id === id)		
			return this.renderOtherProfile(user,true,id)
        else
			return this.renderOtherProfile(user,false,id)
    }
}
