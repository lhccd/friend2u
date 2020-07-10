"use strict";

import React from 'react';

import { ActivityCreate } from '../components/ActivityCreate';

import ActivityService from '../services/ActivityService';

import UserService from '../services/AuthService'

import {Alert} from 'react-bootstrap';


export class ActivityEditView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        console.log("The id is: "+id)

        ActivityService.getActivity(id).then((data) => {
            console.log(data)
            this.setState({
                activity: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

    }

    deleteActivity(id) {
        ActivityService.deleteActivity(id).then((message) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.log(e);
        });
    }

    updateActivity(activity) {
        console.log(activity)
        ActivityService.updateActivity(activity).then((message) => {

            console.log("Activity is forwarded: ")
            console.log(message)
        }).catch((e) => {
            console.error(e);
        });
    }



    render() {
        if (this.state.loading) {
            return (<h2>Loading the selected activity...</h2>);
        }
        if(this.state.activity.creator != UserService.getCurrentUser().id) {
            return (<Alert className="alert-danger">You are not allowed to edit this activity!</Alert>)
        }

        return (
            <ActivityCreate activity={this.state.activity} onCreate={(activity) => this.updateActivity(activity)} onDelete={(id) => this.deleteActivity(id)}/>
        );
    }
}
