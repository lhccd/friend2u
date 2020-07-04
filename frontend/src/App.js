import React, { Component } from 'react';
//import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import { UserLoginView } from "./views/UserLoginView";
import {HomepageView} from "./views/HomepageView";
import { routes } from "./routes/routes";


export default class App extends React.Component {

    constructor(props) {
        super(props);
        
        console.log('hereaaa')

        this.state = {
            title: 'Friend2U App',
            routes: routes,
               /* [
                {component: HomepageView, path:'/', exact: true},

                /!*{ component: MovieListView , path: '/', exact: true},
                { component: MovieDetailView , path: '/show/:id'},
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
                    }}, path: '/add',},*!/
                { component: UserLoginView, path: '/login'},
                //{ component: UserSignupView, path: '/register'}
            ]*/
        };
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

//export default App;
//export default App;
