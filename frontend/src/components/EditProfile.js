"use strict";

import React from 'react';
import { Link } from 'react-router-dom'
import { FaFlag, FaImage } from "react-icons/fa";
import { Button, ButtonGroup, Card , Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import UserService from '../services/AuthService'
import ActivityService from '../services/ActivityService'

import { ServerError } from './ServerError';

import { ChangePasswordModal } from './ChangePasswordModal';

//import UserService from '../services/UserService';

//const style = { maxWidth: 500 };

export class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        
        var user = this.props.user
        console.log(user)
        if(!user){
			this.state = {
				serverError: true,
			}
		}
        else{
			this.state = {
				id: user._id,
				name: user.name,
				surname: user.surname,
				bio: user.bio,
				age: user.age,
				gender: user.gender,
				username: user.username,
				profilePicture: user.profilePicture,
				serverError: false,
				imagePreviewUrl: null,
				file: null,
                changingPassword: false,
			}
		}
		        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removePicture = this.removePicture.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.areParametersNotOk = this.areParametersNotOk.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

	
    }
    
    toggleModal(changingPassword) {
		this.setState({changingPassword: changingPassword})
	}

	removePicture(){
		this.setState({file: null, imagePreviewUrl: null})
	}
	
	uploadImage(){
		this.props.uploadImage(this.state.file)
	}
	
	handleChangeFile(e){
		e.preventDefault(); 
		let reader = new FileReader();
	    let file = e.target.files[0];

	    reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result
			});
		}

		reader.readAsDataURL(file)
	}
    
    handleSubmit(event) {
        event.preventDefault();
		
        let user = {
            name: this.state.name,
            surname: this.state.surname,
            bio: this.state.bio,
        };
	
        this.props.onSubmit(user);
    }
    
    handleChange(event) {
		let fieldName = event.target.name;
		let fieldVal = event.target.value;
		console.log(fieldVal)
        this.setState({[fieldName]: fieldVal});
    }
    
	areParametersNotOk(){
		return ['name','surname','bio'].some((prop) => {
				return this.state[prop] === undefined || this.state[prop] === '';
		});
	}


    render() {
		let { username, name, surname, age, gender, bio, id, profilePicture, file, imagePreviewUrl, changingPassword} = this.state
		let wholeName = `${name} ${surname}`
		
        console.log(profilePicture)
        
        return (
			<Card style={{border: 'none', height: '100%'}}>
				<Card.Header className="display-3">
					<div class="row">
						<div class="col-sm-" style={{"margin-left": "15px"}}>
							{username}
						</div>
					</div>
				</Card.Header>
				<Card.Body>
					<Form onSubmit={this.handleSubmit}>
					<div class="row">
						<div class="col-sm-3">
							<div class="row">
								<div class="row">
									<div class="col-sm-12 d-flex align-items-center">
										<img src={imagePreviewUrl?imagePreviewUrl:profilePicture}  style={{"margin-left": "10px", height: '300px',width: '400px',}}/>
									</div>
								</div>
								<div class="row" style={{width: '100%', paddingTop: '10px' }}>
									<Form.File style={{margin: 'auto'}} id="formcheck-api-regular">
									  <Form.File.Input
										onChange={this.handleChangeFile}
									  />
									</Form.File>
								</div>
								{file && imagePreviewUrl?<div class="row" style={{width: '100%', paddingTop: '10px', marginLeft: '15px' }}>
													<ButtonGroup className="mr-2">
														<Button variant="primary" onClick={this.uploadImage}>
															Update new profile image
														</Button>
													</ButtonGroup>
													<ButtonGroup className="mr-2">
														<Button variant="secondary" onClick={this.removePicture} >
															Cancel
														</Button>
													</ButtonGroup>
												 </div>:null}
								
								
							</div>
							<div class="row">
								<div class="col-sm-12 d-flex align-items-center">
									
								</div>
							</div>
						</div>
						<div class="col-sm-7" style={{minHeight: '500px'}}>
							<Form.Group as={Row} >
								<Form.Label column sm="2">
									Name:
								</Form.Label>
								<Col sm="10">
								  <Form.Control
									required
									name="name"
									defaultValue={name}
									onChange={this.handleChange}
								  />
								</Col>
							</Form.Group>
							
							<Form.Group as={Row} >
								<Form.Label column sm="2">
									Surname:
								</Form.Label>
								<Col sm="10">
								  <Form.Control
									required
									name="surname"
									defaultValue={surname}
									onChange={this.handleChange}
								  />
								</Col>
							</Form.Group>
							
							<Form.Group as={Row} >
								<Form.Label column sm="2">
									Age:
								</Form.Label>
								<Col sm="10">
								  <Form.Control plaintext readOnly defaultValue={age} />
								</Col>
							</Form.Group>
							
							<Form.Group as={Row} >
								<Form.Label column sm="2">
									Gender:
								</Form.Label>
								<Col sm="10">
								  <Form.Control plaintext readOnly defaultValue={gender} />
								</Col>
							</Form.Group>
							
							<Form.Group as={Row}>
								<Form.Label column sm="2">
									About me:
								</Form.Label>
								<Col sm="10">
								  <Form.Control
									as="textarea"
									style={{resize: 'none'}}
									required
									name="bio"
									defaultValue={bio}
									onChange={this.handleChange}
								  />
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<ButtonGroup className="mr-2">
									<Button variant="primary" type="submit" disabled={this.areParametersNotOk()? true : false}>
										Update profile
									</Button>
								</ButtonGroup>
								<ButtonGroup className="mr-2">
									<Link to={`/profile/${id}`}>
										<Button variant="secondary" >
											Go back to your profile
										</Button>
									</Link>
								</ButtonGroup>
								<ButtonGroup className="mr-2">
									<Button onClick={() => this.toggleModal(true)} variant="warning" >
										Change password
									</Button>
								</ButtonGroup>
							</Form.Group>

						</div>
					</div>
					</Form>
				</Card.Body>
				<ChangePasswordModal
					show={changingPassword}
					toggleModal={this.toggleModal}
					onSubmit={this.props.changePassword}
					error={this.props.passwordError}
					success={this.props.passwordSuccess}
				/>
			</Card>
        );
    }
}
