"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';

import { ActivityListRow } from './ActivityListRow';
import Page from './Page'
import {Col, Card, Button, ListGroup, ListGroupItem, Row, Image, Container, Badge} from 'react-bootstrap';



export class ActivityListNothing extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
        <React.Fragment>
            <Card style={{margin:"10px", padding:"5px"}}>
                <Row className="text-center">
                <Col>
                    <Card.Header>Nothing found</Card.Header>
                    <Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>No activity has been found. Do you want to create your own one?</ListGroupItem>
                            <ListGroupItem>
                                <Button href="/#/activities/create" variant="info">
                                    Create an activity
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Col>
                </Row>
            </Card>
        </React.Fragment>
        )
    }
}