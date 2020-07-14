"use strict";

import React from 'react';

import AuthService from '../services/AuthService';

import { Card, Button } from 'react-bootstrap';
import { FaSurprise } from "react-icons/fa";



const style={
	top: '20px',
	margin: 'auto',
	width: '70%',
	height: '80vh',
	minHeight: '600px',
	borderRadius: '20px', 
}

export class NotFound extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		
	}
	
	renderMessage() {
		return 'Apparently the page you were looking for doesn\'t exist'
	}
	
  render(){
    return(
        <Card style={style}>
        <Card.Header className="display-3">
			Page not found
        </Card.Header>
		<Card.Body>
           <div class="row h-100 container-fluid">
            <div class="col-ms-10 col-sm-4 d-flex align-items-center">
                <FaSurprise color={'#c9be3a'} size={300} style={{"margin": "auto"}}/>
            </div>
            <div class="col-ms-10 col-sm-8 d-flex align-items-center">
                <Card.Text className="h1">
					<div>{this.renderMessage(this.props.date)}</div>
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
