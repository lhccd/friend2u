"use strict";

import React from 'react';

import { ActivityHistory } from '../components/ActivityHistory';
import ActivityService from '../services/ActivityService';
import UserService from '../services/AuthService';
export class ActivityHistoryView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createdactivities: [
            ],
            joinedactivities:
            [],
            historyCreatedactivities: [],
            historyJoinedactivities: [],
            userID: UserService.getCurrentUser().id,
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
            let created = new Array()

            for (var i = 0; i < createdactivities.length; i++) {
                var activityDate = new Date(createdactivities[i].dateTime)
                if ((activityDate - today) < 0) {
                    if (createdactivities[i].selPerson != undefined) {
                        console.log(createdactivities[i])
                        historyactivities.push(createdactivities[i])
                    } else {
                        continue;
                    }
                } else {
                    created.push(createdactivities[i])
                }
            }
            this.setState({ createdactivities: created })
            this.setState({ historyCreatedactivities: historyactivities })
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
            var historyactivities = new Array()
            var today = new Date()
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
            this.setState({ joinedactivities: joinedactivities })
            this.setState({ historyJoinedactivities: historyactivities })
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
                historyactivities={this.state.historyCreatedactivities.concat(this.state.historyJoinedactivities)}
            />
        );
    }
}
