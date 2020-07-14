"use strict";

import React from 'react';
import { Modal, Button, Fragment } from 'react-bootstrap';

import { ReportModalItem } from './ReportModalItem';
import { BanUserConfirm } from './BanUserConfirm';

import { Link } from 'react-router-dom';

const modalStyle = {
	
};

export class ReportActivityModal extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			
		}
		
		this.closeModal = this.closeModal.bind(this);
	}
	
	closeModal(){
		this.props.toggleModal(false)
	}

	render() {
		let {modalReported, show, toggleModal, reports } = this.props
		
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
			
			</Modal.Body>
			<Modal.Footer>
			  <Button variant="secondary" onClick={this.closeModal}>
				Close
			  </Button>
			  <Link	to={`/detail/${modalReported.id}`}>
				<Button variant="primary" >
					Go to activity detail page
				</Button>
			  </Link>
			</Modal.Footer>
		   </Modal>
    }
};
