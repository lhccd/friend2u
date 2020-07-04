"use strict";

import React from 'react';
import { Fragment } from 'react';
import { Card, Button, Text } from 'react-bootstrap';

import Page from './Page'

const dataTableStyle = {
  'marginBottom': '36px'
};

export const ReportListRow = ({id, count, toggleModal}) => (
<Card key={id}>
  <Card.Header>User</Card.Header>
  <Card.Body>
    <Card.Title>{id}</Card.Title>
    <Card.Text>
      There have been <strong>{count}</strong> reports about this user
    </Card.Text>
    <Button variant="primary" onClick={() => toggleModal(true, id)}>List all reports</Button>
  </Card.Body>
</Card>
);
