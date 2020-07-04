import React from 'react';
import Styled from 'styled-components'

export class Footer extends React.Component{

    constructor(props) {
        super(props);
    }

<<<<<<< HEAD

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
=======
    render() {
        return (
            <div>
                <br/>
                <p className="text-center">© F2U - Friend to You. All rights reserved.</p>
            </div>
        );
    }
>>>>>>> lorenz
}


