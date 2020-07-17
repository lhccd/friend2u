"use strict";

import React from 'react';
import { ReportUserPage } from '../components/reports/ReportUserPage';
import { ReportActivityPage } from '../components/reports/ReportActivityPage';
import { LoadingScreen } from '../components/LoadingScreen';
import { NotFound } from '../components/NotFound';
import { ServerError } from '../components/ServerError';

import { Redirect } from 'react-router-dom';

import AuthService from '../services/AuthService'
import UserService from '../services/UserService'
import ReportService from '../services/ReportService'
import ActivityService from '../services/ActivityService'

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
		let category = this.props.match.params.category
		this.setState({loading: true})
		await this.updateReported(id, category)
	}
	
    async componentWillReceiveProps(newProps){
		let id = newProps.match.params.id
		let category = newProps.match.params.category
		this.setState({loading: true})
		if(this.props.match.params.id !== id || this.props.match.params.category !== category){
			await this.updateReported(id, category)
		}
	}
	
	async updateReported(id, category) {
		try{
			let name = ''
			if(category === 'user'){
				let res = await UserService.getUserProfile(id)
				name = res.usernname
			}
			else{
				let res = await ActivityService.getActivity(id)
				console.log(res)
				name = res.activityName
			}
			console.log(name,id)
			this.setState({name: name, loading: false, id: id})
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
			this.setState({success: `The ${category} has been reported. Thank you for your feedback`, error: false})
		}
		catch(err){
			if(err === 'Bad Request' || err == 'Not Found'){
				this.setState({id: null, loading: false})
			}
			//We want to give the idea to people that they can report more then one time but actually this is not possible
			else if(err == 'Duplicate key'){
				this.setState({success: `The ${category} has been reported. Thank you for your feedback`, error: false})
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
		else{
			return <ReportActivityPage name={name} id={id} success={success} error={error} onSubmit={this.createReport} />
		}
    }
}

