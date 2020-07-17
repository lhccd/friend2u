"use strict";

import React from 'react';
import Logo from '../media/f2uLogo.png';
import { Homepage } from '../components/Homepage';
import { LandingPage } from '../components/LandingPage.js';
import AuthService from "../services/AuthService";

export class HomepageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            id: null,
        }
    }

    renderHomepage(){
        return (
            <Homepage />
        );
    }

    renderLandingpage(){
        return (
            <LandingPage />
        )
    }

    render() {
        let { loading, user, notFound, serverError, id } = this.state
        console.log("working?")
        /*return (
            <Homepage></Homepage>
        );*/

        let isLoggedIn = AuthService.isUserAuthenticated();
        console.log("value of isLoggedIn:" , isLoggedIn);
        if(isLoggedIn)
            return this.renderHomepage();
        else
            return this.renderLandingpage();
    }
}
