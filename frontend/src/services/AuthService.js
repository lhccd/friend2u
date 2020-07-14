"use strict";

import HttpService from './HttpService';
import TokenService from './TokenService';

export default class AuthService {

    constructor() {
    }

    static baseURL() {return 'http://localhost:3000/auth'; }
    static userURL() {return "http://localhost:3000/users" }
    static userServicebaseURL() { return 'http://localhost:3000/users' }

    static register(user) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${AuthService.baseURL()}/register`, {
                username: user.username,
                password: user.password,
                email: user.email,
                birthday: user.birthday,
                name: user.name,
                surname: user.surname,
                gender: user.gender,
                mobile: user.mobile,
            }, function(data) {
				console.log(data)
                resolve(data);
            }, function(textStatus) {
				console.log(textStatus)
                reject(textStatus);
            });
        });
    }

    static getUserInfo(userID) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${this.userServicebaseURL()}/${userID}`, function(data) {
                console.log(data)
                resolve(data);
            }, function(textStatus) {
                console.log(textStatus)
                reject(textStatus);
            });
        });
    }

    static login(user, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${AuthService.baseURL()}/login`, {
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
        let token = window.localStorage['accessToken'];
        //console.log(window.localStorage)
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
	
	static getUserBanDate(token) {
		let decodedToken = TokenService.decodeToken(token);
		console.log(decodedToken)
		if(decodedToken.banTime && this.isUserBanned(token)) return decodedToken.banTime;
		return null;
	}
	
	static isUserBanned(token) {
		let decodedToken = TokenService.decodeToken(token);
		
		return decodedToken.banTime === -1 || decodedToken.banTime >= Date.now();
	}
	

    
}
