"use strict";

import React from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { AlertMessage } from './AlertMessage';
import { SuccessMessage } from './SuccessMessage';



export class ChangePasswordModal extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			oldPassword: '',
			newPassword: '',
            passwordRepeat: '',
            
		}
		
		this.closeModal = this.closeModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.areParametersNotOk = this.areParametersNotOk.bind(this);
	}
	
	closeModal(){
		this.props.toggleModal(false)
	}
	
	handleChange(event) {
		let fieldName = event.target.name;
		let fieldVal = event.target.value;
        this.setState({[fieldName]: fieldVal});
    }
	
	handleSubmit(event) {
        event.preventDefault();
        
        let oldPassword = this.state.oldPassword,
            newPassword = this.state.newPassword;

        this.props.onSubmit(oldPassword,newPassword);
    }
	
	areParametersNotOk(){
		return this.state.passwordRepeat !== this.state.newPassword ||
			   
			   ['oldPassword','newPassword','passwordRepeat'].some((prop) => {
						return this.state[prop] === undefined || this.state[prop] === '';
					});
	}

	render() {
		let { show } = this.props
		let passwordMatch = this.state.passwordRepeat === this.state.newPassword;
		
		 return <Modal show={show} size='xl' onHide={this.closeModal} >
			<Modal.Header closeButton>
			  <Modal.Title>Change password</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<Form className="text-left" onSubmit={this.handleSubmit}>
				
				{/* Old password */}
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Insert old password</Form.Label>
						<Form.Control
							type="text"
							name="oldPassword"
							placeholder="Insert old password"
							onChange={this.handleChange}
						 />
					</Form.Group>
				</Form.Row>
			  
				{/* New password */}
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Insert new password</Form.Label>
						<Form.Control
							type="password"
							name="newPassword"
							placeholder="Enter new password"
							className={!passwordMatch ? 'is-invalid' : ''}
							onChange={this.handleChange}
						 />
					</Form.Group>
				</Form.Row>
			  
				{/* Repeat password */}
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Repeat password</Form.Label>
						<Form.Control
							type="password"
							name="passwordRepeat"
							placeholder="Repeat new password"
							className={!passwordMatch ? 'is-invalid' : ''}
							onChange={this.handleChange}
						 />
					</Form.Group>
				</Form.Row>
					
				<Button variant="primary" type="submit" disabled={this.areParametersNotOk()? true : false}>
					Change Password
				</Button>
				<AlertMessage>{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
				<SuccessMessage>{this.props.passwordSuccess	? `${this.props.success}` : ''}</SuccessMessage>
			  </Form>
			
			</Modal.Body>
			<Modal.Footer>
			  <Button variant="secondary" onClick={this.closeModal}>
				Close
			  </Button>
			</Modal.Footer>
		   </Modal>
    }
};
