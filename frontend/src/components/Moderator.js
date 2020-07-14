"use strict";

import React from 'react';
import { Fragment } from 'react';
import AuthService from '../services/AuthService';

import Page from './Page';

import {NavBar, Nav, NavItem, Modal, Button, Card} from 'react-bootstrap'
import {ReportList} from './ReportList'
import { ReportUserModal } from './ReportUserModal'
import { ReportActivityModal } from './ReportActivityModal'

import { FaSortDown } from "react-icons/fa";


const style = {
	margin: 'auto',
	marginTop: '30px',
	marginBottom: '30px',
	width: '90%',
	height: '95%',
}


export class Moderator extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
	}
	

  render(){
	  
	let { category, reports, handleSelect, toggleModal, deleteReports, getReports, refreshReports } = this.props
	
	reports = reports[category];
	
	console.log(reports)
	  
    return(
		<Card style={style}>
			<Card.Header>
				<Nav variant="tabs" activeKey={category} onSelect={handleSelect}>
				  <Nav.Item>
					<Nav.Link eventKey="users">Users</Nav.Link>
				  </Nav.Item>
				  <Nav.Item>
					<Nav.Link eventKey="activities">Activities</Nav.Link>
				  </Nav.Item>
				</Nav>
			</Card.Header>
			
			<ReportList
				category={category}
				reports={reports}
				//handleListReports={this.props.handleListReports}
				toggleModal={toggleModal}
				deleteReports={deleteReports}
				refreshReports={refreshReports}
			/>
			
			{reports.all?'':
				<Button style={{color: 'grey'}} variant="link" onClick={() => getReports(category)}>
					<FaSortDown size={30}/>
				</Button>
			}
			
			{this.props.category === 'users'?<ReportUserModal
												banUser={this.props.banUser}
												modalReported={this.props.modalReported}
												show={this.props.showModal}
												toggleModal={this.props.toggleModal}
												reports={this.props.reportsModal}
												deleteReports={this.props.deleteReports}
												userProfile={false}
											/>:<ReportActivityModal
												modalReported={this.props.modalReported}
												show={this.props.showModal}
												toggleModal={this.props.toggleModal}
												reports={this.props.reportsModal}
												deleteReports={this.props.deleteReports}
											/>}
		</Card>
    );
  }
}
