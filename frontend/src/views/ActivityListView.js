"use strict";

import React from 'react';

import { Spinner } from 'react-bootstrap';

import { ActivityList } from '../components/ActivityList';
import { ActivitySearch } from '../components/ActivitySearch';
import { ActivityListNothing } from '../components/ActivityListNothing'
import AuthService from '../services/AuthService'

import ActivityService from '../services/ActivityService';
import { FaWindows } from 'react-icons/fa';


export class ActivityListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            sortBy: "Activityname Ascending",
            category: "all",
            myAct: []
        };

        this.sortBy = this.sortBy.bind(this)
        this.onCategoryChange = this.onCategoryChange.bind(this)
        this.myActivities = this.myActivities.bind(this)
        this.getSorted = this.getSorted.bind(this)
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

        /*
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
        */

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

    // This method does the same thing as the one above, but does not modify the state;
    // Instead it returnes the handed over sorted array.
    getSorted(arr) {
        // Sorting done thorugh included searchfunction, which needs a function returning
        // -1 if the left object should stay left or 1 if left value should go to the right.
        if(this.state.sortBy==="Activityname Ascending") {
            return arr.sort((a,b) => {
                return (a.activityName<=b.activityName)?-1:1
                })
        } 
        else if(this.state.sortBy==="Activityname Descending") {
            return arr.sort((a,b) => {
                return (a.activityName>=b.activityName)?-1:1
                })
        }
        else if(this.state.sortBy==="Date Ascending") {
            return arr.sort((a,b) => {
                return (a.dateTime<=b.dateTime)?-1:1
                })
        }
        else if(this.state.sortBy==="Date Descending") {
            return arr.sort((a,b) => {
                return (a.dateTime>=b.dateTime)?-1:1
                })
        }
        else if(this.state.sortBy==="Price Ascending") {
            return arr.sort((a,b) => {
                return (a.price<=b.price)?-1:1
                })
        }
        else if(this.state.sortBy==="Price Descending") {
            return arr.sort((a,b) => {
                return (a.price>=b.price)?-1:1
                })
        }
        else {
                console.log("Sorting went not as planned!")
        }
    }

    // The user might only want to see activities from other persons,
    // therefore we let somebody decide what to see.
    myActivities(showMyActivities) {
        if(showMyActivities) {
            console.log("true")
            this.setState({ ["data"]: this.getSorted(this.state.data.concat(this.state.myAct)) })
        } else {
            console.log("Not my acts.")
            var usrID = AuthService.getCurrentUser().id
            console.log(this.state.data.length)
            var res = []
            this.state.myAct = []
            for(var i=0; i<this.state.data.length; i++) {
                console.log(usrID)
                console.log(this.state.data[i].creator)
                if(usrID.toString() === this.state.data[i].creator.toString()) {
                    this.state.myAct =  this.state.myAct.concat([this.state.data[i]])
                } else {
                    console.log(this.state.data[i])
                    res.push(this.state.data[i])
                }
            }
            console.log(res)
            console.log(this.state.myAct)
            this.setState({ ["data"]: this.getSorted(res)})
        }
    }

    render() {
        if (this.state.loading) {
            return (<h2><Spinner animation="border" variant="success" /> Loading activities</h2>);
        }

        return (
            <div>
                <ActivitySearch onCategoryChange={(category) => this.onCategoryChange(category)} category={this.state.category} onSearch={(filters) => this.searchActivities(filters)}/>
                <ActivityList onMyActivities={(showMyActivities) => this.myActivities(showMyActivities)} data={this.state.data} onDelete={(id) => this.deleteActivity(id)} onSort={(sortBy)=>this.sortBy(sortBy)}/>
                <div style={{ display: (this.state.data.length == 0) ? "block" : "none" }}>
                    <ActivityListNothing/>
                </div>
                
            </div>
        );
    }
}
