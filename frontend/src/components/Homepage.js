"use strict";

import React from 'react';
import {Container, Row, Col, Nav, NavDropdown, Image} from 'react-bootstrap';
import Page from './Page'
import Logo from '../media/f2uLogo.png'
import HikeLogo from '../views/HomepageViewMediaFiles/bordered-F2U_1.JPG';
import OtherLogo from '../views/HomepageViewMediaFiles/bordered-F2U_2.JPG';
import FoodLogo from '../views/HomepageViewMediaFiles/bordered-F2U_3.JPG';
import EntertainmentLogo from '../views/HomepageViewMediaFiles/bordered-F2U_4.JPG';
import logo from "../media/f2uLogo.svg";
import {Jumbotron} from "./Jumbotron";
import styled from "styled-components";

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
    
    .dropdown {
        margin: 3px; 
        padding: 3px; 
    }
    
    .nav-link {
        color: #fff;
        
        &:hover {
            color: #f6b6a4;
            border: 1px #ccc solid;
        } 
    }
    
    .img:hover {
      opacity: 0.3;
    }
                .container {
      position: relative;
      width: 100%;
    }
    
    .image {
      opacity: 1;
      display: block;
      width: 100%;
      transition: .5s ease;
      backface-visibility: hidden;
    }
    
    .middle {
      transition: .5s ease;
      opacity: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      text-align: center;
    }
    
    .container {
        margin: auto; 
        padding: auto;
    }
    
    .container:hover .image {
      opacity: 0.3;
    }
    
    .container:hover .middle {
      opacity: 1;
    }
    
    .text {
      background-color: #353a3f;
      color: white;
      font-size: 16px;
      padding: 16px 32px;
    }
`;

export const Homepage = () => (
    <Styles>
		{/*<Page>*/}
            {/*<Nav justify>
                <Nav.Item><Nav.Link href="/"><Image src={logo} width="46px"/></Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/search">Search</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/create">Create</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/activityhistory">My Activity History</Nav.Link></Nav.Item>
                <Nav.Item>
                    <NavDropdown title="My Account">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#/report">Report</NavDropdown.Item>
                    </NavDropdown>
                </Nav.Item>
            </Nav>*/}
            <Jumbotron/>
            <Container fluid className="container">
                <Row>
                    <Col>
                        <Container fluid className="container">
                            <img src={HikeLogo} rounded="true" className="image" alt="Responsive image"/>
                            <div className="middle">
                                <div className="text">Sports</div>
                            </div>
                        </Container>

                    </Col>
                    <Col>
                        <Container fluid className="container">
                            <img src={FoodLogo} rounded="true" className="image" alt="Responsive image"/>
                            <div className="middle">
                                <div className="text">Food</div>
                            </div>
                        </Container>

                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Container fluid className="container">
                            <img src={EntertainmentLogo} rounded="true" className="image" alt="Responsive image"/>
                            <div className="middle">
                                <div className="text">Entertainment</div>
                            </div>
                        </Container>

                    </Col>
                    <Col>
                        <Container fluid className="container">
                            <img src={OtherLogo} rounded="true" className="image" alt="Responsive image"/>
                            <div className="middle">
                                <div className="text">Other</div>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>

             {/*   <h1>Welcome to Friend2U!</h1>
                <img src={Logo} alt="website logo"/>
                <h2>Friend2U is an innovative meeting platform!</h2>
                <ul>
                    <li>Our platform brings exactly two people together.</li>
                    <li>Have the activity your way. Create it or join it.</li>
                    <li>Activities require a physical meetup in real life.</li>
                    <li>Friend2U is an activity-based platform instead of communication platform.</li>
                    <li>Rather a 'setup an activity and find a companion with same interests' solution</li>
                </ul>*/}
        {/*</Page>*/}
    </Styles>
);

