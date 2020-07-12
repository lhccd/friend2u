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
        userID: UserService.getCurrentUser().id
        }
    }

    componentDidMount() {
        this.getActivities();
        this.getjoinedActivities();
      }
    async getActivities(){
		try{
            
            let createdactivities = await ActivityService.getActivitiesByUserID(this.state.userID)
           
			this.setState({createdactivities:createdactivities})
		}
		catch(err){
            console.error(err);
            this.setState({
                error: err
            });
		}
    }
    
    async getjoinedActivities(){
		try{
            
            let joinedactivitiesIDs = await ActivityService.getjoinedActivitiesID(this.state.userID)
        
            var joinedactivities = []
            for (var i = 0; i <joinedactivitiesIDs.length; i++) {
                
              var joinedactivity = await ActivityService.getActivity(joinedactivitiesIDs[i].activityID)
              joinedactivities.push(joinedactivity)
            } 
			this.setState({joinedactivities: joinedactivities})
		}
		catch(err){
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
        joinedactivities = {this.state.joinedactivities} />
        );
    }
}
