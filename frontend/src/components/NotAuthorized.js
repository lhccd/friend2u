"use strict";

import React from 'react';

import AuthService from '../services/AuthService';

import { Card, Button } from 'react-bootstrap';
import { FaHandPaper } from "react-icons/fa";

import { Link } from 'react-router-dom';


const style={
	top: '50px',
	margin: 'auto',
	width: '70%',
	height: '60vh',
	minHeight: '600px',
	borderRadius: '20px',
	marginTop: '10px',
}

export class NotAuthorized extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		
	}
	
	renderMessage() {
		return 'You are not allowed to access this content.'
	}

	render(){
		return(
			<Card style={style}>
			<Card.Header className="display-3">
				ALT!
			</Card.Header>
			<Card.Body>
			   <div class="row h-100 container-fluid">
				<div class="col-ms-10 col-sm-4 d-flex align-items-center">
					<FaHandPaper color={'#85241d'} size={300} style={{"margin": "auto"}}/>
				</div>
				<div class="col-ms-10 col-sm-8 d-flex align-items-center">
					<Card.Text className="h1">
						<div>{this.renderMessage()}</div>
						<div>
							<Link to='/'>
								<Button>Go to the Homepage</Button>
							</Link>
						</div>
					</Card.Text>
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
