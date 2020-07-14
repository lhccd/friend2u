"use strict";

import React from 'react';
import { Link } from 'react-router-dom'
import { FaFlag } from "react-icons/fa";
import { Button, ButtonGroup, Card , Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import AuthService from '../services/AuthService'

import { ServerError } from './ServerError';


const style = { maxWidth: 500 };

export class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			
        }
		
    }


    render() {
		let user = this.props.user
		if(!user) {
			console.log('user is undefined')
			return <ServerError />
		}
		let { username, name, surname, age, gender, bio, profilePicture} = user
		let wholeName = `${name} ${surname}`
		
        return (
			<Card>
				<Card.Header className="display-3">
					<div class="row">
						<div class="col-sm-" style={{"margin-left": "15px"}}>
							{username}
						</div>
						<div class="col-sm-3">
							{!this.props.editable?<OverlayTrigger placement='right' overlay={<Tooltip>Report this user</Tooltip>}>
													<Button style={{color: 'grey'}} variant="link" onClick={() => {}}>
														<FaFlag size={30}/>
													</Button>
												</OverlayTrigger>:null}	
						</div>
					</div>
				</Card.Header>
				<Card.Body>
					<div class="row">
						<div class="col-sm-3">
							<div class="row">
								<div class="col-sm-12 d-flex align-items-center">
									<img src={profilePicture} style={{"margin": "10px", height: '300px',width: '400px',}}/>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12 d-flex align-items-center">
									<p> like and dislikes from other people</p>
								</div>
							</div>
						</div>
						<div class="col-sm-7" style={{minHeight: '500px'}}>
							<Form.Group as={Row} >
								<Form.Label column sm="2">
									Name:
								</Form.Label>
								<Col sm="10">
								  <Form.Control plaintext readOnly defaultValue={wholeName} />
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
								  <Form.Control as="textarea" style={{resize: 'none'}} plaintext readOnly defaultValue={bio} />
								</Col>
							</Form.Group>
							
							{this.props.editable?<Form.Group as={Row}>
									<ButtonGroup className="mr-2">
										<Link to={'/editProfile'}>
											<Button >
												Edit yout profile
											</Button>
										</Link>
									</ButtonGroup>
								</Form.Group>:null}

						</div>
					</div>
				</Card.Body>
				<Card.Footer>
					<small className="text-muted">Friend2U loves U</small>
				</Card.Footer>
			</Card>
        );
    }
}
