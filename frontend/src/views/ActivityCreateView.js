"use strict";

import React from 'react';

import { ActivityCreate } from '../components/ActivityCreate';

import ActivityService from '../services/ActivityService';


export class ActivityCreateView extends React.Component {

    constructor(props) {
        super(props);
    }


    createActivity(activity) {

        ActivityService.createActivity(activity).then((message) => {

            console.log("Activity is forwarded: ")
            console.log(message)
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        return (
            <div>
                <ActivityCreate onCreate={(activity) => this.createActivity(activity)}></ActivityCreate>
            </div>
            
        );
    }
}
