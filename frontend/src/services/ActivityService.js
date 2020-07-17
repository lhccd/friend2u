"use strict";

import HttpService from './HttpService';

export default class ActivityService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000/activities" }

    static getActivities(category){
        console.log("Getting activities for: "+category);
        console.log(this.baseURL())
       return new Promise((resolve, reject) => {
           HttpService.get(`${ActivityService.baseURL()}/list/${category}`, function(data) {
               console.log(data)
               resolve(data);
           }, function(textStatus) {
               console.log(textStatus)
               reject(textStatus);
           });
       });
    }


    static getActivity(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ActivityService.baseURL()}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving the activity');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getActivitiesByUserID(userID) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ActivityService.baseURL()}/user/${userID}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving the activity');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getjoinedActivitiesID(userID) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ActivityService.baseURL()}/userjoined/${userID}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving the activity');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }


    static searchActivities(filters) {
        console.log("Activity Service - Searching with: ")
        console.log(filters)
        return new Promise((resolve, reject) => {
            HttpService.put(`${ActivityService.baseURL()}/search`, filters, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                    console.log(data.body)
                }
                else {
                    reject('Error while retrieving the activity');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
    
    static deleteActivity(id) {
        console.log("Activity wiht ID: "+id+" will be deleted!")
        return new Promise((resolve, reject) => {
            HttpService.remove(`${ActivityService.baseURL()}/${id}`, function(data) {
                if(data.message != undefined) {
                    resolve(data.message);
                }
                else {
                    reject('Error while deleting the activity');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateActivity(activity) {
        console.log("Update activity: ")
        console.log(activity)
        
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${activity._id}`, activity, function(data) {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
        
    }

    static createActivity(activity) {
        /*
        activity.posters = {
            thumbnail: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            profile: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            detailed: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            original: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg"
        };
        */
        return new Promise((resolve, reject) => {
            HttpService.post(ActivityService.baseURL(), activity, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static joinUser(activityID) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${this.baseURL()}/join/${activityID}`, function(data) {
                resolve(data)
            }, function(textStatus) {
                reject(textStatus);
            });
        })
    }

    static unJoinUser(activityID) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${this.baseURL()}/unjoin/${activityID}`, function(data) {
                resolve(data)
            }, function(textStatus) {
                reject(textStatus);
            });
        })
    }

    static chooseCompanion(participantID,activityID) {
        var status = {"newStatus":1}
        var selPer = {"selPerson": participantID}
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/setSelectedPerson/${activityID}`,selPer, function(data) {
                resolve(data)
            }, function(textStatus) {
                reject(textStatus);
            })
            HttpService.put(`${this.baseURL()}/updateStatus/${activityID}`,status, function(data) {
               resolve(data)
            }, function(textStatus) {
                reject(textStatus);
            });
        })
    }

    static getContact(participantID,creatorID,activityID) {
        var match = {"creator": creatorID, "participant":participantID}
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.baseURL()}/match/${activityID}?creator=${creatorID}&participant=${participantID}`,function(data) {
                resolve(data)
            }, function(textStatus) {
                reject(textStatus);
            })
           
        })
    }
}