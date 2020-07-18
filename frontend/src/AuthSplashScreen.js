import React from 'react';
import {Fragment} from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Banned } from './components/Banned';
import { ServerError } from './components/ServerError';
import { LoadingScreen } from './components/LoadingScreen'

import AuthService from './services/AuthService';

import { unauthenticatedRoutes } from './routes/unauthenticatedRoutes'

import { Redirect } from 'react-router-dom';

import Page from './components/Page'


import styled from "styled-components";
import {LandingPage} from "./components/LandingPage";


export default function AuthSplashScreen(WrappedComponent) {
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
			
			this.setState({ loading: false });
			
		  } catch (err) {
			console.log(err);
			this.setState({ loading: false, serverError: true });
		}
    }
    
    setRole(role) {
		this.setState({role: role})
	}
	
	
	renderAuthenticated() {        
		return (
           <Page role={this.state.role}>
               <WrappedComponent {...this.props} role={this.state.role} />
           </Page>
        )
	}

    renderBanned(date) {
		return <Banned {...this.props} date={date} />
	}

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return <LoadingScreen />;
      
      if(this.state.serverError) return <ServerError />;

      if(WrappedComponent.name === 'HomepageView' && !this.state.authenticated){
          return <LandingPage {...this.props} />
      }
      // otherwise, show the desired route
      if(unauthenticatedRoutes.includes(WrappedComponent.name)) {
		  if(this.state.authenticated) return <Redirect to={{pathname: '/'}}/>
		  else return <WrappedComponent {...this.props} setRole={(role) => this.setRole(role)} />
	  }
      else if(this.state.banDate) return this.renderBanned(this.state.banDate);
      else if(this.state.authenticated) return this.renderAuthenticated();
      
      const { history, location } = this.props;

      return <Redirect to={{pathname: '/login', state: {from: location.pathname}}}/>
    }
  };
}
