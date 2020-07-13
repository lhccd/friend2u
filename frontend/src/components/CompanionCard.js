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
                <Styles>
                    <Card>
                        <Row noGutters>
                            <Col md="auto">
                                <Image className="center" src={thumbnail} fluid style={{ width: "100%" }} />
                            </Col>
                            <Col>
                                <div class="card-block px-2">
                                    <Card.Title>{this.props.participant.name} {this.props.participant.surname}</Card.Title>
                                    <Card.Text>  
                                        <h2>{this.props.participant.gender} {this.props.participant.age}
                                        {this.props.participant.bio} </h2>
                                    <Button variant="primary" onClick = {this.chooseCompanion} > Choose</Button>      
                                    </Card.Text>     
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Styles>
            </Fragment>

        );
    }
}