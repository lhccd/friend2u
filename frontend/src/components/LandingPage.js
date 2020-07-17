"use strict";

import React from 'react';
import {Jumbotron} from "./Jumbotron";

import {FaFutbol, FaPizzaSlice, FaHammer, FaTv, FaTools} from "react-icons/fa";
import {
    Button,
    Card,
    Row,
    Col,
    Container,
    Dropdown,
    Navbar,
    Nav,
    Tabs,
    Tab,
    Sonnet,
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
import jumbotronBg from "../media/jumbotron_landing.jpeg";
import {Footer} from "./Footer";
import HikeLogo from "../views/HomepageViewMediaFiles/bordered-F2U_1.JPG";
import EntertainmentLogo from "../views/HomepageViewMediaFiles/bordered-F2U_4.JPG";
import OtherLogo from "../views/HomepageViewMediaFiles/bordered-F2U_2.JPG";

import entertainment1 from "../media/entertainment_1.jpg";
import entertainment2 from "../media/entertainment_2.jpg";
import entertainment3 from "../media/entertainment_3.jpg";
import entertainment4 from "../media/entertainment_4.jpg";

import food1 from "../media/food_1.jpg";
import food2 from "../media/food_2.jpg";
import food3 from "../media/food_3.jpg";
import food4 from "../media/food_4.jpg";
import FoodLogo from "../views/HomepageViewMediaFiles/bordered-F2U_3.JPG";

import other1 from "../media/other_1.jpg";
import other2 from "../media/other_2.jpg";
import other3 from "../media/other_3.jpg";
import other4 from "../media/other_4.jpg";

import sport1 from "../media/sport_1.jpg";
import sport2 from "../media/sport_2.jpg";
import sport3 from "../media/sport_3.jpg";
import sport4 from "../media/sport_4.jpg";
import Link from "react-router-dom/es/Link";

const Styles = styled.div`
    .jumbo {
        background: url(${jumbotronBg});
        background-size: cover;
        height: 400px;
        margin: auto;
        position: relative;
        z-index: 1;
    }
    
    .jumbo > .overlay {
        position: absolute;
        opacity: 0.3;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #000;
        z-index: 2;
    }
    
    .jumbo__text {
        position: absolute;
        text-align: center;
        color: white;
        z-index: 3;
        justify-content: center;
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
    
    .container__text{
        padding-top: 200px;
        padding-bottom: 200px;
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

export class LandingPage extends React.Component {

    constructor(props) {
        super();
        this.state = {
            // Takes active tab from props if it is defined there
            activeTab: props.activeTab || 1
        };

        // Bind the handleSelect function already here (not in the render function)
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(selectedTab) {
        // The active tab must be set into the state so that
        // the Tabs component knows about the change and re-renders.
        this.setState({
            activeTab: selectedTab
        });
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
                                    width="600"
                                    height="400"
                                    className="d-inline-block align-top"
                                />
                            </Navbar.Brand>
                        </Nav>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    </Navbar>
                    <Jumbo fluid className="jumbo">
                        <Container fluid className="jumbo__text">
                            <h1 style={{color: "white", fontSize: "45px"}}>Welcome to Friend2U</h1><br/>
                            <p style={{color: "white", fontSize: "25px"}}>Friend2U is an activity-based innovative
                                meeting platform!</p><br/>
                            <p style={{color: "white", fontSize: "25px"}}>If you ever wanted to do an activity and all
                                Your friends were occupied, Friend2U is the application to help You solve this
                                problem!</p><br/>
                            <p style={{color: "white", fontSize: "25px"}}>Our app helps You find a companion and
                                possibly a friend to do all the activities You'd like to do!</p>
                            <h1 style={{color: "white", fontSize: "25px", paddingBottom: "100px"}}>If you are interested, please sign up or log in! <Link to="/login">Sign Up / Log In</Link></h1>
                        </Container>
                        <div className="overlay"></div>
                    </Jumbo>
                    <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}
                          className="bg-dark justify-content-around" style={{color: "white", background: "grey", fontSize: "20px", marginBottom: "10px"}}>
                        <Tab eventKey={1} title="Find a friend for sports">
                            <h1>Find a companion to...</h1>
                            <Container fluid style={{marginTop: "20px"}}>
                                <Row>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={sport1} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...go for a hike!</h1>
                                        </Container>

                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                            <Container fluid style={{marginTop: "20px"}}>
                                <Row>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...learn how to row!</h1>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={sport2} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>

                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                            <Container fluid style={{marginTop: "20px"}}>
                                <Row>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={sport3} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...to learn how to dance!</h1>
                                        </Container>

                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                            <Container fluid>
                                <Row>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...to go for a swim!</h1>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={sport4} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </Tab>
                        <Tab eventKey={2} title="Find a friend for food">
                            <h1>Find a companion to...</h1>
                            <Container fluid style={{marginTop: "20px"}}>
                                <Row>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={food1} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...to enjoy a delicious T-Bone Steak!</h1>
                                        </Container>

                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                            <Container fluid style={{marginTop: "20px"}}>
                                <Row>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...to eat the best pizza in town!</h1>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={food2} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>

                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                            <Container fluid style={{marginTop: "20px"}}>
                                <Row>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={food3} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...to enjoy a delicious ice cream on a sunny day!</h1>
                                        </Container>

                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                            <Container fluid>
                                <Row>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...to explore new cuisines!</h1>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={food4} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </Tab>
                        <Tab eventKey={3} title="Find a friend for entertainment">
                            <h1>Find a companion to...</h1>
                            <Container fluid style={{marginTop: "20px"}}>
                                <Row>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...go to a concert!</h1>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={entertainment1} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>

                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                            <Container fluid style={{marginTop: "20px"}}>
                                <Row>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={entertainment2} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...go to the opera!</h1>
                                        </Container>

                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                            <Container fluid style={{marginTop: "20px"}}>
                                <Row>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...go to the cinema!</h1>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={entertainment3} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>

                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                            <Container fluid>
                                <Row>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={entertainment4} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>
                                    </Col>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...visit a summerfestival!</h1>
                                        </Container>

                                    </Col>
                                </Row>
                            </Container>
                        </Tab>
                        <Tab eventKey={4} title="Find a friend for other activities">
                            <h1>Find a companion to...</h1>
                            <Container fluid style={{marginTop: "20px"}}>
                                <Row>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={other1} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...build a tree house!</h1>
                                        </Container>

                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                            <Container fluid style={{marginTop: "20px"}}>
                                <Row>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...learn origami!</h1>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={other2} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>

                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                            <Container fluid style={{marginTop: "20px"}}>
                                <Row>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={other3} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...learn how to paint!</h1>
                                        </Container>

                                    </Col>
                                </Row>
                            </Container>
                            <br/>
                            <Container fluid>
                                <Row>
                                    <Col>
                                        <Container fluid className="container__text">
                                            <h1>...to learn how to sew clothes!</h1>
                                        </Container>

                                    </Col>
                                    <Col>
                                        <Container fluid className="container">
                                            <img src={other4} rounded="true" className="image"
                                                 alt="Responsive image"/>
                                        </Container>
                                    </Col>
                                </Row>
                            </Container>
                        </Tab>

                    </Tabs>
                    <Jumbo fluid className="jumbo" style={{marginTop:"10px"}}>
                        <Container fluid className="jumbo__text">
                            <h1 style={{color: "white", fontSize: "40px", paddingTop: "100px", paddingBottom: "100px"}}>If you are interested, please sign up or log in! <Link to="/login">Sign Up / Log In</Link></h1>
                        </Container>
                        <div className="overlay"></div>
                    </Jumbo>

                    {/*<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Home">
                            <Sonnet />
                        </Tab>
                        <Tab eventKey="profile" title="Profile">
                            <Sonnet />
                        </Tab>
                        <Tab eventKey="contact" title="Contact" disabled>
                            <Sonnet />
                        </Tab>
                    </Tabs>*/}

                    <Footer/>
                </Styles>
            </React.Fragment>
        )
    }
}
