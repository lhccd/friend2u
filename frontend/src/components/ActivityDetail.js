"use strict";

import React from 'react';
import { Link } from 'react-router-dom'
//import { Card, CardTitle, CardText, Media, MediaOverlay, Grid, Cell, Button, FontIcon } from 'react-md';
import { Button, Card , Row, Col, Container } from 'react-bootstrap';
import LocationShower from './LocationShower';
import UserService from '../services/AuthService'

//import Page from './Page';

//import UserService from '../services/UserService';

const style = { maxWidth: 500 };

export class ActivityDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alreadyJoined: this.props.activity.participants.includes(UserService.getCurrentUser().id),
            userID: UserService.getCurrentUser().id,
            isParticipant: "none",
            isCreator: "none",
            creatorButtonText: "Please Wait...",
            creatorText: "",
            first: true,
            userText: "",
            CreatorButtonVariant: "primary"
        }

        this.handleJoin = this.handleJoin.bind(this);
        this.handleUNJoin = this.handleUNJoin.bind(this);
        this.test = this.test.bind(this)
        this.userOrCreator = this.userOrCreator.bind(this)

        this.participantRef = React.createRef()
        this.creatorRef = React.createRef()
        this.creatorButtonRef = React.createRef()
    }



    userOrCreator() {
        // Check wheter the user is visiting his activity,
        // or a potential participant; Show their specific view.
        console.log(this.participantRef.current)
        console.log(this.creatorButtonRef)
        if(this.state.userID === this.props.activity.creator) {
            this.setState({ ["isCreator"]: "block"})
            if(this.props.activity.participants.length == 0) {
                this.setState({ ["creatorText"]: "Currently nobody is interested in your activity. Do you want to modify it?"})
                this.setState({ ["creatorButtonText"]: "Modify Activity"})
            }
            else {
                this.setState({ ["creatorText"]: "Currently "+this.props.activity.participants.length+" persons are interested. Do you want to choose one?"})
                this.setState({ ["creatorButtonText"]: "Choose a person"})
                this.setState({ ["CreatorButtonVariant"]: "success"})
            }
        } else {
            if(this.state.alreadyJoined) {
                this.setState({ ["userText"]: "You have already joined this activity. Do you want to UNJoin?"})
            }
            else {
                if(this.props.activity.participants.length == 0) {
                    this.setState({ ["userText"]: "Currently nobody is interested in this activity. Be the first one!"})
                }
                else {
                    this.setState({ ["userText"]: "Currently "+this.props.activity.participants.length+" persons are interested. Are you also interested?"})
                }
            }
            
            this.setState({ ["isParticipant"]: "block"})
        }
    }

    handleJoin() {
        this.setState({alreadyJoined: true})
        this.props.onJoin(this.props.activity._id)


        window.location = '/#/activities/search'
    }

    handleUNJoin() {
        console.log("Unjoining this activity: "+this.props.activity._id)
        this.setState({alreadyJoined: false})
        this.props.onUNJoin(this.props.activity._id)

        window.location = '/#/activities/search'
    }

    test() {
        return (<h1>Huhu</h1>)
    }

    render() {
        console.log(this.props.activity.activityName)

        if(this.state.first) {
            this.userOrCreator()
            this.setState({ ["first"]: false})
        }
        

        return (
            <div>
            <Link to={'/activities/search'}>
                <Button>
                    Return to search
                </Button>
            </Link>

           
            <Card.Img variant="top" src="holder.js/100px180" />
            <Container>
                <Row>
                    <Col>
                        Activityname:
                    </Col>
                    <Col>
                        {this.props.activity.activityName}
                    </Col>
                </Row>
                <Row>
                    <Col>Category:</Col>
                    <Col>{this.props.activity.category}</Col>
                </Row>
                <Row>
                    <Col>Time & Date:</Col>
                    <Col>{new Date(this.props.activity.dateTime).toLocaleString()}</Col>
                </Row>
                    <Row>
                    <Col>Duration:</Col>
                    <Col>{this.props.activity.duration} min.</Col>
                </Row>
                    <Row>
                    <Col>Description:</Col>
                </Row>
                    <Row>
                    <Col>{this.props.activity.description}</Col>
                </Row>
                <Row className="block-example border border-primary">
                    <div>
                    <div style={{display: this.state.isParticipant}}>
                    <Col>
                       {this.state.userText}
                    </Col>
                    <Col>
                        {(this.state.alreadyJoined) ? <Button className="centered" variant="danger" onClick={this.handleUNJoin}>UNJoin this Activity</Button> : <Button variant="success" onClick={this.handleJoin}>Join this activity</Button>}
                    </Col>
                    </div>
                    <div style={{display: this.state.isCreator}}>
                        <Col>
                            {this.state.creatorText}
                        </Col>
                        <Col>
                            <Button variant={this.state.CreatorButtonVariant}>{this.state.creatorButtonText}</Button>
                        </Col>
                    </div>
                    </div>
                    
                </Row>
                </Container>
                

            <LocationShower coords={this.props.activity.location.coordinates} withoutButton={true}/>
            <Link to={'/activities'}>
                <Button>
                    Report Activity
                </Button>
            </Link>
            <Link to={'/activities'}>
                <Button>
                    Report User
                </Button>
            </Link>

            
            
            </div>
        );
    }
}



/*

<Card>
                <CardTitle>
                    {this.props.activity.activityName}
                </CardTitle>
                <CardText>
                    Category: {this.props.activity.category}
                </CardText>
            </Card>





activityName: "Hiking to Neureuth"
approxTime: false
category: "Sport"
createdAt: "2020-06-15T11:26:41.628Z"
creator: "5ee6a3d39df02f51788dc338"
dateTime: "2020-11-06T17:00:00.000Z"
description: "Lorem ipsum"
duration: 20
fromAge: 30
location: {type: "Point", coordinates: Array(2)}
participants: []
phyCondition: 4
prefGender: "Male"
price: 1
status: 0
toAge: 40
updatedAt: "2020-06-15T11:26:41.628Z"
voteForCreator: 1
voteForselPerson: 1



*/