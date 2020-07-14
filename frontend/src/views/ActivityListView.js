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
        
        ActivityService.getActivities().then((data) => {
            console.log('Heeeelooooo')
            this.setState({
                data: [...data],
                loading: false
            });
            
            //console.log(this.state.data)
        }).catch((e) => {
            console.error(e);
        });
        
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

    searchActivities(filters) {
        console.log("Search Activities with the following filters: ")
        console.log(filters)

        var test_filters = {
            "fromTime": "2020-10-06T13:30:00.000Z",
            "toTime": "2020-11-06T19:00:00.000Z",
            "category": "Entertainment",
            "activityName": "watch movie cinema munich",
            "fromAge": 18,
            "toAge": 32,
            "maxPrice": 5,
            "minPrice": 1,
            "title": "Top Gun",
            "gender": "NotDeclared",
            "searcherID": "5ee6a6a79df02f51788dc33c",
            "long": 11.619857,
            "lat": 48.151173,
            "maxDistance": 10000
        }
        console.log("Test_filter:")
        console.log(test_filters)

        ActivityService.searchActivities(filters)
        .then((data) => {
            console.log("Returned data")
            console.log(data)
        
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
        /*
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
        */
    }

    onSort(sortBy) {
        // Sorting done thorugh included searchfunction, which needs a function returning
        // -1 if the left object should stay left or 1 if left value should go to the right.
        switch(sortBy){
            case "Activityname Ascending": {
                this.state.setState({ ["data"]: this.state.data.sort((a,b) => {
                    return (a.activityName<=b.activityName)?-1:1
                    })
                })
            }
            case "Activityname Descending": {
                this.state.setState({ ["data"]: this.state.data.sort((a,b) => {
                    return (a.activityName>=b.activityName)?-1:1
                    })
                })
            }
            case "Date Ascending": {
                this.state.setState({ ["data"]: this.state.data.sort((a,b) => {
                    return (a.dateTime<=b.dateTime)?-1:1
                    })
                })
            }
            case "Date Descending": {
                this.state.setState({ ["data"]: this.state.data.sort((a,b) => {
                    return (a.dateTime>=b.dateTime)?-1:1
                    })
                })
            }
            case "Price Ascending": {
                this.state.setState({ ["data"]: this.state.data.sort((a,b) => {
                    return (a.price<=b.price)?-1:1
                    })
                })
            }
            case "Price Descending": {
                this.state.setState({ ["data"]: this.state.data.sort((a,b) => {
                    return (a.price>=b.price)?-1:1
                    })
                })
            }
            default: {
                console.log("Sorting went not as planned!")
            }
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading... forever... Ja ne, is klar... Mh...</h2>);
        }

        console.log("What's wrong?")
        

        return (
            <div>
                <ActivitySearch onSearch={(filters) => this.searchActivities(filters)}/>
                <ActivityList data={this.state.data} onDelete={(id) => this.deleteActivity(id)} onSort={(sortBy)=>this.sortBy(sortBy)}/>
            </div>
            
        );
    }
}