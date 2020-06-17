import React from 'react';
import logo from '../f2uLogo.png';

export default class Header extends React.Component{
  render(){
    return(
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Friend2U</h1>
          <p>
            The website frontend is currently under development, use and edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
    );
  }
}
