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
			reports: {
				'users': {
					list: [],
					all: false,
					deleted: 0,
				},
				'activities': {
					list: [],
					all: false,
					deleted: 0,
				},
			},
			reportsActivities: [],
			showModal: false,
			reportsModal: [],
			modalReported: {
				id: '',
				name: '',
				idx: -1,
			},
		}
		
		this.handleChangeCategory = this.handleChangeCategory.bind(this);
		this.getReportList = this.getReportList.bind(this);
		this.banUser = this.banUser.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.deleteReportsById = this.deleteReportsById.bind(this);
		this.refreshReports = this.refreshReports.bind(this);
    }
    
    componentDidMount() {
		this.getReportList(this.state.category)
	}
    
    async refreshReports(category){
		let { reports } = this.state
		await this.setState(prevState => {
			let rep = Object.assign({}, reports)
			rep[category] = {list: [],all: false,deleted: 0}
			return {reports: rep}
		})
		
		this.getReportList(category)
	}
    
    async getReportList(category){
		try{
			let { reports } = this.state
			let currReports = Object.assign({}, reports[category])
			let limit = 10
			let skip = currReports.list.length - currReports.deleted
			let newReports = await ReportService.getReportList(category,null,limit,skip)
			
			
			if(newReports.reports.length === 0 || newReports.reports.length < limit){
				currReports.all = true
			}
			currReports.list = currReports.list.concat(newReports.reports)
			this.setState(prevState => {
				let rep = Object.assign({}, reports)
				rep[category] = currReports
				return {reports: rep}
			})
		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
		}
	}
	
	async getReportListById(id, name, idx){
		try{
			let reports = await ReportService.getReportList(this.state.category,id,null,null)
			console.log("aaa: " + idx)
			this.setState({reportsModal: reports.reports, modalReported: {id: id, name: name, idx: idx}})
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
		let { category, reports } = this.state
		
		let currReports = Object.assign({}, reports[category])
		delete currReports.list[idx]
		currReports.deleted += 1
		//reports[category].list[idx].removed = true;
		
		console.log(currReports)
		this.setState(prevState => {
			let rep = Object.assign({}, reports)
			reports[category] = currReports
			return {rep}
		})
		
		
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
    
	async banUser(id, time, idx){
		try{
			let reports = await ReportService.banUser(id,time)
			this.removeReportItem(idx)
		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
		}
	}
    
    handleChangeCategory(category) {
		this.setState({category: category})
		let reports = this.state.reports[category]
		if(reports.list.length === 0 && !reports.all){
			this.getReportList(category);
		}
		
		this.setState({showModal: false})
	}
	
	toggleModal(show,id,username,idx) {
		if(show){
			this.getReportListById(id, username, idx)
			this.setState({showModal: true})
		}
		else this.setState({reportsModal: [], modalReported: {id: '', name: '', idx: -1}, showModal: false})
	}
	
	renderModerator() {
		const {category, showModal, reports, reportsModal, modalReported, allReports} = this.state;
		
		return <Moderator
				category={category}
				reports={reports}
				getReports={this.getReportList}
				banUser={this.banUser}
				handleSelect={this.handleChangeCategory}
				showModal={showModal}
				toggleModal={this.toggleModal}
				modalReported={modalReported}
				reportsModal={reportsModal}
				deleteReports={this.deleteReportsById}
				allReports={allReports}
				refreshReports={this.refreshReports}
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

