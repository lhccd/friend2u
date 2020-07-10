"use strict";

import React from 'react';
import { Fragment } from 'react';
import { InputGroup, Button, Text, Form, Row, Col } from 'react-bootstrap';


const dataTableStyle = {
  'margin': '10px'
};


export class BanUserConfirm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			nDays: 14,
			reason: '',
			banOk: false,
		}
		
		console.log(props.username)
		
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeNDays = this.handleChangeNDays.bind(this);
		this.isNDaysOk = this.isNDaysOk.bind(this);
	}
	
	handleChange(event) {
		let fieldName = event.target.name;
		let fieldVal = event.target.value;
        this.setState(Object.assign({}, this.state, {[fieldName]: fieldVal}));
    }

    handleChangeName(event) {
		let value = event.target.value;
        if(value === this.props.username) this.setState({banOk: true})
    }
    
    handleChangeNDays(event) {
		let value = parseInt(event.target.value);
        this.setState(Object.assign({}, this.state, {nDays: value}));
        console.log(this.isNDaysOk())
    }

    handleSubmit(event) {
        event.preventDefault();
		
        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.onSubmit(user);
    }
    
    isNDaysOk(){
		let nd = this.state.nDays
		return typeof nd === 'number' && nd > 0 && Number.isInteger(nd)
	}
	
	render() {
		
		return <div style={{paddingTop: '20px'}}>

				  <Form.Row>
					<Form.Group as={Col} sm={4} >
					  <Form.Label>Insert the number of day you want to ban this user for </Form.Label>
					  <Form.Control
							type='number'
							value={this.state.nDays}
							onChange={this.handleChangeNDays}
							placeholder="Number of days"
					  />
					</Form.Group>

					<Form.Group as={Col} sm={3} >
					  <Form.Label>Repeat name of user</Form.Label>
					  <Form.Control
							type="text"
							required={true}
							onChange={this.handleChangeName}
						/>
					</Form.Group>


				  </Form.Row>
				  <Form.Row>
					<Form.Group>
					  <Button onClick={this.handleSubmit} onClick={() => {console.log(this.state.nDays * 3600*24*1000);this.props.banUser(this.state.nDays * 3600*24*1000)}} disabled={!(this.isNDaysOk() && this.state.banOk)}>Confirm</Button>
					</Form.Group>
				  </Form.Row>

				  </div>
	}
};


/*
 * 	<					
					<Form.Group as={Col} sm={3} >
					  <Form.Label>Insert reason of your ban</Form.Label>
					  <Form.Control required={true} as="textarea" />
					</Form.Group>
					
	* */
