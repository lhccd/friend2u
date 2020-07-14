"use strict";

import React from 'react';
import { Fragment } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaSyncAlt } from "react-icons/fa";


import { ReportListRow } from './ReportListRow';
import Page from './Page'


export const ReportList = ({category, reports, toggleModal, deleteReports, refreshReports}) => (
    <table className='table border'>
      <thead>
		<tr>
		  <th width={'16.66%'}>#</th>
		  <th width={'20%'}>{category === 'users'?'Username':'Activity name'}</th>
		  <th width={'20%'}>Count</th>
		  <td align={'right'}>
			<Button variant="light" onClick={() => refreshReports(category)}>
				<FaSyncAlt size={20} />
			</Button>
		  </td>
		</tr>
	  </thead>
		<tbody>
		{reports.list.map((r, idx) => <ReportListRow
									key={`reportitem-${r._id}`}
									id={r._id}
									idx={idx}
									//isBanned={(r.reported[0].banUntilDate && r.reported[0].banUntilDate >= Date.now())?true:false}
									name={category === 'users'?r.reported[0].username:r.reported[0].activityName}
									count={r.count}
									toggleModal={toggleModal}
									//deleteReports={deleteReports}
									removed={r.removed}
									/>
								)}
		</tbody>
    </table>
);
