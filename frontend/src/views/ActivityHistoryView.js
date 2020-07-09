"use strict";

import React from 'react';

import { ActivityHistory } from '../components/ActivityHistory';
import ActivityService from '../services/ActivityService';

export class ActivityHistoryView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: [
                {
                    "location": {
                        "type": "Point",
                        "coordinates": [
                            11.75739884,
                            47.71386555
                        ]
                    },
                    "fromAge": 30,
                    "toAge": 40,
                    "participants": [],
                    "voteForCreator": 1,
                    "voteForselPerson": 1,
                    "_id": "5f065c72ba3bdc409a8fdcef",
                    "category": "Sport",
                    "activityName": "Hiking to Neureuth",
                    "dateTime": "2020-11-06T17:00:00.000Z",
                    "approxTime": false,
                    "duration": 20,
                    "prefGender": "Male",
                    "description": "Lorem ipsum",
                    "price": 1,
                    "phyCondition": 4,
                    "status": 0,
                    "creator": "5ee6a3d39df02f51788dc338",
                    "createdAt": "2020-07-08T23:53:22.564Z",
                    "updatedAt": "2020-07-08T23:53:22.564Z"
                }
            ]
        }
    }

    componentDidMount() {
        this.getActivities();
      }
    async getActivities(){
		try{
            let activities = await ActivityService.getActivities()
            console.log(activities)
			this.setState({activities:activities})
		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
		}
	}


    render() {
        const {activities} = this.state
        console.log(this.state.activities)
        return (
        <ActivityHistory
        activities={activities}/>
        );
    }
}
