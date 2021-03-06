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
                <React.Fragment>
                    <Header role={this.props.role}/>
                       <div
                          style={{
								minHeight: '90vh',
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
                                position: 'flexible'
						   }}
						>
							{this.props.children}
						</div>
                    <Footer/>
                </React.Fragment>
        );
    }
}
