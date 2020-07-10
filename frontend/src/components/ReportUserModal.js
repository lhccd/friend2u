"use strict";

import React from 'react';
import { Modal, Button, Fragment } from 'react-bootstrap';

import { ReportModalItem } from './ReportModalItem';
import { BanUserConfirm } from './BanUserConfirm';

import { Link } from 'react-router-dom';

const modalStyle = {
	
};

export class ReportUserModal extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			confirmBanning: false,
		}
		
		this.renderBanningConfirm = this.renderBanningConfirm.bind(this);
		this.confirmBanningUser = this.confirmBanningUser.bind(this);
		this.banUserConfirm = this.banUserConfirm.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	
	confirmBanningUser() {
		this.setState({confirmBanning: true})
	}
	
	closeModal(){
		this.props.toggleModal(false)
		this.setState({confirmBanning: false})
	}
	
	banUserConfirm(time){
		let { modalReported } = this.props
		this.props.banUser(modalReported.id, time, modalReported.idx)
		this.props.toggleModal(false)
		this.setState({confirmBanning: false})
	}
	
	renderBanningConfirm(username){
		return (<div>
					<hr />
					<BanUserConfirm
						username={username}
						banUser={this.banUserConfirm}
					 />
				</div>)
		//return (<div>Are you sure to ban this user FOREVAH? <Button variant="primary" onClick={() => {banUser(modalReported.id,modalReported,0,modalReported.idx);this.closeModal();}}>Dont ask me that again plz</Button></div>)
	}
	
	render() {
		let {modalReported, show, toggleModal, reports, banUser} = this.props
		
		 return <Modal show={show} size='xl' onHide={this.closeModal} style={modalStyle}>
			<Modal.Header closeButton>
			  <Modal.Title>{modalReported.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{reports.map((r) => <ReportModalItem
										key={`reportdescription-${r.issuer}`}
										id={r._id}
										reason={r.reason}
										description={r.description}
									/>)}
			
				
				{this.state.confirmBanning?this.renderBanningConfirm(modalReported.name):null}
			</Modal.Body>
			<Modal.Footer>
			  <Button variant="secondary" onClick={this.closeModal}>
				Close
			  </Button>
			  <Link	to='/'>
				<Button variant="primary" onClick={() => this.viewMore()}>
					Go to user profile
				</Button>
			  </Link>
			  <Button variant="primary" onClick={this.confirmBanningUser}>
										Ban this user FOREVAH!
									  </Button>
									  
			</Modal.Footer>
		   </Modal>
    }
};
