"use strict";

import React, { Fragment } from 'react';
import { Col, Card, Button, Row, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import thumbnail from '../media/activity_mock.jpg';
import UserService from '../services/AuthService';
import ActivityService from '../services/ActivityService';

export class ActivityListCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: "",
            first: true,
            userID: UserService.getCurrentUser().id,
            creator: {
                "bio": "",
                "profilePicture": "",
                "role": "",
                "_id": "",
                "username": "",
                "email": "",
                "birthday": "",
                "name": "",
                "surname": "",
                "gender": "",
                "mobile": "",
                "age": "",
            },
            participant: {
                "bio": "",
                "profilePicture": "",
                "role": "",
                "_id": "",
                "username": "",
                "email": "",
                "birthday": "",
                "name": "",
                "surname": "",
                "gender": "",
                "mobile": "",
                "age": "",
            },
            show: false
        }
        this.handleUNJoin = this.handleUNJoin.bind(this);
        this.setPriceSymbols = this.setPriceSymbols.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    handleUNJoin() {
        ActivityService.unJoinUser(this.props.activity._id).then((message) => {
            console.log("User has UNjoined " + this.props.activity._id)
        }).catch((e) => {
            console.log("Sth. went wrong with the UNjoin...")
            console.log(e)
        })
        window.location.reload()
    }

    async getUserInfo(userID, role) {
        UserService.getUserInfo(userID)
        let creator = await UserService.getUserInfo(userID)

        var today = new Date();
        var birthDate = new Date(creator.birthday);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        creator.age = age_now;

        if (role == "creator") {
            this.setState({ creator: creator })
        } else {
            this.setState({ participant: creator })
        }
    }

    async getLocation(location) {

        var query = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + location.coordinates[1] + "," + location.coordinates[0] + "&key=AIzaSyCm-HwLhA8qvL4JPcBl9aKojPcHSKOdwY8"

        var header = new Headers()

        try {
            let resp = await fetch(query, {
                method: 'GET',
                headers: header
            })

            var res = await resp.json()
            var out = res.results[0].formatted_address
            this.setState({ ["address"]: res.results[0].formatted_address })

        } catch (error) {
            console.log(error)
        }

    }

    setPriceSymbols(price) {
        var symbols = ""
        for (var i = 0; i < price; i++) {
            symbols += "€"
        }

        return symbols

    }

    render() {
        const participantsEmpty = this.props.activity.participants.length == 0
        const createdMode = this.props.mode == 'Created'
        const joinedMode = this.props.mode == 'Joined'
        const hasSelPerson = this.props.activity.selPerson != undefined
        const paired = this.props.activity.selPerson == this.state.userID
        const notMe = hasSelPerson && !paired

        if (this.state.first) {
            this.getLocation(this.props.activity.location)

            if (createdMode && hasSelPerson) {
                this.getUserInfo(this.props.activity.selPerson, "participant")
            }
            if (joinedMode) {
                this.getUserInfo(this.props.activity.creator, "creator")
            }
            this.setState({ ["first"]: false })
        }

        return (
            <Fragment>
                <Card key={this.props.activity._id} style={{ margin: "10px", padding: "5px" }}>
                    <Row noGutters>
                        <Col md="auto">
                            <Image className="center" src={thumbnail} fluid style={{ width: "100%" }} />
                        </Col>
                        <Col>
                            <div class="card-block px-2">
                                <Card.Title>{this.props.activity.activityName}</Card.Title>
                                <Card.Text>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Location: {this.state.address}</ListGroupItem>
                                        <ListGroupItem>Date&Time: {new Date(this.props.activity.dateTime).toLocaleString()}</ListGroupItem>
                                        <ListGroupItem>Price: {this.setPriceSymbols(this.props.activity.price)}</ListGroupItem>
                                    </ListGroup>
                                </Card.Text>
                                {createdMode ?
                                    <React.Fragment>
                                        {!hasSelPerson ?
                                            <React.Fragment>
                                                <ListGroupItem> Currently {this.props.activity.participants.length} participants are interested in your activity.
                                                    <div className='activity-participateButton' >
                                                        <Link to={`/detail/${this.props.activity._id}`} >
                                                            <Button variant="primary" > See details</Button>
                                                        </Link>
                                                        &nbsp;&nbsp;&nbsp;
                                        {participantsEmpty ?
                                                            <Link to={`activities/edit/${this.props.activity._id}`} >
                                                                <Button variant="primary"> Modify activity</Button>
                                                            </Link>

                                                            :
                                                            <Link to={`/chooseCompanion/${this.props.activity._id}`} >
                                                                <Button variant="primary" > Choose Companion</Button>
                                                            </Link>

                                                        }
                                                    </div>
                                                </ListGroupItem>
                                            </React.Fragment>

                                            :
                                            <ListGroup className="list-group-flush"> Information about the participant:
                                    <ListGroupItem>Name: {this.state.participant.name}</ListGroupItem>
                                                <ListGroupItem>Age:: {this.state.participant.age} Gender: {this.state.participant.gender}</ListGroupItem>
                                                <ListGroupItem>Contact:  Mobile: {this.state.participant.mobile} E-mail:
                                    {this.state.participant.email}</ListGroupItem>
                                            </ListGroup>

                                        }
                                    </React.Fragment> : null}
                                {joinedMode ?
                                    <React.Fragment>
                                        <ListGroup className="list-group-flush"> Information about the creator:
                                    <ListGroupItem>Name: {this.state.creator.name}</ListGroupItem>
                                            <ListGroupItem>Age:: {this.state.creator.age} Gender: {this.state.creator.gender}</ListGroupItem>

                                        </ListGroup>
                                        <ListGroup>
                                            {!paired ?
                                                <React.Fragment>
                                                    {hasSelPerson ?

                                                        <ListGroupItem>you are not chosen.</ListGroupItem>
                                                        : <React.Fragment>
                                                            <ListGroupItem>The creator has not yet decided.
                                                    <div className='unjoinButton' >
                                                                    <Button variant="primary" onClick={this.handleUNJoin}> Unjoin activity</Button>
                                                                    &nbsp;&nbsp;&nbsp;
                                                <Link to={`/detail/${this.props.activity._id}`} >
                                                                        <Button variant="primary" > See details</Button>
                                                                    </Link>
                                                                </div>
                                                            </ListGroupItem>
                                                        </React.Fragment>
                                                    }
                                                </React.Fragment>
                                                :
                                                <React.Fragment>
                                                    <ListGroupItem>Contact:  Mobile: {this.state.creator.mobile} E-mail:
                                    {this.state.creator.email}</ListGroupItem>
                                                    <ListGroupItem>
                                                        You are chosen.<br></br>

                                                        <Link to={`/detail/${this.props.activity._id}`} >
                                                            <Button variant="primary" > See details</Button>
                                                        </Link>

                                                    </ListGroupItem>
                                                </React.Fragment>
                                            }

                                        </ListGroup>
                                    </React.Fragment>
                                    : null
                                }
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Fragment>

        );
    }
}