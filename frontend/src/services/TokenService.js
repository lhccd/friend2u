"use strict";

import jwt from 'jwt-decode';
import config from '../config'

export default class TokenService {
    constructor() {
    }

    static apiURL() {return `${config.backend_address}`; }
    
    static setAccessToken(token) {
		window.localStorage['accessToken'] = token;
	}
	
    /*static setRefreshToken(token) {
		window.localStorage['refreshToken'] = token;
	}*/
	
	static setTokens(access) {
		this.setAccessToken(access);
		//this.setRefreshToken(refresh);
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
	
	static decodeToken(token) {
		let decodedToken = jwt(token, {complete: true});
		return decodedToken;
	}
	

	static async refreshToken() {
		let accessToken = window.localStorage['accessToken'];
		if(!accessToken) return null;
		
		//let refreshToken = window.localStorage['refreshToken'];
		//if(!refreshToken) return null;
		
		if(this.isTokenValid(accessToken)) return accessToken;
		
		
		//To delete when using httponly cookie
		//if(!this.isTokenValid(refreshToken)) return null;
		
		const url = `${this.apiURL()}/auth/refresh_token`;
		
		let header = new Headers();
		header.append('Authorization', `Bearer ${accessToken}`);
		
		header.append('Content-Type', 'application/json');
		
		const res = await fetch(url,{method: 'POST',credentials: 'include', headers: header, })
		.then((res) => {
			return Promise.all([res.status, res.json()])
		})
		.then(([status,data]) => {
			if(status === 200 && data.hasOwnProperty('accessToken')){
				this.setAccessToken(data.accessToken);
				return data.accessToken
			}
			else{
				return null
			}
		}).catch((err) => {
			return null
		})
		
		return res;
	}

}
