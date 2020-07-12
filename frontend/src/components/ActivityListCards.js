"use strict";

import React from 'react';
import { Fragment } from 'react';
import { ActivityListCard } from './ActivityListCard';

export const ActivityListCards = ({activities, mode}) => (
    <Fragment>
		{activities.map((activity) => <ActivityListCard key={`activity-${activity._id}`} activity={activity} mode = {mode}/>)}
    </Fragment>
);
