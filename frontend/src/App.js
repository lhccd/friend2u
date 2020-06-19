import React, { Component } from 'react';
//import React from 'react';
//import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import { UserLoginView } from "./views/UserLoginView";
import { Homepage } from "./components/Homepage";

import authSplashScreen from './authSplashScreen';


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Movie Example App',

            
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
                { component: UserLoginView, path: '/login'},
                { component: authSplashScreen(Homepage), path: '/', exact: true},
                { component: authSplashScreen(Homepage), path: '/aaa'},
                { component: Homepage, path: '/bbb'},
                //{ component: UserSignupView, path: '/register'}
            ]
        };
    }

    componentDidMount(){
        document.title = this.state.title;
    }

    render() {
        return(
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>) )}
                    </Switch>
                </Router>
            </div>
        );
    }
}

//export default App;
//export default App;
