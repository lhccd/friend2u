"use strict";

import React from 'react';

import { ActivityHistory } from '../components/ActivityHistory';
import ActivityService from '../services/ActivityService';
import UserService from '../services/AuthService';
import { array } from 'prop-types';
export class ActivityHistoryView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createdactivities: [
            ],
            joinedactivities:
                [],
            historyactivities: [],
            userID: UserService.getCurrentUser().id
        }
        
    }

    componentDidMount() {
        console.log('loading')
        this.getActivities();
        this.getjoinedActivities();
    }

    async getActivities() {
        var today = new Date();

        try {
            let createdactivities = await ActivityService.getActivitiesByUserID(this.state.userID)
          
            var historyactivities = new Array()
            for (var i = 0; i < createdactivities.length; i++) {
                var activityDate = new Date(createdactivities[i].dateTime)
                if ((activityDate - today) < 0) {
                    if (createdactivities.includes(createdactivities[i])) {
                        createdactivities.splice(createdactivities.indexOf(createdactivities[i]), 1)
                    }
                    if ((activityDate - today) < 0 && (createdactivities[i].selPerson != undefined)) {
                        historyactivities.push(createdactivities[i])
                    }
                }
            }
            this.setState({ createdactivities: createdactivities })
            this.setState({ historyactivities: historyactivities })
        }
        catch (err) {
            console.error(err);
            this.setState({
                error: err
            });
        }
    }
    
    async getjoinedActivities() {
        try {
            let joinedactivitiesIDs = await ActivityService.getjoinedActivitiesID(this.state.userID)
            var joinedactivities = []
            var today = new Date()
            var historyactivities = this.state.historyactivities
            for (var i = 0; i < joinedactivitiesIDs.length; i++) {
                var joinedactivity = await ActivityService.getActivity(joinedactivitiesIDs[i].activityID)
                var activityDate = new Date(joinedactivity.dateTime)
                if ((activityDate - today) > 0) {
                    joinedactivities.push(joinedactivity)
                } else {
                    if (joinedactivity.selPerson == this.state.userID) {
                        historyactivities.push(joinedactivity)
                    }
                }
            }
            historyactivities = Array.from(new Set(historyactivities));
            console.log(joinedactivities)
            this.setState({ joinedactivities: joinedactivities })
            this.setState({ historyactivities: historyactivities })
        }
        catch (err) {
            console.error(err);
            this.setState({
                error: err
            });
        }
    }
    render() {
        return (
            <ActivityHistory
                createdactivities={this.state.createdactivities}
                joinedactivities={this.state.joinedactivities}
                historyactivities={this.state.historyactivities}
            />
        );
    }
}
