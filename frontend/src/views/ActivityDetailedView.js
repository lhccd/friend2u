"use strict";

import React from 'react';

import { ActivityDetail } from '../components/ActivityDetail';

import ActivityService from '../services/ActivityService';


export class ActivityDetailedView extends React.Component {

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

    render() {
        if (this.state.loading) {
            return (<h2>Loading the selected activity...</h2>);
        }

        return (
            <ActivityDetail activity={this.state.activity} onDelete={(id) => this.deleteActivity(id)}/>
        );
    }
}
