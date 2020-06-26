import React, { Component } from 'react';
//import React from 'react';
//import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import { UserLoginView } from "./views/UserLoginView";
import {HomepageView} from "./views/HomepageView";
import { ActivityListView } from "./views/ActivityListView";



export default class App extends React.Component {

    constructor(props) {
        super(props);
        
        console.log('hereaaa')

        this.state = {
            title: 'Friend2U App',
            routes: [
                {component: HomepageView, path:'/', exact: true},
                { component: ActivityListView, path: '/activities', exact: true},
                /*{ component: MovieDetailView , path: '/show/:id'},
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<MovieFormView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }} , path: '/edit/:id'},
                { render: (props) => {
                    if(UserService.isAuthenticated()) {
                        return (<MovieFormView {... props} />)
                    }
                    else {
                        return (<Redirect to={'/login'}/>)
                    }}, path: '/add',},*/
                { component: UserLoginView, path: '/login'},
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
