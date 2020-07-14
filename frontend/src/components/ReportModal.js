"use strict";

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { ReportModalItem } from './ReportModalItem';
import { BanUserConfirm } from './BanUserConfirm';

import { Link } from 'react-router-dom';

const dataTableStyle = {
  'marginBottom': '36px'
};

export class ReportModal extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			confirmBanning: false,
		}
		
		this.renderBanningConfirm = this.renderBanningConfirm.bind(this);
		this.confirmBanningUser = this.confirmBanningUser.bind(this);
	}
	
	confirmBanningUser() {
		this.setState({confirmBanning: true})
	}
	
	renderBanningConfirm(showingUser,banUser){
		return (<BanUserConfirm />)
		//return (<div>Are you sure to ban this user FOREVAH? <Button variant="primary" onClick={() => banUser(showingUser.id,0)}>Dont ask me that again plz</Button></div>)
	}
	
	render() {
		let {category, showingUser, show, toggleModal, reports, banUser} = this.props
		console.log('category: ' + category)
		
		 return <Modal show={show} onHide={() => toggleModal(false)}>
			<Modal.Header closeButton>
			  <Modal.Title>{showingUser.username}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{reports.map((r) => <ReportModalItem
										key={`reportdescription-${r.issuer}`}
										id={r._id}
										reason={r.reason}
										description={r.description}
									/>)}
				{this.state.confirmBanning?this.renderBanningConfirm(showingUser,banUser):''}
			</Modal.Body>
			<Modal.Footer>
			  <Button variant="secondary" onClick={() => toggleModal(false)}>
				Close
			  </Button>
			  <Link	to='/'>
				<Button variant="primary" onClick={() => this.viewMore()}>
					Go to {`${category}`}
				</Button>
			  </Link>
			  {category === 'user'?<Button variant="primary" onClick={this.confirmBanningUser}>
										Ban this user FOREVAH!
									  </Button>:''}
									  
			</Modal.Footer>
		   </Modal>
    }
};
