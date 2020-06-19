import React from 'react';

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
      };
    }

    async componentDidMount() {
      try {
        let authenticated = await AuthService.isUserAuthenticated();
        if(authenticated) this.setState({authenticated: true});
        
        //Just to simulate the loading screen
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1500)
        
      } catch (err) {
        console.log(err);
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1500)
      }
    }

    render() {
      // while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      // otherwise, show the desired route
      if(this.state.authenticated) return <WrappedComponent {...this.props} />;
      
      const { history, location } = this.props;
	  
      return <Redirect to={{pathname: '/login', state: {from: location.pathname}}}/>
    }
  };
}
