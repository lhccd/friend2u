import React from 'react';

export class Footer extends React.Component{

    constructor(props) {
        super(props);
    }

  render(){
 /*   return(
        <footer className="App-footer">
			footer
        </footer>
    );*/
      return (
          <div className={this.props.className}>
              <hr/>
              <p>© {new Date().getFullYear()} Friend2U. All rights reserved.</p>
          </div>
      );
  }
}
