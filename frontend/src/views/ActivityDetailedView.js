"use strict";

import React from 'react';

import { ActivityDetail } from '../components/ActivityDetail';

import ActivityService from '../services/ActivityService';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService'


export class ActivityDetailedView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading1: true,
            loading2: true
        });

        let id = this.props.match.params.id;

        console.log("The id is: "+id)

        ActivityService.getActivity(id).then((data) => {
            console.log(data)
            this.setState({
                activity: data,
                loading1: false
            });

            console.log("UserId is:"+this.state.activity.creator)
            

            UserService.getUserProfile(this.state.activity.creator).then((data) => {
                console.log(data)
                this.setState({
                    user: data,
                    loading2: false
            });
            }).catch((e) => {
                console.log(e)
            })

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

    joinUser(activityID) {
        ActivityService.joinUser(activityID).then((message) => {
            console.log("User has joined "+activityID)
        }).catch((e) => {
            console.log("Sth. went wrong with the join...")
            console.log(e)
        })
    }

    unJoinUser(activityID) {
        ActivityService.unJoinUser(activityID).then((message) => {
            console.log("User has UNjoined "+activityID)
        }).catch((e) => {
            console.log("Sth. went wrong with the UNjoin...")
            console.log(e)
        })
    }

    render() {
        if (this.state.loading1 || this.state.loading2) {
            return (<h2>Loading the selected activity...</h2>);
        }
        return (
            <ActivityDetail activity={this.state.activity} user={this.state.user} onJoin={(activityID) => this.joinUser(activityID)} onUNJoin={(activityID) => this.unJoinUser(activityID)} onDelete={(id) => this.deleteActivity(id)}/>
        );
    }
}
