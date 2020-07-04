"use strict";

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import Page from './Page'

const dataTableStyle = {
  'marginBottom': '36px'
};

export const ReportModal = ({show, toggleModal, reports}) => (
	  <Modal show={show} onHide={() => toggleModal(false)}>
		<Modal.Header closeButton>
		  <Modal.Title>Modal heading</Modal.Title>
		</Modal.Header>
		<Modal.Body>
			{reports.map((r) => <div>{r.description} {r.reason}</div>)}
		</Modal.Body>
		<Modal.Footer>
		  <Button variant="secondary" onClick={() => toggleModal(false)}>
			Close
		  </Button>
		  <Button variant="primary" onClick={() => toggleModal(false)}>
			Save Changes
		  </Button>
		</Modal.Footer>
	   </Modal>
);
