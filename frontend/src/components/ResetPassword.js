"use strict";

import React from 'react';
import { Form, Button, Card, Col } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

import { SuccessMessage } from './SuccessMessage';
import { AlertMessage } from './AlertMessage';
import Page from './Page';

const style={
	top: '80px',
	margin: 'auto',
	width: '70%',
	height: 'auto',
	maxWidth: '500px',
	borderRadius: '20px', 
}


export default class ResetPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            password : '',
        };

        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
		let fieldName = event.target.name;
		let fieldVal = event.target.value;
        this.setState(Object.assign({}, this.state, {[fieldName]: fieldVal}));
    }


    handleSubmit(event) {
        event.preventDefault();
		
        let password = this.state.password;
        this.props.onSubmit(password);
    }
    
    render() {

        return (
				<Card style={style} className="text-center">
					<Card.Header as="h5">Password Reset</Card.Header>
					<Card.Body>
					  <Form className="text-left" onSubmit={this.handleSubmit} >
					  
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>
									Enter the new password
								</Form.Label>
								<Form.Control
									type="password"
									name="password"
									placeholder="Enter your new password"
									onChange={this.handleChange}
									required={true}
								 />
							  </Form.Group>
						</Form.Row>
						
						<Button variant="primary" type="submit">
							Reset password
						</Button>
						<Link to={'/login'} className="md-cell">Go back to login</Link>
						<SuccessMessage>{this.props.success ? 'The password was correctly changed. Please login to user our services.' : ''}</SuccessMessage>
						<AlertMessage>{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
					  </Form>
					</Card.Body>
				</Card>
        );
    }
};


