"use strict";

import jwt from 'jwt-decode';

export default class TokenService {
    constructor() {
    }

    static apiURL() {return 'http://localhost:3000'; }
    
    static setAccessToken(token) {
		window.localStorage['accessToken'] = token;
	}
	
    static setRefreshToken(token) {
		window.localStorage['refreshToken'] = token;
	}
	
	static setTokens(access,refresh) {
		this.setAccessToken(access);
		this.setRefreshToken(refresh);
	}
    
    static removeAccessToken() {
		window.localStorage.removeItem('accessToken');
	}
	
	static removeRefreshToken(token) {
		window.localStorage.removeItem('refreshToken');
	}
    
	static removeTokens() {
		this.removeAccessToken();
		this.removeRefreshToken();
	}
	

    static isTokenValid(token) {
		let decodedToken = jwt(token, {complete: true});
		
		let now = new Date();
		
		return decodedToken.exp*1000 >= now.getTime();
	}
	

	static async refreshToken() {
		let accessToken = window.localStorage['accessToken'];
		console.log(accessToken)
		if(!accessToken) return null;
		
		let refreshToken = window.localStorage['refreshToken'];
		console.log(refreshToken)
		if(!refreshToken) return null;
		
		if(this.isTokenValid(accessToken)) return accessToken;
		
		
		//To delete when using httponly cookie
		if(!this.isTokenValid(refreshToken)) return null;
		
		console.log("here")
		
		const url = `${this.apiURL()}/auth/refresh_token`;
		
		let header = new Headers();
		header.append('Authorization', `Bearer ${accessToken}`);
		
		header.append('Content-Type', 'application/json');
		
		const res = await fetch(url,{method: 'POST', headers: header, body: JSON.stringify({refreshToken: refreshToken})})
		.then((res) => {
			return Promise.all([res.status, res.json()])
		})
		.then(([status,data]) => {
			console.log(status)
			if(status === 200 && data.hasOwnProperty('accessToken')){
				this.setAccessToken(data.accessToken);
				return data.accessToken
			}
			else{
				console.log(data)
				//this.removeTokens();
				return null
			}
		}).catch((err) => {
			console.log(err)
			return null
		})
		
		return res;
	}

}
