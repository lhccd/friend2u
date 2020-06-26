"use strict";

import HttpService from './HttpService';

export default class ActivityService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000/activities" }

    static getActivities(){
        console.log("Yes");
        console.log(this.baseURL())
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data) {
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
    
    static deleteActivity(id) {
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
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${activity._id}`, activity, function(data) {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }

    static createActivity(activity) {
        activity.id = Math.floor((Math.random() * 100000000) + 1).toString();
        activity.posters = {
            thumbnail: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            profile: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            detailed: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg",
            original: "http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg"
        };
        return new Promise((resolve, reject) => {
            HttpService.post(ActivityService.baseURL(), activity, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}