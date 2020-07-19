import React, { Component } from 'react';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { routes } from "./routes/routes";



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
