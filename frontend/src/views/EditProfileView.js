"use strict";

import React from 'react';


import { EditProfile } from '../components/EditProfile';
import { LoadingScreen } from '../components/LoadingScreen';
import { ServerError } from '../components/ServerError';

import UserService from '../services/UserService'
import AuthService from '../services/AuthService'


export class EditProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			user: null,
			notFound: false,
			loading: true,
			serverError: false,
		}
		
		let me = AuthService.getCurrentUser()
		if(me && me.id){
			this.id = me.id
		}
		else{
			this.state.serverError = true
		}
		
		this.updateProfile = this.updateProfile.bind(this)
		this.uploadImage = this.uploadImage.bind(this)
    }
    
    async componentWillMount() {
		let id = this.id
		try{
			let user = await UserService.getUserProfile(id)
			this.setState({user: user, loading: false})
		}
		catch(err){
			if(err.error === 'Bad Request'){
				this.setState({notFound: true, loading: false})
			}
			else{
				this.setState({serverError: true, loading: false})
			}
		}
	}
	
	async updateProfile(user) {
		try{
			let res = await UserService.updateUserProfile(user)
			console.log(res)
			let id = res.user.id
			this.props.history.push(`/profile/${id}`);
		}
		catch(err){
			console.log(err)
		}
	}
	
	async uploadImage(file) {
		try{
			let res = await UserService.uploadUserPicture(file)
			console.log(res)
			//this.props.history.push(`/profile/${this.id}`);
			window.location = `/#profile/${this.id}`;
		}
		catch(err){
			console.log(err)
		}
	}
	
	renderProfile(user) {
		return <EditProfile uploadImage={this.uploadImage} user={user} onSubmit={this.updateProfile}/>
	}
	
	renderLoading() {
		return <LoadingScreen />
	}

	
	renderServerError() {
		return <ServerError />
	}


    render() {
		
		let { loading, user, notFound, serverError } = this.state
		
		if(serverError) return this.renderServerError()
		
		if(loading) return this.renderLoading();
		
		return this.renderProfile(user)
    }
}
