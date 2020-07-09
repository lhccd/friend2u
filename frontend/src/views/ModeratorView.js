"use strict";

import React from 'react';

import {Moderator} from '../components/Moderator';
import {NotAuthorized} from '../components/NotAuthorized';

import AuthService from '../services/AuthService';
import ReportService from '../services/ReportService';


export class ModeratorView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			category: 'users',
			reportsUser: [],
			reports: [],
			showModal: false,
			reportsModal: [],
			showingUser: {
				id: '',
				username: '',
				idx: -1,
			},
			allReports: false,
			deleted: 0
		}
		
		this.handleChangeCategory = this.handleChangeCategory.bind(this);
		this.getReportList = this.getReportList.bind(this);
		this.banUser = this.banUser.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.deleteReportsById = this.deleteReportsById.bind(this);
    }
    
    closeModal(){
		this.setState({reportsModal: [], showingUser: {id: '', username: '', idx: -1}, showModal: false})
	}
    
    async getReportList(){
		try{
			let limit = 2
			let skip = this.state.reports.length - this.state.deleted
			let newReports = await ReportService.getReportList(this.state.category,null,limit,skip)
			let reports = this.state.reports
			let newState = {}
			if(newReports.reports.length === 0 || newReports.reports.length < limit){
				newState.allReports = true
			}
			reports = reports.concat(newReports.reports)
			newState.reports = reports
			this.setState(newState)
		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
		}
	}
	
	async getReportListById(id, username, idx){
		try{
			let reports = await ReportService.getReportList(this.state.category,id,null,null)
			console.log("aaa: " + idx)
			this.setState({reportsModal: reports.reports, showingUser: {id: id, username: username, idx: idx}})
			//console.log(reports[0].reports[0]._id)
			//this.setState({reports: reports[0].reports})
		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
		}
	}
	
	removeReportItem(idx){
		let reports = this.state.reports
		reports[idx].removed = true;
		
		let deleted = this.state.deleted;
		
		this.setState({reports: reports, deleted: deleted+1})
	}
	
	async deleteReportsById(id, username, idx){
		try{
			let res = await ReportService.deleteReportsById(this.state.category,id)
			let reports = this.state.reports
			reports[idx].removed = true;
			
			let deleted = this.state.deleted;
			
			this.setState({reports: reports, deleted: deleted+1})
		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
		}
	}
    
	async banUser(id, time){
		try{
			let reports = await ReportService.banUser(this.state.showingUser.id,time)
			this.removeReportItem(this.state.showingUser.idx)
			this.closeModal()
		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
		}
	}
    
    handleChangeCategory(category) {
		this.setState({category: category, reports: [], allReports: false})
	}
	
	toggleModal(show,id,username,idx) {
		//TODO: Retrieve reports
		if(show) this.getReportListById(id, username, idx)
		this.setState({showModal: show})
	}
	
	renderModerator() {
		const {category, showModal, reports, reportsModal, showingUser, allReports} = this.state;
		
		console.log(reports)
		
		return <Moderator
				category={category}
				reports={reports}
				getReports={this.getReportList}
				banUser={this.banUser}
				handleSelect={this.handleChangeCategory}
				showModal={showModal}
				toggleModal={this.toggleModal}
				showingUser={showingUser}
				reportsModal={reportsModal}
				deleteReports={this.deleteReportsById}
				allReports={allReports}
			  />;
	}
	
	renderNotAuthorized() {
		return <NotAuthorized/>;
	}

    render() {
		const {role} = this.props;
		
        return role === 'moderator'?this.renderModerator():this.renderNotAuthorized();
    }
}

