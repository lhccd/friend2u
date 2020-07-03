"use strict";

import React from 'react';
import { Form, Button, Card, Col } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

import { AlertMessage } from './AlertMessage';
import Page from './Page';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const style = { maxWidth: 800, margin: 'auto' };


class UserSignup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordRepeat: '',
            birthday: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
		let fieldName = event.target.name;
		let fieldVal = event.target.value;
		console.log(fieldVal)
        this.setState({[fieldName]: fieldVal});
    }
    
    handleChangeDate(date) {
        this.setState(Object.assign({}, this.state, {birthday: date}));
    }
    
    handleChangePasswordMatch(event) {
		console.log(this.state.passwordRepeat)
		console.log(this.state.password)
		
		if(this.state.passwordRepeat === this.state.password){
			this.setState({passwordMatch: true})
		}
		else{
			this.setState({passwordMatch: false})
		}
    }
    
    handleSubmit(event) {
        event.preventDefault();

        let user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            birthday: this.state.birthday,
            name: "test",
            surname: "test",
            gender: "male",
            mobile: "+123456789",
        };

        this.props.onSubmit(user);
    }
    
    handleCheckParameters(){
		return this.state.username == undefined || 
			   this.state.username == '' ||
			   
			   this.state.password == undefined ||
			   this.state.password == '' ||
			   
			   this.state.birthday == undefined ||
			   this.state.birthday == '';
		
	}

    render() {
		let passwordMatch = this.state.passwordRepeat === this.state.password
		
        return (
            <Page const style={{width: '100%',height: '100%',padding: 100}}>
            <Card style={style}>
				<Card.Header as="h5">Sign up</Card.Header>
				<Card.Body>
				  <Form className="text-left" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
				  				  
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								name="username"
								placeholder="Enter username"
								//value={this.state.username}
								onChange={this.handleChange}
								errortext="Login is required"
							 />
						</Form.Group>
					</Form.Row>
				  
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								name="email"
								placeholder="Enter email"
								onChange={this.handleChange}
								errortext="Login is required"
							 />
						</Form.Group>
					</Form.Row>
				  
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								placeholder="Enter password"
								//value={this.state.username}
								onChange={this.handleChange}
								errortext="Login is required"
								className={!passwordMatch ? 'is-invalid' : ''}
							 />
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Repeat Password</Form.Label>
							<Form.Control
								type="password"
								name="passwordRepeat"
								placeholder="Repeat password"
								id="PasswordField"
								type="password"
								required={true}
								onChange={this.handleChange}
								errortext="Password is required"
							/>
						</Form.Group>
						
						<AlertMessage>{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
					</Form.Row>
				    
				    <Form.Group>
						<Form.Row>
							<Col>
							  <Form.Label>First name</Form.Label>
							  <Form.Control placeholder="Enter first name" />
							</Col>
							<Col>
							  <Form.Label>Last Name</Form.Label>
							  <Form.Control placeholder="Enter Last name" />
							</Col>
						</Form.Row>
					</Form.Group>
					
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Birthday</Form.Label>
						    <DatePicker
								selected={this.state.birthday}
								onChange={this.handleChangeDate}
							/>
						</Form.Group>
					</Form.Row>
					
				    <Button variant="primary" type="submit"
							disabled={this.handleCheckParameters() || !passwordMatch ? true : false}>
				    	Submit
			  	    </Button>
				    <Link to={'/login'} className="md-cell">Back to login</Link>
                    <AlertMessage>{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
			      </Form>
				</Card.Body>
			</Card>
            </Page>
        );
    }
};

export default withRouter(UserSignup);
