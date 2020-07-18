"use strict";

import HttpService from './HttpService';
import config from '../config'


export default class AdminService {

    constructor() {
    }

    static baseURL() {return `${config.backend_address}/admin`; }
    
    static makeModerator(id) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/moderator/make`, {user: id}, function(data) {
                resolve(data);
            }, function(err) {
                reject(err);
            });
        });
	}
	
    static revokeModerator(id) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/moderator/revoke`, {user: id}, function(data) {
                resolve(data);
            }, function(err) {
                reject(err);
            });
        });
	} 
}
