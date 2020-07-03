import React from 'react';
import {Fragment} from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import AuthService from './services/AuthService';

import { Redirect } from 'react-router-dom';


//Loading mes
function LoadingMessage() {
  return (
    <div className="splash-screen">
      Wait a moment while we load your app.
      <div className="loading-dot">.</div>
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
      };
    }

    async componentDidMount() {
      try {
        let token = await AuthService.isUserAuthenticated();
        if(token){
			this.setState({authenticated: true, role: AuthService.getUserRole(token)});
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
            loading: false,
          });
        }, 1500)
      }
    }
    
    renderAuthenticated() {
		return (
			   <Fragment>
				<Header />
				<WrappedComponent {...this.props} role={this.state.role} />
				<Footer />
			   </Fragment>)
	}

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      if(this.state.authenticated) return this.renderAuthenticated();
      
      const { history, location } = this.props;
	  
      return <Redirect to={{pathname: '/login', state: {from: location.pathname}}}/>
    }
  };
}
