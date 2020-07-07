"use strict";

import TokenService from './TokenService';

export default class HttpService {
    constructor() {
    }

    static apiURL() {return 'http://localhost:3000'; }
    
    static async get(url, onSuccess, onError) {
		console.log("get")
        let token = await TokenService.refreshToken();
        let header = new Headers();
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }

        try{
			let res = await fetch(url, {
				method: 'GET',
				headers: header,
			})
			
			
			if(!this.isResAuthenticated(res)) {
				console.log("here")
				window.location = '/#login';
                return;
			}
			
			let json = await res.json()
			
			if(json.error) {
                onError(res.error);
            }
            else{
				onSuccess(json);
			}
		}
		catch(err){
			console.log(err)
			return onError(err.message);
		}
    }
    


    static async modGet(url, data, onSuccess, onError) {
        

        let token = await TokenService.refreshToken();
        let header = new Headers();
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }
        header.append('Content-Type', 'application/json');
        
        console.log("Search is made with:")
        console.log(url)
        console.log(data)
        try {
            let res = await fetch(url, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(data),
            });

            if(!this.isResAuthenticated(res)) {
				console.log("here")
				window.location = '/#login';
                return;
			}
			
			let json = await res.json()
			
			if(json.error) {
                onError(res.error);
            }
            else{
				onSuccess(json);
			}
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
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }
        header.append('Content-Type', 'application/json');

        try{
			let res = await fetch(url, {
				method: 'POST',
				headers: header,
				body: JSON.stringify(data)
			})
			
			
			if(!this.isResAuthenticated(res)) {
				window.location = '/#login';
                return;
			}
			
			let json = await res.json()
			
			if(json.error) {
                onError(json);
            }
            else{
				onSuccess(json);
			}
		}
		catch(err){
			console.log(err)
			return onError(err.message);
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



// Old stuff.

/*
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
    //static OurapiURL() {return 'http://localhost:3000'; }
    
    // GET
    static async get(url, onSuccess, onError, data) {
		console.log("get")
        let token = await TokenService.refreshToken();
        let header = new Headers();
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }
        
        let options = {
				method: 'GET',
				headers: header,
			}
		
		if(data) options.body = JSON.stringify(data)

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
/*
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

        try{
			let res = await fetch(url, options)
			
			
			if(!this.isResAuthenticated(res)) {
				console.log("here")
				window.location = '/#login';
                return;
			}
			
			let json = await res.json()
			
			if(json.error) {
                onError(json);
            }
            else{
				onSuccess(json);
			}
		}
		catch(err){
			console.log(err)
			return onError(err.message);
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
/*        } catch(err) {
            onError(err.message);
        }
    }
    
    
    // POST
    static async post(url, data, onSuccess, onError) {
		console.log("post")
        let token = await TokenService.refreshToken();
        let header = new Headers();
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }
        header.append('Content-Type', 'application/json');

        try{
			let res = await fetch(url, {
				method: 'POST',
				headers: header,
				body: JSON.stringify(data)
			})
			
			
			if(!this.isResAuthenticated(res)) {
				window.location = '/#login';
                return;
			}
			
			let json = await res.json()
			
			if(json.error) {
                onError(json);
            }
            else{
				onSuccess(json);
			}
		}
		catch(err){
			console.log(err)
			return onError(err.message);
		}
    }

	static async post(url, data, onSuccess, onError) {
        console.log("post")
        console.log(data)
        let token = await TokenService.refreshToken();
        let header = new Headers();
        
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }
        
	
	// PUT
    static async put(url, data, onSuccess, onError) {
		console.log("put")
        let token = await TokenService.refreshToken();
        let header = new Headers();
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }
        header.append('Content-Type', 'application/json');

        try{
			let res = await fetch(url, {
				method: 'PUT',
				headers: header,
				body: JSON.stringify(data)
			})
			
			
			if(!this.isResAuthenticated(res)) {
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
/*        } catch(err) {
            onError(e.message);
        }
            else{
				onSuccess(json);
			}
		}
		catch(err){
			console.log(err)
			return onError(err.message);
		}
    }


	// DELETE
	static async remove(url, onSuccess, onError) {
		console.log("remove")
        let token = await TokenService.refreshToken();
        let header = new Headers();
        if(token) {
            header.append('Authorization', `Bearer ${token}`);
        }

        try{
			let res = await fetch(url, {
				method: 'DELETE',
				headers: header,
			})
			
			
			if(!this.isResAuthenticated(res)) {
				window.location = '/#login';
                return;
			}
			
			
			
			let json = await res.json()
			
			if(json.error) {
                onError(json);
            }
            else{
				onSuccess(json);
			}
		}
		catch(err){
			console.log(err)
			return onError(err.message);
		}
	}	
	


    
    static isResAuthenticated(res) {
		return res.status !== 401;
	}
	
	
	static checkIfAuthorized(res) {
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


*/


