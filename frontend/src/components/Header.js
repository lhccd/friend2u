import React from 'react';
import logo from '../f2uLogo.png';
import {Link} from 'react-router-dom';
import '../css/Header.css';
import {NavBar, Nav, NavItem} from 'react-bootstrap';


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
            /*<div className='navbar navbar-default'>
                <ul>
                    <li class="navbar-brand">
                        {/!*<img src={Logo} alt="website logo"/>*!/}
                        <img src={logo} alt="Logo" style="width:40px"/>
                        <Link to="/" ></Link>
                    </li>

                    <li>
                        <Link to={"/search"} >Search</Link>
                    </li>
                    <li>
                        <Link to={"/create"} >Create</Link>
                    </li>
                    <li>
                        <Link to={"/activityhistory"}>My Activity History</Link>
                    </li>
                    <li className="navbar-right">
                        <Link to={"/myaccount"}>My Account</Link>
                    </li>
                </ul>
            </div>*/
    )
    }
        /*render(){
            return(
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to Friend2U</h1>
                </header>
            );
        }*/

    // render() {
        //     return(
        //         <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        //             <div className="collpase navbar-collapse">
        //                 <ul className="navbar-nav mr-auto">
        //                     <li className="navbar-item">
        //                         <Link to="/create" className="nav-link">Create</Link>
        //                     </li>
        //                     <li className={"navbar-item"}>
        //                         <Link to={"/search"} className={"nav-link"}>Create User</Link>
        //                     </li>
        //                     <li className={"navbar-item"}>
        //                         <Link to={"/activityhistory"} className={"nav-link"}>Create User</Link>
        //                     </li>
        //                     <li className={"navbar-item"}>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </nav>
        //     );
        // }
    }
