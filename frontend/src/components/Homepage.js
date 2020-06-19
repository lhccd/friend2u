"use strict";

import React from 'react';
import AuthService from '../services/AuthService';

export class Homepage extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		
	}
	
  render(){
    return(
        <div>
			Home page
			<button onClick={() => {console.log("logging out");AuthService.logout();window.location = "/#login"}}>logout</button>
        </div>
    );
  }
}
