"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import { ActivityListRow } from './ActivityListRow';
import Page from './Page'
import { ListGroup, ListGroupItem, Form, Row, Col} from 'react-bootstrap';



export class ActivityList extends React.Component {

    constructor(props) {
        super(props);

        this.handleSort = this.handleSort.bind(this)
    }

    handleSort(event) {
        console.log(event.target)
        console.log(event.target.name)
        console.log(event.target.value)
        this.props.onSort(event.target.value)
    }

    render() {
        return(
        <React.Fragment>
            <DataTable plain style={{ MarginBottom: '36px'}}>
                <ListGroup>
                    <ListGroupItem className="list-group-item-success" style={{marginTop: "10px"}}>
                        <Row>
                            <Col>
                                <h3>Searchresults:</h3>
                            </Col>
                            <Col>
                                <div style={{float: "right", inline: true}}>
                                    Search by:
                                    <Form.Control as="select" name="prefGender" defaultValue="Activityname Ascending" style={{width: "15rem"}}
                                                        onChange={this.handleSort}>
                                                                        <option>Activityname Ascending</option>
                                                                        <option>Activityname Descending</option>
                                                                        <option>Date Ascending</option>
                                                                        <option>Date Descending</option>
                                                                        <option>Price Ascending</option>
                                                                        <option>Price Descending</option>
                                    </Form.Control>
                                </div>
                            </Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
                <TableBody>
                    {this.props.data.map((activity, i) => <ActivityListRow key={i} activity={activity} onDelete={(id) => this.props.onDelete(id)} />)}
                </TableBody>
            </DataTable>
        </React.Fragment>
        )
    }
}





/*

<TableColumn>Name</TableColumn>
                    <TableColumn>Edit</TableColumn>
                    <TableColumn>Remove</TableColumn>


                    */



