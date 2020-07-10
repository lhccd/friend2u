import React from 'react';
import {Fragment} from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import AuthService from './services/AuthService';

import { Redirect } from 'react-router-dom';

import Page from './components/Page'
import { Banned } from './components/Banned'

import styled from "styled-components";

import { Spinner } from 'react-bootstrap';


//Loading mes
function LoadingMessage() {
  return (
    <div className="splash-screen">
     <Spinner style={{ position: "fixed", top: "50%", left: "50%" }} animation="border" variant='info' role="status">
		 <span className="sr-only">Loading...</span>
	 </Spinner>
    </div>
  );
}

export default function authSplashScreen(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
 
      this.state = {
        loading: true,
        authenticated: false,
        role: null,
        componentName: WrappedComponent.name
      };
      
      this.setRole.bind(this)
    }

    async componentDidMount() {
      try {
        let token = await AuthService.isUserAuthenticated();
        if(token){
			let banDate = AuthService.getUserBanDate(token);
			console.log("banDate: " + banDate)
			if(banDate) this.setState({authenticated: true, role: AuthService.getUserRole(token), banDate: banDate});
			else this.setState({authenticated: true, role: AuthService.getUserRole(token)});
		}
        
        //Just to simulate the loading screen
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 10)
        
      } catch (err) {
        console.log(err);
        setTimeout(() => {
          this.setState({
            loading: true,
          });
        }, 1500)
      }
    }
    
    setRole(role) {
		this.setState({role: role})
	}
    
    renderAuthenticated() {
        //Trying something else
        // <Page role={this.state.role}>
        //                     <WrappedComponent {...this.props} role={this.state.role} />
        //                 </Page>
		return (
           <Page role={this.state.role}>
               <WrappedComponent {...this.props} role={this.state.role} />
           </Page>
        )
	}
	
    renderBanned(date) {
		return (
			   <Fragment>
                   <Banned {...this.props} date={date} />
			   </Fragment>)
	}

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      if(WrappedComponent.name === 'UserLoginView') {
		  if(this.state.authenticated) return <Redirect to={{pathname: '/'}}/>
		  else return <WrappedComponent {...this.props} setRole={(role) => this.setRole(role)} />
	  }
      else if(WrappedComponent.name === 'UserSignupView') {
		  if(this.state.authenticated) return <Redirect to={{pathname: '/'}}/>
		  else return <WrappedComponent {...this.props} />
	  }
      else if(this.state.banDate) return this.renderBanned(this.state.banDate);
      else if(this.state.authenticated) return this.renderAuthenticated();
      
      const { history, location } = this.props;
	  
      return <Redirect to={{pathname: '/login', state: {from: location.pathname}}}/>
    }
  };
}
