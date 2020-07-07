"use strict";

import React from 'react';
import { Fragment } from 'react';
import { CardDeck } from 'react-bootstrap';

import { ReportListRow } from './ReportListRow';
import Page from './Page'


export const ReportList = ({reports, toggleModal, deleteReports}) => (
    <div style={{width: '100%', alignText: 'center'}}>
		{reports.map((r, idx) => <ReportListRow
									key={`reportitem-${r._id}`}
									id={r._id}
									idx={idx}
									isBanned={r.reported[0].banUntilDate?true:false}
									username={r.reported[0].username}
									count={r.count}
									toggleModal={toggleModal}
									deleteReports={deleteReports}
									removed={r.removed}
									/>
								)}
    </div>
);
