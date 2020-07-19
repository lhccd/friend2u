"use strict";

import React from 'react';

import { ActivityList } from '../components/ActivityList';
import { ActivitySearch } from '../components/ActivitySearch';
import { ActivityListNothing } from '../components/ActivityListNothing'

import ActivityService from '../services/ActivityService';
import { FaWindows } from 'react-icons/fa';


export class ActivityListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            sortBy: "Activityname Ascending",
            category: "all"
        };

        this.sortBy = this.sortBy.bind(this)
        this.onCategoryChange = this.onCategoryChange.bind(this)
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        var category = this.props.match.params.category

        console.log("Let's try to get activites, for: "+category)

        if(category !== "sport" && category !== "entertainment" && category !== "food" && category !== "others" && category !== "all") {
            window.location = '/#/notFound'
        }

        this.setState({["category"]: category})

        if(category === "all"){
            ActivityService.getAllActivities().then((data) => {
                console.log('getting all activities')
                this.setState({
                    // Per default, the activities are sorted by their name (ascending)
                    data: data.sort((a,b) => {
                        return (a.activityName<=b.activityName)?-1:1
                    }),
                    loading: false,
                });

                //console.log(this.state.data)
            }).catch((e) => {
                console.error(e);
            });
        }else{
            ActivityService.getActivities(category).then((data) => {
                console.log('Heeeelooooo')
                this.setState({
                    // Per default, the activities are sorted by their name (ascending)
                    data: data.sort((a,b) => {
                        return (a.activityName<=b.activityName)?-1:1
                    }),
                    loading: false,
                    category: category
                });

                //console.log(this.state.data)
            }).catch((e) => {
                console.error(e);
            });

        }

    }

    onCategoryChange(category) {

        console.log("Categorychange!")

        if(category !== "sport" && category !== "entertainment" && category !== "food" && category !== "others" && category !== "all") {
            window.location = '/#/notFound'
        }

        this.setState({["category"]: category})

        if(category === "all"){
            console.log("Get all activities onChange")
            ActivityService.getAllActivities().then((data) => {
                console.log('getting all activities')
                this.setState({
                    // Per default, the activities are sorted by their name (ascending)
                    data: data.sort((a,b) => {
                        return (a.activityName<=b.activityName)?-1:1
                    }),
                    loading: false,
                });

                //console.log(this.state.data)
            }).catch((e) => {
                console.error(e);
            });
        }else{
            ActivityService.getActivities(category).then((data) => {
                console.log('Heeeelooooo')
                this.setState({
                    // Per default, the activities are sorted by their name (ascending)
                    data: data.sort((a,b) => {
                        return (a.activityName<=b.activityName)?-1:1
                    }),
                    loading: false,
                    category: category
                });

                //console.log(this.state.data)
            }).catch((e) => {
                console.error(e);
            });

        }
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

    sortBy(sortBy) {
        this.setState({ ["sortBy"]: sortBy})
        // Sorting done thorugh included searchfunction, which needs a function returning
        // -1 if the left object should stay left or 1 if left value should go to the right.
        if(sortBy==="Activityname Ascending") {
            this.setState({ ["data"]: this.state.data.sort((a,b) => {
                return (a.activityName<=b.activityName)?-1:1
                })
            })
        } 
        else if(sortBy==="Activityname Descending") {
            this.setState({ ["data"]: this.state.data.sort((a,b) => {
                return (a.activityName>=b.activityName)?-1:1
                })
            })
        }
        else if(sortBy==="Date Ascending") {
            this.setState({ ["data"]: this.state.data.sort((a,b) => {
                return (a.dateTime<=b.dateTime)?-1:1
                })
            })
        }
        else if(sortBy==="Date Descending") {
            this.setState({ ["data"]: this.state.data.sort((a,b) => {
                return (a.dateTime>=b.dateTime)?-1:1
                })
            })
        }
        else if(sortBy==="Price Ascending") {
            this.setState({ ["data"]: this.state.data.sort((a,b) => {
                return (a.price<=b.price)?-1:1
                })
            })
        }
        else if(sortBy==="Price Descending") {
            this.setState({ ["data"]: this.state.data.sort((a,b) => {
                return (a.price>=b.price)?-1:1
                })
            })
        }
        else {
                console.log("Sorting went not as planned!")
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading... forever... Ja ne, is klar... Mh...</h2>);
        }

        console.log("What's wrong?")
        

        return (
            <div>
                <ActivitySearch onCategoryChange={(category) => this.onCategoryChange(category)} category={this.state.category} onSearch={(filters) => this.searchActivities(filters)}/>
                <ActivityList data={this.state.data} onDelete={(id) => this.deleteActivity(id)} onSort={(sortBy)=>this.sortBy(sortBy)}/>
                <div style={{ display: (this.state.data.length == 0) ? "block" : "none" }}>
                    <ActivityListNothing/>
                </div>
                
            </div>
        );
    }
}
