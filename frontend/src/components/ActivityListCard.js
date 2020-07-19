"use strict";

import React, { Fragment } from 'react';
import { Col, Card, Button, Row, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import thumbnail from '../media/activity_mock.jpg';
import UserService from '../services/AuthService';
import ActivityService from '../services/ActivityService';
import { number } from 'prop-types';
import HikeLogo from "../views/HomepageViewMediaFiles/bordered-F2U_6.JPG";
import FoodLogo from "../views/HomepageViewMediaFiles/bordered-F2U_3.JPG";
import EntertainmentLogo from "../views/HomepageViewMediaFiles/bordered-F2U_5.JPG";
import OtherLogo from "../views/HomepageViewMediaFiles/bordered-F2U_7.JPG";

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
        this.getContact = this.getContact.bind(this);
        this.upVoteParticipant = this.upVoteParticipant.bind(this);
        this.downVoteParticipant = this.downVoteParticipant.bind(this);
        this.upVoteCreator = this.upVoteCreator.bind(this);
        this.downVoteCreator = this.downVoteCreator.bind(this);
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

    upVoteParticipant() {
        ActivityService.updateVotes(2,this.props.activity._id,"creator").then((message) => {
        }).catch((e) => {
            console.log(e)
        })
        window.location.reload()
    }

    downVoteParticipant() {
        ActivityService.updateVotes(0,this.props.activity._id,"creator").then((message) => {
        }).catch((e) => {
            console.log(e)
        })
        window.location.reload()
    }

    upVoteCreator() {
        ActivityService.updateVotes(2,this.props.activity._id,"participant").then((message) => {
        }).catch((e) => {
            console.log(e)
        })
        window.location.reload()
    }

    downVoteCreator() {
        ActivityService.updateVotes(0,this.props.activity._id,"participant").then((message) => {
        }).catch((e) => {
            console.log(e)
        })
        window.location.reload()
    }

    setActivityThumbnail(category){
        switch(category){
            case "Sport":
                return (<Image className="center" src={HikeLogo} fluid style={{width:"100%"}}/>)
                array[Math.floor(Math.random() * array.length)]
                break;
            case "Food":
                return (<Image className="center" src={FoodLogo} fluid style={{width:"100%"}}/>)
                break;
            case "Entertainment":
                return (<Image className="center" src={EntertainmentLogo} fluid style={{width:"100%"}}/>)
                break;
            case "Others":
                return (<Image className="center" src={OtherLogo} fluid style={{width:"100%"}}/>)
                break;
        }
    }

    async getUserInfo(userID, role) {

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
            creator.email = this.state.creator.email;
            creator.mobile = this.state.creator.mobile;
            this.setState({ creator: creator })
        } else {
            creator.email = this.state.creator.email;
            creator.mobile = this.state.creator.mobile;
            this.setState({ participant: creator })
        }
    }

    async getContact(userID, role) {
        if (role == "participant") {
            let creator = await ActivityService.getContact(userID, this.state.userID, this.props.activity._id)
            var participants = this.state.participant
            participants.email = creator.participant.email
            participants.mobile = creator.participant.mobile
            this.setState({ participant: participants })
        } else {
            let contact = await ActivityService.getContact(this.state.userID, userID, this.props.activity._id)
            var creator = this.state.creator
            creator.email = contact.creator.email
            creator.mobile = contact.creator.mobile
            this.setState({ creator: creator })
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
        const hisMode = this.props.mode == 'Histories'
        const hasSelPerson = this.props.activity.selPerson != undefined
        const paired = this.props.activity.selPerson == this.state.userID
        const my = (this.props.activity.creator == this.state.userID) && hasSelPerson
        const rateForParticipant = (this.props.activity.voteForselPerson == 1)
        const rateForCreator = (this.props.activity.voteForCreator == 1)


        if (this.state.first) {
            this.getLocation(this.props.activity.location)

            if (createdMode && hasSelPerson) {
                this.getUserInfo(this.props.activity.selPerson, "participant").then(() => this.getContact(this.props.activity.selPerson, "participant"))
            }
            if (joinedMode) {
                this.getUserInfo(this.props.activity.creator, "creator")
                if (joinedMode && hasSelPerson) {
                    this.getContact(this.props.activity.creator, "creator")
                }
            }
            if (hisMode && my) {
                this.getUserInfo(this.props.activity.selPerson, "participant").then(() => this.getContact(this.props.activity.selPerson, "participant"))
            }
            if (hisMode && paired) {
                this.getUserInfo(this.props.activity.creator, "creator").then(() => this.getContact(this.props.activity.creator, "creator"))
            }

            this.setState({ ["first"]: false })
        }

        return (
            <Fragment>
                <Card key={this.props.activity._id} style={{ margin: "10px", padding: "5px" }}>
                    <Row noGutters>
                        <Col md={3}>
                            {this.setActivityThumbnail(this.props.activity.category)}
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
                                                <ListGroupItem className="list-group-item-info"> Currently {this.props.activity.participants.length} participants are interested in your activity.
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
                                            <React.Fragment>
                                                <ListGroup className="list-group-flush">
                                                    <ListGroupItem className="list-group-item-secondary"> Information about the participant:</ListGroupItem>
                                                    <ListGroupItem>Name: {this.state.participant.name}</ListGroupItem>
                                                    <ListGroupItem>Age: {this.state.participant.age} Gender: {this.state.participant.gender}</ListGroupItem>
                                                    <ListGroupItem className="list-group-item-secondary">Contact details: </ListGroupItem>
                                                    <ListGroupItem>Mobile: {this.state.participant.mobile}</ListGroupItem>
                                                    <ListGroupItem>E-mail: {this.state.participant.email}</ListGroupItem>
                                                    <ListGroupItem className="list-group-item-success">
                                                        YOU HAVE NOW THE PARTICIPANT FOR THIS ACTIVITY!
                                                        <br />
                                                        <Link to={`/detail/${this.props.activity._id}`} >
                                                            <Button variant="primary" > See details</Button>
                                                        </Link>
                                                    </ListGroupItem>
                                                </ListGroup>

                                            </React.Fragment>
                                        }
                                    </React.Fragment> : null}
                                {joinedMode ?
                                    <React.Fragment>
                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem className="list-group-item-secondary">Information about the creator: </ListGroupItem>

                                            <ListGroupItem>Name: {this.state.creator.name}</ListGroupItem>
                                            <ListGroupItem>Age: {this.state.creator.age} Gender: {this.state.creator.gender}</ListGroupItem>

                                        </ListGroup>
                                        <ListGroup>
                                            {!paired ?
                                                <React.Fragment>
                                                    {hasSelPerson ?

                                                        <ListGroupItem className="list-group-item-danger"> You have not been selected. <br />
                                                            <div className='activity-participateButton' >
                                                                <Link to={'/activities/create'}>
                                                                    <Button>
                                                                        Create your own activity
                                            </Button>
                                                                </Link>
                                                                &nbsp;&nbsp;&nbsp;
                                        <Link to={'/activities/search'}>
                                                                    <Button>
                                                                        Search for other activities
                                            </Button>
                                                                </Link>
                                                            </div>

                                                        </ListGroupItem>
                                                        : <React.Fragment>
                                                            <ListGroupItem className="list-group-item-info">The creator has not yet decided.
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
                                                    <ListGroup className="list-group-flush">
                                                        <ListGroupItem className="list-group-item-secondary">Contact details: </ListGroupItem>
                                                        <ListGroupItem>Mobile: {this.state.creator.mobile}</ListGroupItem>
                                                        <ListGroupItem>E-mail: {this.state.creator.email}</ListGroupItem>

                                                        <ListGroupItem className="list-group-item-success">
                                                            YOU HAVE BEEN SELECTED!
    <br />
                                                            <Link to={`/detail/${this.props.activity._id}`} >
                                                                <Button variant="primary" > See details</Button>
                                                            </Link>

                                                        </ListGroupItem>
                                                    </ListGroup>
                                                </React.Fragment>
                                            }

                                        </ListGroup>
                                    </React.Fragment>
                                    : null
                                }
                                {hisMode ?
                                    <React.Fragment>

                                        {paired ?
                                            <React.Fragment>
                                                <ListGroup className="list-group-flush">
                                                    <ListGroupItem className="list-group-item-secondary">Information about the creator: </ListGroupItem>

                                                    <ListGroupItem>Name: {this.state.creator.name}</ListGroupItem>
                                                    <ListGroupItem>Age: {this.state.creator.age} Gender: {this.state.creator.gender}</ListGroupItem>
                                                    <ListGroupItem className="list-group-item-secondary">Contact details: </ListGroupItem>
                                                    <ListGroupItem>Mobile: {this.state.creator.mobile}</ListGroupItem>
                                                    <ListGroupItem>E-mail: {this.state.creator.email}</ListGroupItem>
                                                    {rateForCreator?
                                                 <ListGroupItem className="list-group-item-info"> Please rate for the creator:<br/>
                                                 <Button variant="primary" onClick = {this.upVoteCreator}> 👍 </Button>
                                                 &nbsp;&nbsp;&nbsp;&nbsp;
                                                 <Button variant="primary" onClick = {this.upVoteCreator}> 👎 </Button>
                                                 </ListGroupItem>  
                                                    :null}    
                                                </ListGroup>
                                            </React.Fragment> : null
                                        }
                                        {my ?
                                            <React.Fragment>
                                                <ListGroup className="list-group-flush">
                                                    <ListGroupItem className="list-group-item-secondary"> Information about the participant: </ListGroupItem>
                                                    <ListGroupItem>Name: {this.state.participant.name}</ListGroupItem>
                                                    <ListGroupItem>Age: {this.state.participant.age} Gender: {this.state.participant.gender}</ListGroupItem>
                                                    <ListGroupItem className="list-group-item-secondary">Contact details: </ListGroupItem>
                                                    <ListGroupItem>Mobile: {this.state.participant.mobile}</ListGroupItem>
                                                    <ListGroupItem>E-mail: {this.state.participant.email}</ListGroupItem>  
                                                {rateForParticipant?
                                                 <ListGroupItem className="list-group-item-info"> Please rate for the participant:<br/>
                                                 <Button variant="primary" onClick = {this.upVoteParticipant}> 👍 </Button>
                                                 &nbsp;&nbsp;&nbsp;&nbsp;
                                                 <Button variant="primary" onClick = {this.downVoteParticipant}> 👎 </Button>
                                                 </ListGroupItem>  
                                                    :null}</ListGroup>
                                            </React.Fragment> : null
                                        }

                                        <React.Fragment> </React.Fragment>
                                    </React.Fragment> : null

                                }
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Fragment>

        );
    }
}
