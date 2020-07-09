"use strict";

import React from 'react';
import { Link } from 'react-router-dom'
//import { Card, CardTitle, CardText, Media, MediaOverlay, Grid, Cell, Button, FontIcon } from 'react-md';
import { Button, Card , Row, Col } from 'react-bootstrap';
import LocationShower from './LocationShower';
import UserService from '../services/AuthService'

//import Page from './Page';

//import UserService from '../services/UserService';

const style = { maxWidth: 500 };

export class ActivityDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alreadyJoined: this.props.activity.participants.includes("eee"),
            userID: UserService.getCurrentUser().id
        }

        this.handleJoin = this.handleJoin.bind(this);
        this.handleUNJoin = this.handleUNJoin.bind(this);
        this.test = this.test.bind(this)
    }

    handleJoin() {
        this.setState({alreadyJoined: true})

        // Joining still has to be forwarded to the backend!!!!
    }


    handleUNJoin() {
        console.log(this.state.userID === this.props.activity.creator)
        this.setState({alreadyJoined: false})

        // Unjoining has to be forwarded to the backend!
    }

    test() {
        return (<h1>Huhu</h1>)
    }

    render() {
        console.log(this.props.activity.activityName)
        return (
            <div>
            <Link to={'/activities/search'}>
                <Button>
                    Return to search
                </Button>
            </Link>

            <Row>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Activityname: {this.props.activity.activityName}</Card.Title>
                <Card.Text>
                Category: {this.props.activity.category}
                <br/>
                Currently {this.props.activity.participants.length} people are interested in this activity.
                <br/>
                {(this.state.alreadyJoined) ? <Button variant="success" onClick={this.handleUNJoin}>UNJoin this Activity</Button> : <Button variant="danger" onClick={this.handleJoin}>Join this activity</Button>}
                </Card.Text>
            </Card.Body>
            </Card>
            </Row>
            <LocationShower coords={this.props.activity.location.coordinates} />
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