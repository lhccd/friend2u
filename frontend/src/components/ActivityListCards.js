"use strict";

import React from 'react';
import { Fragment } from 'react';
import { ActivityListCard } from './ActivityListCard';

export const ActivityListCards = ({activities}) => (
    <Fragment>
		{activities.map((r) => <ActivityListCard key={`activity-${r._id}`} activityName = {r.activityName} location ={r.activityName}  date = {r.dateTime} description ={r.description}  participant = {r.participants}  />)}
    </Fragment>
);
