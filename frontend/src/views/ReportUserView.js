"use strict";

import React from 'react';
import { ReportUserPage } from '../components/reports/ReportUserPage';
import { LoadingScreen } from '../components/LoadingScreen';
import { NotFound } from '../components/NotFound';
import { ServerError } from '../components/ServerError';

import { Redirect } from 'react-router-dom';

import AuthService from '../services/AuthService'
import UserService from '../services/UserService'
import ReportService from '../services/ReportService'

export class ReportUserView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        };
        
        this.createReport = this.createReport.bind(this)
    }
    
    async componentWillMount(){
		let id = this.props.match.params.id
		this.setState({loading: true})
		await this.updateUser(id)
	}
	
    async componentWillReceiveProps(newProps){
		let id = newProps.match.params.id
		this.setState({loading: true})
		if(this.props.match.params.id !== id){
			await this.updateUser(id)
		}
	}
	
	async updateUser(id) {
		try{
			let user = await UserService.getUserProfile(id)
			console.log(user,id)
			this.setState({name: user.username, loading: false, id: id})
		}
		catch(err){
			console.log(err)
			if(err.error === 'Bad Request' || err.error == 'Not Found'){
				this.setState({id: null, loading: false})
			}
			else{
				this.setState({id: null, serverError: true, loading: false})
			}
		}
	}
	
	async createReport(reason, description) {
		try{
			let category = this.props.match.params.category
			let id = this.state.id
			console.log(category, id, reason, description)
			let res = await ReportService.createReport(category, id, reason, description)
			console.log(res)
			this.setState({success: 'The user has been reported. Thank you for your feedback', error: false})
		}
		catch(err){
			if(err === 'Bad Request' || err == 'Not Found'){
				this.setState({id: null, loading: false})
			}
			//We want to give the idea to people that they can report more then one time but actually this is not possible
			else if(err == 'Duplicate key'){
				this.setState({success: 'The user has been reported. Thank you for your feedback', error: false})
			}
			else{
				this.setState({id: null, error: true, loading: false, success: false})
			}
		}
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
		let { loading, name, notFound, serverError, id, success, error } = this.state
		
		let category = this.props.match.params.category
		console.log(category)
		
		if(serverError) return this.renderServerError()
		
		if(loading) return this.renderLoading();
		
		if(!id) return this.renderNotFound()
		
		
		if(category === 'user'){
			let me = AuthService.getCurrentUser()
			if(me && me.id === id){
				return  <Redirect to={{pathname: `/profile/${id}`}}/>
			}
			return <ReportUserPage username={name} id={id} success={success} error={error} onSubmit={this.createReport} />
		}
		return this.renderNotFound()
    }
}

