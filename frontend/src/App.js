import React, { Component } from 'react';
//import React from 'react';
//import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import { UserLoginView } from "./views/UserLoginView";
import { UserSignupView } from "./views/UserSignupView";
import { ModeratorView } from "./views/ModeratorView";

import { Homepage } from "./components/Homepage";

import authSplashScreen from './authSplashScreen';


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Movie Example App',
            
            role: null,
            
            routes: [
                //{ component: Homepage , path: '/home', exact: true},
                //{ component: MovieDetailView , path: '/show/:id'},
                /*{ render: (props) => {
					authenticated = await AuthService.isUserAuthenticated()
					if(this.state.loading) return (<Homepage {... props} />)
                    else return (<Redirect to={'/login'}/>)
                  } , path: '/'},
                { render: (props) => {
                    if(UserService.isAuthenticated()) {
                        return (<MovieFormView {... props} />)
                    }
                    else {
                        return (<Redirect to={'/login'}/>)
                    }}, path: '/add',},*/
                { render: (props) => {
						return <UserLoginView {...props} setRole={(role) => this.setRole(role)} />
					},
					path: '/login'
				},
                { component: authSplashScreen(Homepage), path: '/', exact: true},
                { component: authSplashScreen(Homepage), path: '/aaa'},
                { component: Homepage, path: '/bbb'},
                { component: UserSignupView, path: '/register'},
                { component: authSplashScreen(ModeratorView), path: '/moderator'}
            ]
        };
    }
    
    setRole(role) {
		this.setState({role: role})
	}

    componentDidMount(){
        document.title = this.state.title;
    }

    render() {
        return(
			<Router>
				<Switch>
					{this.state.routes.map((route, i) => (<Route key={i} {...route}/>))}
				</Switch>
			</Router>
        );
    }
}

//export default App;
//export default App;
