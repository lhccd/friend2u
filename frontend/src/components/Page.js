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
                    minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
                }}>
                    <Header role={this.props.role}/>
                       <div style={{
								minHeight: '90vh',
								display: 'flex',
								flexDirection: 'column',
						   }}
						>
							{this.props.children}
						</div>
                    <Footer/>
                </React.Fragment>
        );
    }
}
