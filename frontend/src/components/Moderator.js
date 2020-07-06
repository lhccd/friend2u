"use strict";

import React from 'react';
import { Fragment } from 'react';
import AuthService from '../services/AuthService';

import Page from './Page';

import {NavBar, Nav, NavItem, Modal, Button} from 'react-bootstrap'
import {ReportList} from './ReportList'
import {ReportModal} from './ReportModal'

export class Moderator extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
	}
	

  render(){
    return(
		<Fragment>
			<Nav variant="tabs" activeKey={this.props.category} onSelect={this.props.handleSelect}>
			  <Nav.Item>
				<Nav.Link eventKey="users">Users</Nav.Link>
			  </Nav.Item>
			  <Nav.Item>
				<Nav.Link eventKey="activities">Activities</Nav.Link>
			  </Nav.Item>
			</Nav>
			
			<ReportList
				getReports={this.props.getReports}
				reports={this.props.reports}
				handleListReports={this.props.handleListReports}
				toggleModal={this.props.toggleModal}
			/>
			
			<Button onClick={this.props.getReports} >new reports</Button>
			
			<ReportModal
				banUser={this.props.banUser}
				showingUser={this.props.showingUser}
				show={this.props.showModal}
				toggleModal={this.props.toggleModal}
				reports={this.props.reportsModal}
			/>
		</Fragment>
    );
  }
}
