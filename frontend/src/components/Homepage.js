"use strict";

import React from 'react';

import {Page} from './Page'
import Logo from '../f2uLogo.png';

export const Homepage = () => (
    <Page>
        <div>
            <h1>Welcome to Friend2U!</h1>
            <img src={Logo} alt="website logo"/>
            <h2>Friend2U is an innovative meeting platform!</h2>
            <ul>
                <li>Our platform brings exactly two people together.</li>
                <li>Have the activity your way. Create it or join it.</li>
                <li>Activities require a physical meetup in real life.</li>
                <li>Friend2U is an activity-based platform instead of communication platform.</li>
                <li>Rather a 'setup an activity and find a companion with same interests' solution</li>
            </ul>
        </div>
    </Page>
);
