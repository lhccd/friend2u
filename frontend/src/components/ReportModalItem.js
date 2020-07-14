"use strict";

import React from 'react';
import { Fragment } from 'react';
import { Card, Button, Text } from 'react-bootstrap';


const dataTableStyle = {
  'marginBottom': '36px'
};

export const ReportModalItem = ({id, reason, description}) => (
  <Card
	bg={'warning'}
    style={{ width: '100%' }}
    className="mb-2"
  >
    <Card.Body>
      <Card.Title>{reason} </Card.Title>
      <Card.Text>
        {description}
      </Card.Text>
    </Card.Body>
  </Card>
);
