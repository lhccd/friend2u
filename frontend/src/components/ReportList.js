"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';

import { ReportListRow } from './ReportListRow';
import Page from './Page'

const dataTableStyle = {
  'marginBottom': '36px'
};

export const ReportList = ({reports, toggleModal}) => (
    <Page>
		{reports.map((r) => <ReportListRow id={r._id} count={r.count} toggleModal={toggleModal} />)}
    </Page>
);
