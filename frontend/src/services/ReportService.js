"use strict";

import HttpService from './HttpService';
import config from '../config'

export default class ReportService {

    constructor() {
    }

    //static baseURLModerator() {return 'http://localhost:3000/moderator'; }
    static baseURLModerator() {return `${config.backend_address}/moderator`; }
    
    //static baseURLReport() {return 'http://localhost:3000/reports'; }
    static baseURLReport() {return `${config.backend_address}/reports`; }

    static getReportList(category,id,limit,skip) {
		let url = `${this.baseURLModerator()}/report/${category}`
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
		let url = `${this.baseURLModerator()}/report/${category}/${target}`
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
		let url = `${this.baseURLModerator()}/user/block`
		
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
		let url = `${this.baseURLModerator()}/report/${category}/${id}`
		
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
    
    static createReport(category, reported, reason, description) {
		let url = `${this.baseURLReport()}`
		
		let data = { category, reported, reason, description }
		
		console.log(data)
        return new Promise((resolve, reject) => {
            HttpService.post(url, data,
				function(data) {
					resolve(data);
				}, function(textStatus) {
					console.log(textStatus)
					reject(textStatus);
            });
        });
    }


}
