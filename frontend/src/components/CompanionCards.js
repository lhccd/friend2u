"use strict";

import React from 'react';
import { Fragment } from 'react';
import { CompanionCard } from './CompanionCard';

export const CompanionCards = ({participants, onChoose}) => (
    <Fragment>
		{participants.map((participant) => <CompanionCard key={`participant-${participant._id}`} participant= {participant} onChoose = {onChoose}/>)}
    </Fragment>
);
