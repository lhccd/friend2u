"use strict";

import React from 'react';
import { Form, Button, Card, Col } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

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


class UserLogin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password : ''
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
		
        let user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.onSubmit(user);
    }
//<Page const style={{width: '100%',height: '100%',padding: 100}}></Page>
    render() {

        return (
				<Card style={style} className="text-center">
					<Card.Header as="h5">Login</Card.Header>
					<Card.Body>
					  <Form className="text-left" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>Username</Form.Label>
								<Form.Control
									type="text"
									name="username"
									placeholder="Enter username"
									//label="Login"
									//id="LoginField"
									//value={this.state.username}
									onChange={this.handleChange}
									errortext="Login is required"
								 />
							  </Form.Group>
						</Form.Row>

						<Form.Row>
						  <Form.Group as={Col}>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="Password"
								name="password"
								placeholder="Enter password"
								id="PasswordField"
								className="md-row"
								required={true}
								//value={this.state.password}
								onChange={this.handleChange}
								errortext="Password is required"
							/>
						  </Form.Group>
						</Form.Row>
						<Button variant="primary" type="submit"
								disabled={this.state.username == undefined || this.state.username == '' || this.state.password == undefined || this.state.password == '' ? true : false}>
							Submit
						</Button>
						<Link to={'/register'} className="md-cell">Not registered yet?</Link>
						<Link to={'/password/reset'} className="md-cell">Did you forget your password?</Link>
						<AlertMessage>{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
					  </Form>
					</Card.Body>
				</Card>
        );
    }
};

export default withRouter(UserLogin);
