"use strict";

import React from 'react';
import { Col, Card, Button, Row } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
   .activity-location{
       display: flex;
       align-items:baseline;
   }
   .activity-date{
    display: flex;
    align-items:baseline;
}
   .activity-participateButton{
    display: flex;
    align-items:baseline;
    margin
    .span,h4{
        padding-left:10px;
        padding-right:10px;
    }
    .button{
        margin-left:10px;
        margin-right:10px;
    }
   }
`;

export const ActivityListCard = ({id, activityName,location, date, description , participant}) => (  
    <Styles>
   <Card key={id}>
    <Row noGutters>
        <Col md="auto">
            <img src="//placehold.it/200" class="img-fluid" alt=""/>
        </Col>
        <Col>
            <div class="card-block px-2">
                <Card.Title>{activityName}</Card.Title>
                <Card.Text>
                    <div class = 'activity-location'>
                    <h4> Location:  </h4> 
                    <span Style= "padding-left:10px">  {location} </span>
                </div>
                <div class = 'activity-date'>
                    <h4> Date:  </h4> 
                    <span Style= "padding-left:10px">  {date.split('T')[1]} </span>
                    <h4 Style= "padding-left:10px" > Time:  </h4> 
                    <span Style= "padding-left:10px">  {date.split('T')[1]} </span>
                </div>
                <div class = 'activity-description'>
                    <span>  {description}</span>
                </div>   
                    </Card.Text>
                <div class = 'activity-participateButton'>
                    <span Style= "padding-right:10px;">  Currently {participant.length} participants are interested in your activity. </span> 
                <Button variant="primary"> See details</Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="primary" disabled={participant.length == 0}> Choose Companion</Button>
                </div>  
            </div>
        </Col>
    </Row>
</Card>
</Styles>
);
