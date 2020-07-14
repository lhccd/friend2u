"use strict";

import React from 'react';

import AuthService from '../services/AuthService';

import { Card, Button } from 'react-bootstrap';
import { FaAngry } from "react-icons/fa";


function timeConverter(ts){
  var a = new Date(ts);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

const style={
	top: '50px',
	margin: 'auto',
	width: '70%',
	height: '60vh',
	minHeight: '600px',
	borderRadius: '20px', 
}

export class Banned extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		
	}
	
	renderMessage(ts) {
		if(ts === -1) {
			return 'Your account has been permanently banned'
		}
		return `Unfortunately we had to suspend your account until ${timeConverter(ts)}`
	}
	
  render(){
    return(
        <Card style={style}>
        <Card.Header className="display-3">
			User Banned
        </Card.Header>
		<Card.Body>
           <div class="row h-100 container-fluid">
            <div class="col-ms-10 col-sm-4 d-flex align-items-center">
                <FaAngry color={'#85241d'} size={300} style={{"margin": "auto"}}/>
            </div>
            <div class="col-ms-10 col-sm-8 d-flex align-items-center">
                <Card.Text className="h1">
					<div>{this.renderMessage(this.props.date)}</div>
                    <div><Button onClick={() => {AuthService.logout();window.location = "/#login"}} >Logout</Button></div>
                </Card.Text>
            </div>
        </div>
        </Card.Body>
        <Card.Footer>
            <small className="text-muted">Friend2U doesn{'\''}t love U {this.props.date !== -1?'(for now)':''}</small>
        </Card.Footer>
        </Card>
    );
  }
}
