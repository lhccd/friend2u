"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import { ActivityListRow } from './ActivityListRow';
import Page from './Page'

const dataTableStyle = {
  'margin-bottom': '36px'
};

export const ActivityList = ({data, onDelete}) => (
    <React.Fragment>
        <DataTable plain style={dataTableStyle}>
            <TableHeader>
                <TableRow>
                    <TableColumn>Searchresults:</TableColumn>
                    
                    
                </TableRow>
            </TableHeader>
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