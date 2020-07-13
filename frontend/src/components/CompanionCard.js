"use strict";

import React, { Fragment } from 'react';
import { Col, Card, Button, Row, Image,ListGroup,ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import thumbnail from '../media/activity_mock.jpg';

export class CompanionCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
         
        }
        this.chooseCompanion = this.chooseCompanion.bind(this);
    }

    chooseCompanion(){
        this.props.onChoose(this.props.participant._id)
        window.location = '/#/activityhistory'
    }
    render() {
        
        return (
            <Fragment>
    
                    <Card style = {{margin:"10px", padding:"5px"}}>
                        <Row noGutters>
                            <Col md="auto">
                                <Image className="center" src={thumbnail} fluid style={{ width: "100%" }} />
                            </Col>
                            <Col>
                                <div class="card-block px-2">
                                    <Card.Title>{this.props.participant.name} {this.props.participant.surname}</Card.Title>
                                    <Card.Text>  
                                    <ListGroup className="list-group-flush">
                                    <ListGroupItem>Age: {this.props.participant.age}</ListGroupItem>
                                    <ListGroupItem>Gender: {this.props.participant.gender}</ListGroupItem>
                                    <ListGroupItem>Description: {this.props.participant.bio}</ListGroupItem>
                                      </ListGroup>
                                    <Button variant="primary" onClick = {this.chooseCompanion} > Choose</Button>      
                                  
                                    </Card.Text>     
                                </div>
                            </Col>
                        </Row>
                    </Card>
     
            </Fragment>

        );
    }
}