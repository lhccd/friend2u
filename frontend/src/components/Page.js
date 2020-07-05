"use strict";

import React from 'react';
import { Container } from 'react-bootstrap';
import {Header} from './Header';
import {Footer} from './Footer';

export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    componentDidMount() {
        this.setState({
            title: document.title
        });
    }

    render() {
        return (
                <React.Fragment style={{
                    color: 'blue',
                    background: '#353a3f',
                }}>
                    <Header role={this.props.role}/>
                       {this.props.children}
                    <Footer/>
                </React.Fragment>
        );
    }
}
