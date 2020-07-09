"use strict";

import React from 'react';
import { TableRow, TableColumn, FontIcon, DataTable, TableHeader, TableBody } from 'react-md';
import { Link } from 'react-router-dom';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import HttpService from '../services/HttpService';
import {Card, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import thumbnail from '../media/activity_mock.jpg'

//import { SimpleLink } from './SimpleLink';

//import UserService from '../services/UserService';


export class ActivityListRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: "",
            first: true
        }

        this.setPriceSymbols = this.setPriceSymbols.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }


    async getLocation(location) {


        console.log(location)
        
        var query = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+location.coordinates[1]+","+location.coordinates[0]+"&key=AIzaSyCm-HwLhA8qvL4JPcBl9aKojPcHSKOdwY8"
        console.log("Searching for: "+encodeURI(query))

    
        var header = new Headers()
        
        try{
            let resp = await fetch(query, {
            method: 'GET',
            headers: header
           })

           var res = await resp.json()
           var out = res.results[0].formatted_address
           //console.log(out)
           //return res.results[0].formatted_address
           this.setState({ ["address"]: res.results[0].formatted_address })

        } catch(error) {
            console.log(error)
        }
        
    }

    setPriceSymbols(price) {
        console.log("Price")
        console.log(price)
        var symbols = ""
        for(var i=0; i<price; i++) {
            symbols+="€"
        }
        console.log(symbols)
        return symbols
        //this.setState({ ["price"]: symbols })
    }

    render() {
        console.log("ALW: ")
        console.log(this.props.activity)   
        
        
        if(this.state.first) {
            this.getLocation(this.props.activity.location)
            this.setState({ ["first"]: false })
        }


        // style={{ width: '18rem' }}
        return (
            
            <TableColumn key={this.props.key}>

                <Card>
                    <Card.Img variant="top" src={thumbnail} />
                    <Card.Header>{this.props.activity.category}</Card.Header>
                    <Card.Body>
                        <Card.Title>{this.props.activity.activityName}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Date&Time: {new Date(this.props.activity.dateTime).toLocaleString()}</ListGroupItem>
                            <ListGroupItem>Address: {this.state.address}</ListGroupItem>
                            <ListGroupItem>Price: {this.setPriceSymbols(this.props.activity.price)}</ListGroupItem>
                        </ListGroup>
                        <Button variant="primary">Show Details</Button>
                    </Card.Body>
                </Card>

                {/*<TableColumn>
                    
                <TableBody>
                            <TableRow>
                                <TableColumn width={250}>
                                    Category: {this.props.activity.category}
                                </TableColumn>
                                <TableColumn width={500}>
                                    Activityname: {this.props.activity.activityName}
                                </TableColumn>
                                <TableColumn width={150}>
                                    {new Date(this.props.activity.dateTime).toLocaleString()}
                                </TableColumn>
                                <TableColumn>
                                    Address: {this.state.address}
                                </TableColumn>
                                <TableColumn>
                                    <Link to={`/detail/${this.props.activity._id}`}><FontIcon>image</FontIcon></Link>
                                </TableColumn>
                                <TableColumn>
                                    Price: {this.setPriceSymbols(this.props.activity.price)}
                                </TableColumn>
                            </TableRow>
                </TableBody>
                    
                </TableColumn>*/}
               

            </TableColumn>
        );
        
        
    }
}


/*
 <TableColumn><SimpleLink to={`/show/${this.props.movie._id}`}>{this.props.movie.title}</SimpleLink></TableColumn>
                {UserService.isAuthenticated() ?
                    <TableColumn><Link to={`/edit/${this.props.movie._id}`}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
                    : <TableColumn><Link to={'/login'}><FontIcon>mode_edit</FontIcon></Link></TableColumn>
                }
                {UserService.isAuthenticated() ?
                    <TableColumn><Button onClick={() => this.props.onDelete(this.props.movie._id)} icon>delete</Button></TableColumn>
                    : <TableColumn><Link to={'/login'}><FontIcon>delete</FontIcon></Link></TableColumn>
                }
                */