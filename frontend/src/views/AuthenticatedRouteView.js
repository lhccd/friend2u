"use strict";

import React from 'react';


export class AuthenticatedRouteView extends React.Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
		//let Component = this.props.component
        return <div {...this.props} />
    }
}
