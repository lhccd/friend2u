"use strict";

import React from 'react';
import { ReportActivityPage } from '../components/reports/ReportActivityPage';

export class ReportActivityView extends React.Component {

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
            <ReportActivityPage></ReportActivityPage>
        );
    }
}
