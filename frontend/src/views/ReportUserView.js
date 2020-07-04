"use strict";

import React from 'react';
import { ReportUserPage } from '../components/reports/ReportUserPage';

export class ReportUserView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }
        console.log("working?")

        return (
            <ReportUserPage></ReportUserPage>
        );
    }
}
