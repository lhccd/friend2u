"use strict";

import HttpService from './HttpService';
import TokenService from './TokenService';

export default class UserService {

    constructor() {
    }

    static baseURL() {return 'http://localhost:3000/auth'; }

    static register(user) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/register`, {
                username: user.username,
                password: user.password,
                email: user.email,
                birthday: user.birthday,
                name: user.name,
                surname: user.surname,
                gender: user.gender,
                mobile: user.mobile,
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static login(user, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/login`, {
                username: user,
                password: pass
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static logout(){
        window.localStorage.removeItem('accessToken');
        window.localStorage.removeItem('refreshToken');
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id : JSON.parse(window.atob(base64)).id,
            username: JSON.parse(window.atob(base64)).username
        };
    }

	static isUserAuthenticated() {
		return new Promise((resolve,reject) => {
			TokenService.refreshToken().then((token) => {
				console.log(token)
				if(token) resolve(token)
				else resolve()
			})
			.catch((err) => {
				console.log(err)
				reject(err);
			})
		})
	}
	
	static getUserRole(token) {
		let decodedToken = TokenService.decodeToken(token);
		return decodedToken.role
	}
	
}
