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
			forever: false
		}
		
		console.log(props.username)
		
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeNDays = this.handleChangeNDays.bind(this);
		this.isNDaysOk = this.isNDaysOk.bind(this);
		this.handleChangeForever = this.handleChangeForever.bind(this);
		this.disableSubmit = this.disableSubmit.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
		let fieldName = event.target.name;
		let fieldVal = event.target.value;
        this.setState(Object.assign({}, this.state, {[fieldName]: fieldVal}));
    }
    
    handleChangeForever(event) {
		this.setState({forever: event.target.checked})
	}

    handleChangeName(event) {
		let value = event.target.value;
        if(value === this.props.username) this.setState({banOk: true})
        else this.setState({banOk: false})
    }
    
    handleChangeNDays(event) {
		let value = event.target.value;
        this.setState(Object.assign({}, this.state, {nDays: value}));
        console.log(value)
    }

    handleSubmit(event) {
        event.preventDefault();
        
        console.log(this.state.forever)
		
		if(this.state.forever){
			this.props.banUser(-1)
		}
		else{
			this.props.banUser(this.state.nDays * 3600*24*1000)
		}
	}
    
    isNDaysOk(){
		let nd = this.state.nDays
		console.log(!isNaN(nd))
		console.log(nd)
		return nd !== '' && nd !== undefined && Number.isInteger(+nd) && +nd > 0
	}
	
	disableSubmit() {
		return !(this.state.banOk && (this.state.forever || this.isNDaysOk()))
	}
	
	render() {
		
		return <div style={{paddingTop: '20px'}}>

				  <Form.Row style={{fontSize: '15px'}}>
					<Form.Group as={Col} sm={4} >
					  <Form.Label>Insert the number of day you want to ban this user for: </Form.Label>
					  <Form.Control
							type='number'
							value={this.state.nDays}
							onChange={this.handleChangeNDays}
							placeholder="Number of days"
							disabled={this.state.forever}
					  />
						<Form.Check
							type="checkbox"
							label="Ban forever"
							onChange={this.handleChangeForever}
							style={{paddingTop: '10px'}} />
					</Form.Group>

					<Form.Group as={Col} sm={3} >
					  <Form.Label>Repeat name of user:</Form.Label>
					  <Form.Control
							type="text"
							onChange={this.handleChangeName}
						/>
					</Form.Group>


				  </Form.Row>
				  <Form.Row>
					<Form.Group>
					  <Button onClick={this.handleSubmit} onClick={this.handleSubmit} disabled={this.disableSubmit()}>Confirm</Button>
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
