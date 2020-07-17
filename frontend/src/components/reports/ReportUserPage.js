import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Row, Col, Button, InputGroup, FormControl, Card, Container} from 'react-bootstrap';

import { AlertMessage } from '../AlertMessage';
import { SuccessMessage } from '../SuccessMessage';
import styled from 'styled-components'

const style={
	margin: 'auto',
	width: '80%',
	height: 'auto',
	//maxWidth: '1000px',
	borderRadius: '20px',
	fontSize: '22px',
	marginTop: '25px',
}


export class ReportUserPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
		}
		
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
    }
    
    handleSubmit() {
        event.preventDefault();
        
        let reason = this.state.reason
        let description = this.state.description
        
        if(reason && description) this.props.onSubmit(reason, description);
	}
	
    handleChange(event) {
		let fieldName = event.target.name;
		let fieldVal = event.target.value;
        this.setState({[fieldName]: fieldVal});
    }

    render() {
		
        return (
             <Card style={style}>
				<Card.Header as="h1">The user {this.props.username} ...</Card.Header>
				<Card.Body style={{padding: '20 30'}}>
				  <Form className="text-left" onSubmit={this.handleSubmit}>
				  
					<Form.Row>
						<Form.Group as={Col}>
						    <Form.Group onChange={this.handleChange}>
								<Form.Check required inline name="reason" value='untrustworthy' label='seems untrustworthy' type='radio' /> 
							</Form.Group>
						</Form.Group>
						
						<Form.Group as={Col}>
						    <Form.Group onChange={this.handleChange}>
								<Form.Check inline name="reason" value='fraudulent' label='is fraudulent' type='radio' /> 
							</Form.Group>
						</Form.Group>
					</Form.Row>
					
					<Form.Row>
						<Form.Group as={Col}>
						    <Form.Group onChange={this.handleChange}>
								<Form.Check inline name="reason" value='advertisement' label='is used as advertisement' type='radio' /> 
							</Form.Group>
						</Form.Group>
						
						<Form.Group as={Col}>
						    <Form.Group onChange={this.handleChange}>
								<Form.Check inline name="reason" value='unavailable' label='is not available anymore' type='radio' /> 
							</Form.Group>
						</Form.Group>
					</Form.Row>
					
					<Form.Row>
						<Form.Group as={Col}>
						    <Form.Group onChange={this.handleChange}>
								<Form.Check inline name="reason" value='spam' label='is spam' type='radio' /> 
							</Form.Group>
						</Form.Group>
						
						<Form.Group as={Col}>
						    <Form.Group onChange={this.handleChange}>
								<Form.Check inline name="reason" value='sexual' label='consists of sexual content' type='radio' /> 
							</Form.Group>
						</Form.Group>
					</Form.Row>

					
					<Form.Row>
						<FormControl required onChange={this.handleChange} style={{height: '300px'}} name="description" as="textarea" aria-label="With textarea" placeholder="Please write a description to your report..."/>
					</Form.Row>
					
					
					
					<Form.Row as={Row}>
						<Form.Group as={Col} style={{ margin: 'auto', marginTop: '20px', fontSize: '18px' }}>
							<Button variant="primary" type="submit">
								Submit
							</Button>
							<Link to={`/profile/${this.props.id}`} className="md-cell">Back to user profile</Link>
						</Form.Group>
					</Form.Row>
				    
                    <AlertMessage>{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    <SuccessMessage>{this.props.success ? `${this.props.success}` : ''}</SuccessMessage>
			      </Form>
				</Card.Body>
			</Card>
        );
    }
}
