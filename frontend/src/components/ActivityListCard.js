"use strict";

import React, { Fragment } from 'react';
import { Col, Card, Button, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import thumbnail from '../media/activity_mock.jpg';
import UserService from '../services/AuthService';
import ActivityService from '../services/ActivityService';
import { object } from 'prop-types';

const Styles = styled.div`
   .activity-location{
       display: flex;
       align-items:baseline;
   }
   .activity-date{
    display: flex;
    align-items:baseline;
}
   .activity-price{
    display: flex;
    align-items:baseline;  
   }
   .activity-participateButton{
    display: flex;
    .button{
     margin-top: 100 px;
    }
   }

`;
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
        const historiesMode = this.props.mode == 'Histories'
        const hasSelPerson = this.props.activity.selPerson != undefined
        const paired = this.props.activity.selPerson == this.state.userID

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
                <Styles>
                    <Card key={this.props.activity._id}>
                        <Row noGutters>
                            <Col md="auto">
                                <Image className="center" src={thumbnail} fluid style={{ width: "100%" }} />
                            </Col>
                            <Col>
                                <div class="card-block px-2">
                                    <Card.Title>{this.props.activity.activityName}</Card.Title>
                                    <Card.Text>
                                        <div class='activity-location'>
                                            <h4> Location:  </h4>
                                            <span Style="padding-left:10px">  {this.state.address} </span>
                                        </div>
                                        <div class='activity-date'>
                                            <h4> Date & Time:  </h4>
                                            <span Style="padding-left:10px"> {new Date(this.props.activity.dateTime).toLocaleString()} </span>
                                        </div>
                                        <div class='activity-price'>
                                            <h4> Price:  </h4>
                                            <span> {this.setPriceSymbols(this.props.activity.price)}</span>
                                        </div>
                                    </Card.Text>
                                    {createdMode ?
                                        <React.Fragment>
                                            {!hasSelPerson ?
                                                <React.Fragment>
                                                    <span>  Currently {this.props.activity.participants.length} participants are interested in your activity. </span>
                                                    <div class='activity-participateButton' >
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
                                                </React.Fragment>

                                                :
                                                <div class='participant-information'>
                                                    <h4> Information about Participant: </h4>
                                                    <h4> Name: </h4>
                                                    <span Style="padding-left:10px"> {this.state.participant.name} {this.state.participant.surname}  </span>
                                                    <h4> Age: </h4>
                                                    <span Style="padding-left:10px"> {this.state.participant.age}  </span>
                                                    <h4> Gender: </h4>
                                                    <span Style="padding-left:10px"> {this.state.participant.gender}  </span>
                                                </div>
                                            }
                                        </React.Fragment> : null}
                                    {joinedMode ?
                                        <React.Fragment>
                                            <div class='activity-information'>
                                                <h4> Information about Creator: </h4>
                                                <h4> Name: </h4>
                                                <span Style="padding-left:10px"> {this.state.creator.name} {this.state.creator.surname}  </span>
                                                <h4> Age: </h4>
                                                <span Style="padding-left:10px"> {this.state.creator.age}  </span>
                                                <h4> Gender: </h4>
                                                <span Style="padding-left:10px"> {this.state.creator.gender}  </span>
                                            </div>
                                            {!paired ?
                                                <React.Fragment>
                                                    <span> The creator has not yet decided.</span>
                                                    <div class='unjoinButton' >
                                                        <Button variant="primary" onClick={this.handleUNJoin}> Unjoin Activity</Button>
                                                    </div>
                                                </React.Fragment>
                                                :
                                                <React.Fragment>
                                                    <span> You are chosen.</span>
                                                    <h4> Contact: </h4>
                                                    <span Style="padding-left:10px"> {this.state.creator.mobile}  </span>

                                                </React.Fragment>}
                                            <div className='activity-participateButton' >
                                                <Link to={`/detail/${this.props.activity._id}`} >
                                                    <Button variant="primary" > See details</Button>
                                                </Link>
                                            </div>
                                        </React.Fragment>

                                        : null

                                    }
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Styles>
            </Fragment>

        );
    }
}