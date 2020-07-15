import React from 'react';
import logo from '../media/f2uLogo.svg';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


import {Nav, Navbar, NavDropdown, Image, Form, FormControl, Button} from 'react-bootstrap';
import {MenuButton} from 'react-md';
import {Jumbotron} from './Jumbotron';
import styled from 'styled-components';

import AuthService from '../services/AuthService';

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    
    renderMyAccountLinks(role) {
		const user = AuthService.getCurrentUser()
		return (
				<NavDropdown title={`${user.username}`} alignRight>
					<LinkContainer to={`profile/${user.id}`} >
						<NavDropdown.Item>My profile</NavDropdown.Item>
					</LinkContainer>
					{role === 'moderator' ?
						<LinkContainer to="moderator">
							<NavDropdown.Item href="#/moderator">Moderator console</NavDropdown.Item>
						</LinkContainer> : null}
					<NavDropdown.Divider/>
					
					<NavDropdown.Item onClick={AuthService.logout}>Logout</NavDropdown.Item>
					
				</NavDropdown>
		)
	}

    render() {
        const Styles = styled.div`
            .nav {
                background-color: #353a3f;
                font-size: 16px;
                width: 100%;
            }
            
            .nav-item {
                margin: auto;
                padding: auto;
            }
            
            .nav-item .navdropdown {
                margin: 50px;
                padding: 50px; 
            }
            
            .nav-link {
                color: #fff;
                
                &:hover {
                    color: #f6b6a4;
                    border: 1px #ccc solid;
                } 
            }
           
        `;

        let {role} = this.props;

        console.log("role: " + role)

        return (
            <React.Fragment>
                <Navbar className="bg-dark justify-content-between" variant="dark" style={{fontSize: "20px"}}>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="100"
                            height="50"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="#/activities/search">Search</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="#/activities/create">Create</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="#/activityhistory">My Activity History</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Item>
							{this.renderMyAccountLinks(role)}
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </React.Fragment>
        )
    }
}
