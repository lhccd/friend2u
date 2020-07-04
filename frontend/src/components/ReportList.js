"use strict";

import React from 'react';
import { Fragment } from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';

import { ReportListRow } from './ReportListRow';
import Page from './Page'

const dataTableStyle = {
  'marginBottom': '36px'
};

export const ReportList = ({reports, toggleModal}) => (
    <Fragment>
		{reports.map((r) => <ReportListRow key={`reportitem-${r._id}`} count={r.count} toggleModal={toggleModal} />)}
    </Fragment>
);
