"use strict";

import React from 'react';
import {Container, Row, Col, Nav, NavDropdown, Image} from 'react-bootstrap';
import Page from './Page'
import Logo from '../media/f2uLogo.png'
import HikeLogo from '../views/HomepageViewMediaFiles/bordered-F2U_6.JPG';
import OtherLogo from '../views/HomepageViewMediaFiles/bordered-F2U_7.JPG';
import FoodLogo from '../views/HomepageViewMediaFiles/bordered-F2U_3.JPG';
import EntertainmentLogo from '../views/HomepageViewMediaFiles/bordered-F2U_5.JPG';
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
    
    .column{
        height: 600px;
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
    .box {position: absolute;}
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
            <Jumbotron/>
            <Container fluid>
                <Row>
                    <Col>
                        <Nav.Link href="#/activities/sport">
                            <Container fluid className="container">
                                <img src={HikeLogo} rounded="true" className="image" alt="Responsive image"/>
                                <div className="middle">
                                    <div className="text">Sports</div>
                                </div>
                            </Container>
                        </Nav.Link>
                    </Col>
                    <Col>
                        <Nav.Link href="#/activities/food">
                            <Container fluid className="container" href="/#/activities/food">
                                <img src={FoodLogo} rounded="true" className="image" alt="Responsive image"/>
                                <div className="middle">
                                    <div className="text">Food</div>
                                </div>
                            </Container>
                        </Nav.Link>
                    </Col>
                </Row>
            </Container>
        <br/>
            <Container fluid>
                <Row>
                    <Col>
                        <Nav.Link href="#/activities/entertainment">
                            <Container fluid className="container">
                                <img src={EntertainmentLogo} rounded="true" className="image" alt="Responsive image"/>
                                <div className="middle">
                                    <div className="text">Entertainment</div>
                                </div>
                            </Container>
                        </Nav.Link>
                    </Col>
                    <Col>
                        <Nav.Link href="#/activities/other">
                            <Container fluid className="container">
                                <img src={OtherLogo} rounded="true" className="image" alt="Responsive image"/>
                                <div className="middle">
                                    <div className="text">Other</div>
                                </div>
                            </Container>
                        </Nav.Link>
                    </Col>
                </Row>
            </Container>
    </Styles>
);

