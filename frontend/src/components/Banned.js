"use strict";

import React from 'react';

import AuthService from '../services/AuthService';

export class Banned extends React.Component{
	constructor(props){
		super(props)
		this.state = {}
		
	}
	
  render(){
    return(
        <div>
			It seems you have been banned but maybe there was a mistake. Please click <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'> here </a> to contact the admins
			 <button onClick={() => {AuthService.logout();window.location = "/#login"}} >Logout</button>
        </div>
    );
  }
}
