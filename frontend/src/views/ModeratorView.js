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
			reports: [],
			showModal: false,
			reportsModal: []
		}
		
		this.handleChangeCategory = this.handleChangeCategory.bind(this);
		this.getReportList = this.getReportList.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
    }
    
    async getReportList(){
		try{
			let reports = await ReportService.getReportList(this.state.category)
			reports = this.state.reports.concat(reports)
			console.log(reports[0].reports[0]._id)
			this.setState({reports: reports[0].reports})
		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
		}
	}
	
	async getReportListById(id){
		try{
			let reports = await ReportService.getReportList(this.state.category,null,id)
			console.log(reports)
			this.setState({reportsModal: reports.reports})
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
    
    handleChangeCategory(category) {
		this.setState({category: category})
	}
	
	toggleModal(show,id) {
		//TODO: Retrieve reports
		if(show) this.getReportListById(id)
		this.setState({showModal: show})
	}
	
	renderModerator() {
		const {category, showModal, reports, reportsModal} = this.state;
		
		return <Moderator
				category={category}
				reports={reports}
				getReports={this.getReportList}
				handleSelect={this.handleChangeCategory}
				showModal={showModal}
				toggleModal={this.toggleModal}
				reportsModal={reportsModal}
			  />;
	}
	
	renderNotAuthorized() {
		return <NotAuthorized/>;
	}

    render() {
		const {role}     = this.props;
		
        return role === 'moderator'?this.renderModerator():this.renderNotAuthorized();
    }
}

