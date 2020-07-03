import React from 'react';
import logo from '../f2uLogo.png';
import {Link} from 'react-router-dom';
import '../css/Header.css';
import {NavBar, Nav, NavItem} from 'react-bootstrap';

/*class Header extends React.Component{

    constructor(props){
        super(props);

    }

    render() {
        return (
            <Page>

            </Page>
        )
    }
}*/
export class Header extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Nav className="navbar navbar-expand-sm bg-light navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="navbar-brand" href="/">
                            <img src={logo} alt="Logo"/>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/create">Create</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/search">Search</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="/myactivityhistory">My Activity History</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="/myaccount">My Account</a>
                    </li>
                </ul>
            </Nav>

    )
    }
}
