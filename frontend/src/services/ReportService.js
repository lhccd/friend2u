"use strict";

import HttpService from './HttpService';

export default class ReportService {

    constructor() {
    }

    static baseURL() {return 'http://localhost:3000/moderator'; }

    static getReportList(category,id,limit,skip) {
		let url = `${this.baseURL()}/report/${category}`
		if(id) url = url.concat(`/${id}`)
		
		if(limit) url = url.concat(`?limit=${limit}`)
		else url = url.concat(`?limit=20`)
		
		if(skip) url = url.concat(`&skip=${skip}`)
		else url = url.concat(`&skip=0`)
		
		console.log(url)
		
        return new Promise((resolve, reject) => {
            HttpService.get(url,
				function(data) {
					resolve(data);
				}, function(textStatus) {
					reject(textStatus);
            });
        });
    }
    
    /*
    static getReportListById(category, target, limit=null,id=null) {
		let url = `${this.baseURL()}/report/${category}/${target}`
		if(id) url = url.concat(`/${id}`)
		if(limit) url = url.concat(`?limit=${id}`)
		
        return new Promise((resolve, reject) => {
            HttpService.get(url,
				function(data) {
					resolve(data);
				}, function(textStatus) {
					reject(textStatus);
            });
        });
    }
    */
    
    static banUser(id, time) {
		let url = `${this.baseURL()}/user/block`
		
		const data = {
			banningUser: id,
		}
		
		if(time === -1) data.forever = true
		else data.time = time
		
        return new Promise((resolve, reject) => {
            HttpService.post(url,
				data,
				function(data) {
					console.log(data)
					resolve(data);
				}, function(textStatus) {
					reject(textStatus);
            });
        });
    }
    
    static deleteReportsById(category, id) {
		let url = `${this.baseURL()}/report/${category}/${id}`
		
        return new Promise((resolve, reject) => {
            HttpService.remove(url,
				function(data) {
					resolve(data);
				}, function(textStatus) {
					console.log(textStatus)
					reject(textStatus);
            });
        });
    }


}
