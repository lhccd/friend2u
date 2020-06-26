"use strict";

export default class HttpService {
    constructor() {
    }

    static OurapiURL() {return 'http://localhost:3000'; }

    static get(url, onSuccess, onError) {
        console.log(url)
        console.log("Get_HttpService")
        let token = window.localStorage['accessToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }

        console.log(this.OurapiURL())

        fetch(url, {
             method: 'GET',
             headers: header
         }).then((resp) => {
			 return this.checkIfAuthorized(resp);
		 }).then((authorized) => {
			 if(!authorized) window.location = '/#login';
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

    static async put(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        try {
            let resp = await fetch(url, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(data)
            });

            if(this.checkIfUnauthorized(resp)) {
                window.location = '/#login';
                return;
            }
            else {
                resp = await resp.json();
            }

            if(resp.error) {
                onError(resp.error);
            }
            else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                }
                onSuccess(resp);
            }
        } catch(err) {
            onError(err.message);
        }
    }

    static async post(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        try {
            let resp = await fetch(url, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data)
            });

            if(this.checkIfUnauthorized(resp)) {
                window.location = '/#login';
                return;
            }
            else {
                resp = await resp.json();
            }

            if(resp.error) {
                onError(resp.error);
            }
            else {
                if(resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                }
                onSuccess(resp);
            }
        } catch(err) {
            onError(e.message);
        }
    }

    static async remove(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }

        try {
            let resp = await fetch(url, {
                method: 'DELETE',
                headers: header
            });

            if(this.checkIfUnauthorized(resp)) {
                window.location = '/#login';
                return;
            }
            else {
                resp = await resp.json();
            }

            if(resp.error) {
                onError(resp.error);
            }
            else {
                onSuccess(resp)
            }
        } catch(err) {
            onError(err.message);
        }
    }

    static checkIfAuthorized(res) {

        if(res.status === 401) {
            return true;
        }
        
        return false;
    }
    
    static checkIfAuthorized(res) {
		const url = this.OurapiURL() + "/auth/token";
		
		return new Promise((resolve,reject) => {
			if(res.status !== 401) resolve();
			
			let accessToken = window.localStorage['accessToken'];
			if(!accessToken) reject();
			
			let refreshToken = window.localStorage['refreshToken'];
			if(!refreshToken) reject();
			
			let header = new Headers();
            header.append('Authorization', `Bearer ${accessToken}`);
            
            let body = {refreshToken: refreshToken}
			
			fetch(url, {method: 'POST', headers: header}).then((resp) => {
				if(resp.status === 200) return resp.json()
			}).then((resp) => {
				window.localStorage['accessToken'] = resp.accessToken;
			});
		})
	}
    

}
