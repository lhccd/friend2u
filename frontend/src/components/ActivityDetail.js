"use strict";

import React from 'react';
import { Link } from 'react-router-dom'
//import { Card, CardTitle, CardText, Media, MediaOverlay, Grid, Cell, Button, FontIcon } from 'react-md';
import { FaFutbol, FaPizzaSlice, FaHammer, FaTv, FaTools} from "react-icons/fa";
import { Button, Card , Row, Col, Container, Dropdown, Navbar, Nav, Form, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import LocationShower from './LocationShower';
import UserService from '../services/AuthService'
import thumbnail from '../media/activity_mock.jpg'

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
            CreatorButtonVariant: "primary",
            transPhyCond: "",
            prefGender: "",
            cGender: ""
        }

        this.handleJoin = this.handleJoin.bind(this);
        this.handleUNJoin = this.handleUNJoin.bind(this);
        this.test = this.test.bind(this)
        this.userOrCreator = this.userOrCreator.bind(this)
        this.creatorButtonClick = this.creatorButtonClick.bind(this)
        this.setPriceSymbols = this.setPriceSymbols.bind(this);
        this.getPhyConditon = this.getPhyConditon.bind(this)
        this.setPrefGender = this.setPrefGender.bind(this)

        this.participantRef = React.createRef()
        this.creatorRef = React.createRef()
        this.creatorButtonRef = React.createRef()
    }

    setPrefGender() {
        if(this.props.activity.prefGender === "NotDeclared") {
            this.setState({ ["prefGender"]: "Does not matter"})
        } else {
            this.setState({ ["prefGender"]: this.props.activity.prefGender})
        }
    }

    setCreatorGender() {
        if(this.props.user.gender === "other") {
            this.setState({ ["cGender"]: "Other"})
        } else if(this.props.user.gender === "NotDeclared") {
            this.setState({ ["cGender"]: "Not Declared"})
        } else {
            this.setState({ ["cGender"]: this.props.user.gender})
        }
    }


    creatorButtonClick(event) {
        if(this.props.activity.participants.length == 0) {
            window.location = '/#/activities/edit/'+this.props.activity._id
        }
        else {
            // GoTo select person page
        }
    }

    getPhyConditon() {
        console.log("Translating phyCond.")
        switch(this.props.activity.phyCondition) {
            case 1: this.setState({ ["transPhyCond"]: "Couchpotato"}); break
            case 2: this.setState({ ["transPhyCond"]: "Casual Athlete"}); break
            case 3: this.setState({ ["transPhyCond"]: "Quite Sporty"}); break
            case 4: this.setState({ ["transPhyCond"]: "Very well trained"}); break
            default:  this.setState({ ["transPhyCond"]: "Error - Display physical condition - Contact the support - Thanks!"})
        }
    }

    setPriceSymbols(price) {
        console.log("Price")
        console.log(price)
        var symbols = ""
        for(var i=0; i<price; i++) {
            symbols+="€"
        }
        console.log(symbols)
        return symbols
        //this.setState({ ["price"]: symbols })
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

    getAge(birthday) {
        var today = new Date();
        var thisYear = 0;
        if (today.getMonth() < birthday.getMonth()) {
            thisYear = 1;
        } else if ((today.getMonth() == birthday.getMonth()) && today.getDate() < birthday.getDate()) {
            thisYear = 1;
        }
        var age = today.getFullYear() - birthday.getFullYear() - thisYear;
        return age;
    }

    render() {
        console.log(this.props.activity.activityName)

        if(this.state.first) {
            this.userOrCreator()
            this.getPhyConditon()
            this.setPrefGender()
            this.setCreatorGender()
            console.log(this.props.user)
            this.setState({ ["first"]: false})
        }
        

        return (
            <div>
                <Card style={{margin:"10px", padding:"5px"}}>
                    <Row key={this.props.key} className="text-center">
                    <Col xs lg={2}>
                        <Link to={'/activities/search'}>
                            <Button>
                                Return to search
                            </Button>
                        </Link>
                        <br/>
                        <Image className="center" src={thumbnail} fluid style={{width:"100%"}}/>
                    </Col>
                    <Col>
                        <Card.Header>{this.props.activity.category}</Card.Header>
                        <Card.Body>
                            <Card.Title>{this.props.activity.activityName}</Card.Title>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Date&Time:<br/>{new Date(this.props.activity.dateTime).toLocaleString()}</ListGroupItem>
                                <ListGroupItem>
                                    Duration:
                                    <br/>
                                    {this.props.activity.duration} min. {(this.props.activity.approxTime) ? "(time not 100% fixed)" : ""}
                                    </ListGroupItem>
                                <ListGroupItem style={{ display: (this.props.activity.category === "Sport") ? "block" : "none" }}>Physical Condition: {this.state.transPhyCond}</ListGroupItem>
                                <ListGroupItem>Price:<br/>{this.setPriceSymbols(this.props.activity.price)}</ListGroupItem>
                                <ListGroupItem>Description: <br/> {this.props.activity.description}</ListGroupItem>
                                <ListGroupItem style={{ height: "35rem"}}><LocationShower coords={this.props.activity.location.coordinates} withoutButton={true}/></ListGroupItem>
                                <ListGroupItem className="list-group-item-secondary">Information about the creator</ListGroupItem>
                                <ListGroupItem>
                                    <Image src={this.props.user.profilePicture} className="img-thumbnail"></Image>
                                    <br/>
                                    Name: {this.props.user.name} {this.props.user.surname}
                                </ListGroupItem>
                                <ListGroupItem>Gender: {this.state.cGender}</ListGroupItem>
                                <ListGroupItem>Age: {this.getAge(new Date(this.props.user.birthday))}</ListGroupItem>
                                <ListGroupItem className="list-group-item-secondary">Restricions for this activity (made by the creator)
                                </ListGroupItem>
                                <ListGroupItem>Age:<br/>From: {this.props.activity.fromAge} - To: {this.props.activity.toAge}</ListGroupItem>
                                <ListGroupItem>Gender:<br/>{this.state.prefGender}</ListGroupItem>
                                <ListGroupItem className="list-group-item-info">
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
                                            <Button onClick={this.creatorButtonClick} variant={this.state.CreatorButtonVariant}>{this.state.creatorButtonText}</Button>
                                        </Col>
                                    </div>
                                    </div>
                                </ListGroupItem>
                                <ListGroupItem className="list-group-item-warning">
                                    Is there something wrong with the creator and/or the activity?
                                    <br/>
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
                                </ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Col>
                    </Row>
                </Card>            
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




/*


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
                            <Button onClick={this.creatorButtonClick} variant={this.state.CreatorButtonVariant}>{this.state.creatorButtonText}</Button>
                        </Col>
                    </div>
                    </div>
                    
                </Row>
                </Container>
                

            <LocationShower coords={this.props.activity.location.coordinates} withoutButton={true}/>
            



            */