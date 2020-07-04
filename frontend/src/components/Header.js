import React from 'react';
import logo from '../media/f2uLogo.svg';
import {Link} from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Image, Form, FormControl, Button } from 'react-bootstrap';
import { MenuButton } from 'react-md';
import {Jumbotron} from './Jumbotron';
import styled from 'styled-components';

export class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Styles = styled.div`
            .nav {
                background-color: #353a3f;
                font-size: 16px;
                width: 100%;
            }
            
            .nav-item {
                margin: 3px;
                padding: 3px;
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

        return (
            <React.Fragment>
                <Navbar expand bg="dark" variant="dark" >
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="100"
                            height="50"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Item>
                                <Nav.Link href="/search">Search</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/create">Create</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/activityhistory">My Activity History</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Nav>
                            <Nav.Item class="ml-auto">
                                <NavDropdown title="My Account" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#/report_user">Report user</NavDropdown.Item>
                                    <NavDropdown.Item href="#/report_activity">Report activity</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#/report">Test</NavDropdown.Item>
                                </NavDropdown>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </React.Fragment>
        )
    }
}
