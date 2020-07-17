"use strict";

import React from 'react';
import Logo from '../media/f2uLogo.png';
import { LandingPage } from '../components/LandingPage';

export class LandingPageView extends React.Component {

    constructor(props) {
        super(props);
        console.log(props.role)
        this.state = {
            loading: false,
            data: []
        };
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        return (
            <LandingPage/>
        );
    }
}
