"use strict";

import React from 'react';

import AuthService from '../services/AuthService';

import { Card, Button } from 'react-bootstrap';
import { FaDizzy } from "react-icons/fa";

const style={
	top: '20px',
	margin: 'auto',
	width: '70%',
	height: '80vh',
	minHeight: '600px',
	borderRadius: '20px', 
}

export class ServerError extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		
	}
	
	renderMessage() {
		return 'There seems to be a problem with the server'
	}
	
  render(){
    return(
        <Card style={style}>
        <Card.Header className="display-3">
			Something went wrong
        </Card.Header>
		<Card.Body>
           <div className="row h-100 container-fluid">
            <div className="col-ms-10 col-sm-4 d-flex align-items-center">
                <FaDizzy color={'#660a1a'} size={300} style={{"margin": "auto"}}/>
            </div>
            <div className="col-ms-10 col-sm-8 d-flex align-items-center">
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
