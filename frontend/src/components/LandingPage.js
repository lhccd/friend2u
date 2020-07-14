"use strict";

import React from 'react';
import {Jumbotron} from "./Jumbotron";
import { FaFutbol, FaPizzaSlice, FaHammer, FaTv, FaTools} from "react-icons/fa";
import {
    Button,
    Card,
    Row,
    Col,
    Container,
    Dropdown,
    Navbar,
    Nav,
    Form,
    ListGroup,
    ListGroupItem,
    Image,
    NavDropdown, Jumbotron as Jumbo
} from 'react-bootstrap';
import LocationShower from './LocationShower';
import UserService from '../services/AuthService'
import thumbnail from '../media/activity_mock.jpg'
import logo from "../media/f2uLogo.svg";
import styled from "styled-components";
import jumbotronBg from "../media/jumbotronBg.jpg";

const Styles = styled.div`
    .jumbo {
        background: url(${jumbotronBg});
        background-size: cover;
        color: #efefef;
        text-align: center;
        height: 600px;
        position: center;
    }
    
    .overlay {
        background-color: #000;
        opacity: 0;
        position: absolute; 
        top: 0; 
        left: 0;
        bottom: 0; 
        right: 0; 
     } 
`;

export class LandingPage extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <React.Fragment>
                <Styles>
                <Navbar className="bg-dark justify-content-around" variant="dark" style={{fontSize: "20px"}}>
                    <Nav>
                        <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="400"
                            height="200"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                </Navbar>
                <Jumbo fluid className="jumbo">
                    <div className="overlay"></div>
                    <Container>
                        <h1>Welcome to Friend2U</h1>
                        <p>Friend2U is an activity-based innovative meeting platform!</p>
                    </Container>
                </Jumbo>
                </Styles>
            </React.Fragment>
        )
    }
}
