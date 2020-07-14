"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import { ActivityListRow } from './ActivityListRow';
import Page from './Page'
import { ListGroup, ListGroupItem, Form, Row, Col} from 'react-bootstrap';

const dataTableStyle = {
  'margin-bottom': '36px'
};

export const ActivityList = ({data, onDelete}) => (
    <React.Fragment>
        <DataTable plain style={dataTableStyle}>
            <ListGroup>
                <ListGroupItem className="list-group-item-success">
                    <Row>
                        <Col>
                            <h3>Searchresults:</h3>
                        </Col>
                        <Col>
                            <div style={{float: "right", inline: true}}>
                                Search by:
                                <Form.Control as="select" name="prefGender" defaultValue="Activityname Ascending" style={{width: "15rem"}}>
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
                {data.map((activity, i) => <ActivityListRow key={i} activity={activity} onDelete={(id) => onDelete(id)} />)}
            </TableBody>
        </DataTable>
    </React.Fragment>
);


/*

<TableColumn>Name</TableColumn>
                    <TableColumn>Edit</TableColumn>
                    <TableColumn>Remove</TableColumn>


                    */