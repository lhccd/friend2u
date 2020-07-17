"use strict";

import React, { Fragment } from 'react';
import { Col, Card, Button, Row, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ActivityService from '../services/ActivityService'

export class CompanionCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likes:'',
            dislikes:''

        }
        this.chooseCompanion = this.chooseCompanion.bind(this);
        this.getVotes = this.getVotes.bind(this);
        this.getVotes();
    }

    async getVotes(){
        
		try{
            let votes = await ActivityService.getVotes(this.props.participant._id)
            this.setState({
                likes: votes.upVotes
            });
            this.setState({
                dislikes: votes.downVotes
            });

		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
        }
	}
    
    
    chooseCompanion() {
        this.props.onChoose(this.props.participant._id)
        window.location = '/#/activityhistory'
    }
    render() {

        return (
            <Fragment>

                <Card style={{ margin: "10px", padding: "5px" }}>
                    <Row noGutters>
                        <Col md="auto">
                        <Image src={this.props.participant.profilePicture} className="img-thumbnail"></Image>
                        </Col>
                        <Col>
                            <div class="card-block px-2">
                                <Card.Title>{this.props.participant.name} {this.props.participant.surname}</Card.Title>
                                <Card.Text>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Age: {this.props.participant.age}</ListGroupItem>
                                        <ListGroupItem>Gender: {this.props.participant.gender}</ListGroupItem>
                                        <ListGroupItem>Description: {this.props.participant.bio}</ListGroupItem>
                                        <ListGroup className="list-group-flush">
                                        <ListGroupItem className="list-group-item-info">Ratings from previous activites:
                                        <br/>
                                        
                                        👍: &nbsp;{this.state.likes} &nbsp;&nbsp;&nbsp;&nbsp;👎: &nbsp;{this.state.dislikes}</ListGroupItem> 
                                        </ListGroup>
                            
                                    </ListGroup>
                                    <Button variant="primary" onClick={this.chooseCompanion} > Choose</Button>
                                </Card.Text>
                            </div>
                        </Col>
                    </Row>
                </Card>

            </Fragment>

        );
    }
}