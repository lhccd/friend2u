"use strict";

import TokenService from './TokenService';

export default class HttpService {
    constructor() {
    }

    static apiURL() {return 'http://localhost:3000'; }
    
   static async get(url, onSuccess, onError, data) {
		console.log("get")
        let token = await TokenService.refreshToken();
        let header = {};
           
        let options = {
			method: 'GET',
		}
        
        if(token) {
            header['Authorization'] = `Bearer ${token}`
        }

		
		if(data){
			header['Content-Type'] =  'application/json';
			options.body = JSON.stringify(data)
		}
		
		options.headers = header


        fetch(url, options).then((resp) => {
			 if(!this.isResAuthenticated(resp)){
				 window.location = '/#login';
			 }
			 else return resp.json();
		 }).then((resp) => {
             if(resp.error) {
                 onError(resp);
             }
             else{
				 onSuccess(resp);
			 }
         }).catch((e) => {
             onError(e);
         });
    }
    
    
   static async put(url, data, onSuccess, onError) {
		console.log("put")
        let token = await TokenService.refreshToken();
        let header = {};
        
        let options = {
			method: 'PUT',
		}
        
        if(token) {
            header['Authorization'] = `Bearer ${token}`
        }

		
		if(data){
			header['Content-Type'] =  'application/json';
			options.body = JSON.stringify(data)
		}
		
		options.headers = header
	

        fetch(url, options).then((resp) => {
			 if(!this.isResAuthenticated(resp)){
				 window.location = '/#login';
			 }
			 else return resp.json();
		 }).then((resp) => {
             if(resp.error) {
                 onError(resp.error);
             }
             else onSuccess(resp);
         }).catch((e) => {
             onError(e.message);
         });
    }
    
    
    static async post(url, data, onSuccess, onError) {
		console.log("post")
        let token = await TokenService.refreshToken();
        let header = {};
        
        let options = {
			method: 'POST',
		}
        
        if(token) {
            header['Authorization'] = `Bearer ${token}`
        }

		
		if(data){
			header['Content-Type'] =  'application/json';
			options.body = JSON.stringify(data)
		}
		
		options.headers = header
		

        fetch(url, options).then((resp) => {
			 if(!this.isResAuthenticated(resp)){
				 window.location = '/#login';
			 }
			 else return resp.json();
		 }).then((resp) => {
             if(resp.error) {
				 console.log(resp.message)
                 onError(resp.error);
             }
             else onSuccess(resp);
         }).catch((e) => {
             onError(e.message);
         });
    }
    
    static async postImage(url, file, onSuccess, onError) {
		console.log("post image")
        let token = await TokenService.refreshToken();
        let header = {};
        
        if(token) {
            header['Authorization'] = `Bearer ${token}`
        }
        
        let formData = new FormData();
        
        formData.append('image', file);
        
        let options = {
			method: 'POST',
			body: formData
		}
        
        /*if(token) {
            header['Authorization'] = `Bearer ${token}`
        }*/

		console.log(url)
		
		options.headers = header
		

        fetch(url, options).then((resp) => {
			console.log(resp)
			 if(!this.isResAuthenticated(resp)){
				 window.location = '/#login';
			 }
			 else return resp.json();
		 }).then((resp) => {
             if(resp.error) {
				 console.log(resp.message)
                 onError(resp.error);
             }
             else onSuccess(resp);
         }).catch((e) => {
             onError(e.message);
         });
    }
    
    
    
     static async remove(url, data, onSuccess, onError) {
		console.log("delete")
        let token = await TokenService.refreshToken();
        let header = {};
        
        let options = {
			method: 'DELETE',
		}
        
        if(token) {
            header['Authorization'] = `Bearer ${token}`
        }

		
		if(data){
			header['Content-Type'] =  'application/json';
			options.body = JSON.stringify(data)
		}
		
		options.headers = header

        fetch(url, options).then((resp) => {
			 if(!this.isResAuthenticated(resp)){
				 window.location = '/#login';
			 }
			 else return resp.json();
		 }).then((resp) => {
             if(resp.error) {
                 onError(resp.error);
             }
             else onSuccess(resp);
         }).catch((e) => {
             onError(e.message);
         });
    }
    
    
    
    
    static isResAuthenticated(res) {
		return res.status !== 401;
	}
	
	
	
	
	//In order to check if user is authorized we try to refresh the token (if it was expired)
    static async checkIfAuthorized(res) {
		if(res.status !== 401) return true;
		
		let message = await res.json();
		if(message.error !== 'TokenExpired') return false 
		
		let accessToken = window.localStorage['accessToken'];
		if(!accessToken) return false;
		
		let refreshToken = window.localStorage['refreshToken'];
		if(!refreshToken) return false;
		
		const url = `${this.apiURL()}/auth/token`;
		
		let header = new Headers();
		header.append('Authorization', `Bearer ${accessToken}`);
		
		try{
			let res = fetch(url, {method: 'POST', headers: header, body: JSON.stringify(refreshToken)})
			if(res.status === 200){
				res = await res.json()
				window.localStorage['accessToken'] = res.accessToken;
				return true;
			}
			else{
				return false;
			}
		}
		catch(err){
			console.log(err)
			return false
		}
	}
    

}


