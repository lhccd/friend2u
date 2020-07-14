"use strict";

import HttpService from './HttpService';

export default class UserService {

    constructor() {
    }

    static baseURL() {return 'http://localhost:3000/users'; }
    
    static getUserProfile(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${UserService.baseURL()}/${id}`, function(data) {
                resolve(data);
            }, function(err) {
                reject(err);
            });
        });
	}
	
    static updateUserProfile(user) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${UserService.baseURL()}`, user, function(data) {
                resolve(data);
            }, function(err) {
                reject(err);
            });
        });
	} 
    
    static uploadUserPicture(file) {
        return new Promise((resolve, reject) => {
            HttpService.postImage(`${UserService.baseURL()}/profilePicture`, file, function(data) {
                resolve(data);
            }, function(err) {
                reject(err);
            });
        });
	}
    
    

	
	
}
