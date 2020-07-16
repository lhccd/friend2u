"use strict";

import React from 'react';
import { Form, Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { SuccessMessage } from './SuccessMessage';
import Page from './Page';

const style={
	top: '80px',
	margin: 'auto',
	width: '70%',
	height: 'auto',
	maxWidth: '500px',
	borderRadius: '20px', 
}


export default class ResetPasswordAsk extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email : '',
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
		
        let email = this.state.email;
        this.props.onSubmit(email);
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
									Enter your email address. If it is associated to your account we will send an email with the instructions to reset your password</Form.Label>
								<Form.Control
									type="email"
									name="email"
									placeholder="Enter your email"
									onChange={this.handleChange}
									required={true}
								 />
							  </Form.Group>
						</Form.Row>
						
						<Button variant="primary" type="submit">
							Send email
						</Button>
						<Link to={'/login'} className="md-cell">Go back to login</Link>
						<SuccessMessage>{this.props.success ? 'We have sent you an email if the email you provided was correct.' : ''}</SuccessMessage>
					  </Form>
					</Card.Body>
				</Card>
        );
    }
};
