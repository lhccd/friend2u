"use strict";

import HttpService from './HttpService';

export default class ReportService {

    constructor() {
    }

    static baseURL() {return 'http://localhost:3000/moderator'; }

    static getReportList(category,limit=null,id=null) {
		let url = `${this.baseURL()}/report/${category}`
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


}
