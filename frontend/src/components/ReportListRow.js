"use strict";

import React from 'react';
import { Fragment } from 'react';
import { Card, Button, Text } from 'react-bootstrap';

import { FaEye } from "react-icons/fa";


const cardStyle = {
  'width': '80%',
  'margin': 50,
  'height': 200,
};

const removedStyle = {
  'width': '80%',
  'margin': 50,
  'height': 200,
  'backgroundColor': 'rgba(100, 255, 100, .3)',
};

const renderCard = ({id, isBanned, username, count, toggleModal, deleteReports, idx, removed}) => {
	return <Card style={cardStyle}>
			  <Card.Header>User</Card.Header>
			  <Card.Body>
				<Card.Title>{username}</Card.Title>
				<Card.Text>
				  There have been <strong>{count}</strong> report{count==1?'':'s'} about this user
				</Card.Text>
				<Button variant="primary" onClick={() => toggleModal(true, id, username, idx)}>List all reports</Button>
				{isBanned?<Card.Text className="text-right">
						(!) This user has already been banned! <Button variant="primary" onClick={() => deleteReports(id, username, idx)}>Delete all reports</Button>
					</Card.Text>:
					''}
			  </Card.Body>
			</Card>
}

const renderRemoved = ({username}) => {
	return <Card style={removedStyle}>
			  <Card.Header>User</Card.Header>
			  <Card.Body>
				<Card.Title>{username}</Card.Title>
				<Card.Text>
				  The reports have been correctly removed
				</Card.Text>
			  </Card.Body>
			</Card>
}

/*
export const ReportListRow = ({id, isBanned, username, count, toggleModal, deleteReports, idx, removed}) => {
	return removed?renderRemoved({username}):renderCard({id, isBanned, username, count, toggleModal, deleteReports, idx, removed})
};
* */

export const ReportListRow = ({idx, name, count, id, toggleModal}) => {
	return (
	    <tr>
		  <td>{idx+1}</td>
		  <td>{name}</td>
		  <td>{count}</td>
		  <td align={'right'}>
			<Button variant="outline-secondary" onClick={() => toggleModal(true, id, name, idx)}>
				<FaEye size={20} /> View
			</Button>
		  </td>
		</tr>
    )
};
