"use strict";

import React from 'react';

import Header from './Header';
import { Footer } from './Footer';

export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    componentDidMount(){
       this.setState({
           title: document.title
       });
    }

    render() {
        return (
            <section style={this.props.style}>
                {this.props.children}
            </section>
        );
    }
}
