"use strict";

import React from 'react';

import { ActivityList } from '../components/ActivityList';
import { ActivitySearch } from '../components/ActivitySearch';

import ActivityService from '../services/ActivityService';


export class ActivityListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        console.log("Let's try to get activites.")
        /*
        ActivityService.getActivities().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
        */
    }

    deleteActivity(id) {
        this.setState({
            data: [...this.state.data],
            loading: true
        });
        ActivityService.deleteActivity(id).then((message) => {

            let activityIndex = this.state.data.map(activity => activity['_id']).indexOf(id);
            let activities = this.state.data;
            activities.splice(activityIndex, 1);
            this.setState({
               data: [...activities],
               loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (!this.state.loading) {
            return (<h2>Loading... forever... Ja ne, is klar... Mh...</h2>);
        }

        console.log("What's wrong?")
        

        return (
            <div>
                <ActivitySearch/>
                <ActivityList data={this.state.data} onDelete={(id) => this.deleteActivity(id)}/>
            </div>
            
        );
    }
}
