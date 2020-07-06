"use strict";

import TokenService from './TokenService';

export default class HttpService {
    constructor() {
    }

    static OurapiURL() {return 'http://localhost:3000'; }

    static async get(url, onSuccess, onError) {
        console.log(url)
        console.log("Get_HttpService")
        let token = window.localStorage['accessToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }

        console.log(this.OurapiURL())

        /*
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
         */

         try{
             let resp = await fetch(url, {
             method: 'GET',
             headers: header
            })

            var result = await resp.json()

            console.log(result)

            onSuccess(result)
         } catch(error) {
             console.log(error)
         }
         
    }


    static async modGet(url, data, onSuccess, onError) {
        
        console.log(data)
        console.log(JSON.stringify(data))
        let header = new Headers();
        console.log(header)
        header.append('Content-Type', 'application/json');
        
        try {
            let resp = await fetch(url, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(data),
            });

            var result = await resp.json()
            //console.log(await resp.json())

            onSuccess(result)

            /*
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
                
            }*/
        } catch(err) {
            onError(err.message);
        }
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
    
    static isResAuthenticated(res) {
		return res.status !== 401;
	}

	static async post(url, data, onSuccess, onError) {
		console.log("post")
        let token = await TokenService.refreshToken();
        let header = new Headers();
        /*
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }
        */
        header.append('Content-Type', 'application/json');

        try {
            let resp = await fetch(url, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data)
            });

            var result = await resp.json()
            //console.log(await resp.json())

            onSuccess(result)
            /*

            if(this.checkIfUnauthorized(resp)) {
                window.location = '/#login';
                return;
			}
			
			let json = await res.json()
			
			if(json.error) {
                onError(json);
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

            */
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
		return res.status !== 401;
	}

        if(res.status === 401) {
            return true;
        }
        
        return false;
    }
    
    static checkIfAuthorized(res) {
		const url = this.OurapiURL() + "/auth/token";
		
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
