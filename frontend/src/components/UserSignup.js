"use strict";

import React from 'react';
import { Form, Button, Card, Col } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';

import { AlertMessage } from './AlertMessage';
import Page from './Page';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isPossiblePhoneNumber } from 'react-phone-number-input'


const style={
	top: '80px',
	margin: 'auto',
	width: '70%',
	height: 'auto',
	maxWidth: '800px',
	borderRadius: '20px', 
}

class UserSignup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordRepeat: '',
            email: '',
            name: '',
            surname: '',
            birthday: '',
            gender: '',
            mobile: '',
            isOver18: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeMobile = this.handleChangeMobile.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    getAge(birthday) {
		var today = new Date();
		var age = today.getFullYear() - birthday.getFullYear();
		var m = today.getMonth() - birthday.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
			age--;
		}
		return age;
	}

    handleChange(event) {
		let fieldName = event.target.name;
		let fieldVal = event.target.value;
        this.setState({[fieldName]: fieldVal});
    }
    
    handleChangeDate(date) {
        this.setState(Object.assign({}, this.state, {birthday: date, isOver18: this.getAge(date) >= 18}));
    }
    
     
    handleChangeMobile(mobile) {
		this.setState({mobile: mobile})
    }
    
    handleChangePasswordMatch(event) {
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
            name: this.state.name,
            surname: this.state.surname,
            gender: this.state.gender,
            mobile: this.state.mobile,
        };
        
        console.log(user)

        this.props.onSubmit(user);
    }
    
    areParametersNotOk(){
		return this.state.passwordRepeat !== this.state.password ||
			   
			   !this.state.isOver18 ||
			   
			   ['username','email','password','passwordRepeat','name','surname','gender','birthday','mobile'].some((prop) => {
						return this.state[prop] === undefined || this.state[prop] === '';
					});
	}

    render() {
		let passwordMatch = this.state.passwordRepeat === this.state.password;
		let { isOver18 } = this.state;
		//<Page const style={{width: '100%',height: '100%',padding: 100}}>
        return (

            <Card style={style}>
				<Card.Header as="h5">Sign up</Card.Header>
				<Card.Body>
				  <Form className="text-left" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
				  	
				  	{/* Username */}
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								name="username"
								placeholder="Enter username"
								errortext="Login is required"
								onChange={this.handleChange}
								className={this.props.duplicateKey === 'username' ? 'is-invalid' : ''}
							 />
						</Form.Group>
					</Form.Row>
				  
				    {/* Email */}
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								name="email"
								placeholder="Enter email"
								onChange={this.handleChange}
								className={this.props.duplicateKey === 'email' ? 'is-invalid' : ''}
							 />
						</Form.Group>
					</Form.Row>
				  
				    {/* Password */}
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								placeholder="Enter password"
								className={!passwordMatch ? 'is-invalid' : ''}
								onChange={this.handleChange}
							 />
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Repeat Password</Form.Label>
							<Form.Control
								type="password"
								name="passwordRepeat"
								placeholder="Repeat password"
								required={true}
								className={!passwordMatch ? 'is-invalid' : ''}
								onChange={this.handleChange}
							/>
						</Form.Group>
					</Form.Row>
				    
				    {/* Name and Surname */}
				    <Form.Row>
						<Form.Group as={Col}>
							  <Form.Label>First name</Form.Label>
							  <Form.Control
								placeholder="Enter first name"
								type="text"
								name="name"
								required={true}
								onChange={this.handleChange}
							  />
						</Form.Group>
						<Form.Group as={Col}>
							  <Form.Label>Surname</Form.Label>
							  <Form.Control
								placeholder="Enter surname"
								type="text"
								name="surname"
								required={true}
								onChange={this.handleChange}
							  />
						</Form.Group>
					</Form.Row>
					
					{/* Birthday Gender Mobile */}
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Birthday</Form.Label>
						    <Form.Group>
								<DatePicker
									selected={this.state.birthday}
									onChange={this.handleChangeDate}
								/>
								<AlertMessage>{!isOver18 ? 'You must be over 18 to sign up!' : ''}</AlertMessage>
							</Form.Group>
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Gender</Form.Label>
						    <Form.Group onChange={this.handleChange}>
								{['male','female','other'].map((t) => <Form.Check inline key={`gender-${t}`} name="gender" value={t} label={t} type='radio' /> )}
								<Form.Check inline  name="gender" value='notDeclared' label='I prefer not to declare it' type='radio' />
							</Form.Group>
						</Form.Group>
						
						<Form.Group as={Col}>
						  <Form.Label>Mobile</Form.Label>
							<PhoneInput
								defaultCountry="DE"
								onChange={this.handleChangeMobile}
							/>
						</Form.Group>
					</Form.Row>
					
					
					
				    <Button variant="primary" type="submit"
							disabled={this.areParametersNotOk()? true : false}>
				    	Submit
			  	    </Button>
				    <Link to={'/login'} className="md-cell">Back to login</Link>
                    <AlertMessage>{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
			      </Form>
				</Card.Body>
			</Card>
        );
    }
};

export default withRouter(UserSignup);
