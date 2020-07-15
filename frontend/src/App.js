import React, { Component } from 'react';
//import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import { UserLoginView } from "./views/UserLoginView";
import { HomepageView } from "./views/HomepageView";
import { routes } from "./routes/routes";
import { ActivityListView } from "./views/ActivityListView";
import { ActivityDetailedView } from './views/ActivityDetailedView';
import { ActivityCreateView } from './views/ActivityCreateView'



export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'Friend2U App',
            routes: routes,
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
                    {this.state.routes.map((route, i) => (<Route key={i} {...route}/>) )}
                </Switch>
            </Router>
        );
    }
}
