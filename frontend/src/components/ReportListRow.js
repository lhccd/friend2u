"use strict";

import React from 'react';
import { Fragment } from 'react';
import { Card, Button, Text } from 'react-bootstrap';

const dataTableStyle = {
  'marginBottom': '36px'
};

export const ReportListRow = ({id, username, count, toggleModal}) => (
<Card>
  <Card.Header>User</Card.Header>
  <Card.Body>
    <Card.Title>{username}</Card.Title>
    <Card.Text>
      There have been <strong>{count}</strong> reports about this user
    </Card.Text>
    <Button variant="primary" onClick={() => toggleModal(true, id, username)}>List all reports</Button>
  </Card.Body>
</Card>
);
