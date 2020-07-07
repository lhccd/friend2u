import React from 'react';
import LocationPicker from './LocationPicker';
import { FaFutbol, FaPizzaSlice, FaHammer, FaTv, FaTools} from "react-icons/fa";
import {Button, Card, Container, Row, Col, Form, Control, Dropdown, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import logo from "../media/f2uLogo.svg";
import AuthService from "../services/AuthService";

export class ActivitySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "Other",
            activityName: "",
            fromTime: this.getCurrentTime(),
            toTime: this.getCurrentTime(),
            fromAge: "18",
            toAge: "150",
            gender: "Female",
            minPrice: "1",
            maxPrice: "5",
            lat: 48.14137159149285,
            long: 11.5969768950502,
            title: "",
            kitchen: "Italian",
            maxPhyCondition: "4",
            minPhyCondition: "1",
            maxDistance: "1000"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMapChange = this.handleMapChange.bind(this);
        this.handleRBChange = this.handleRBChange.bind(this)
        this.handleDistChange = this.handleDistChange.bind(this)

        // Creating Refs, to show the category-specific filters.
        this.sportRef = React.createRef()
        this.entertainmentRef = React.createRef()
        this.foodRef = React.createRef()
    }

    getCurrentTime() {
        var currTime = new Date().toISOString().substring(0, 16) // Cut the time before the sec.
        //console.log(currTime)
        return currTime
    }
    handleDistChange(newDist) {
        console.log("New Dist.: "+newDist)
        this.setState({ ["maxDistance"]: newDist})
    }
    
    handleRBChange(event) {
        console.log(event.target.id)
        console.log(this)
        this.setState({[event.target.name]: event.target.id});
    }

    handleChange(event) {
        //console.log(event.target.value)
        //console.log(event.target)
        // Adopt the "to_time" accordingly, as it has always to be
        // ahead of the "from_time".
        /*
        if(event.target.name === "fromTime") {
          this.setState({["toTime"]: event.target.value });
        }
        if(event.target.name === "fromAge") {
          if(parseInt(this.state["fromAge"])>parseInt(this.state["toAge"])) {
            this.setState({["toAge"]: event.target.value });
          }

        }
        if(event.target.name === "minPrice") {
          this.setState({["maxPrice"]: event.target.value });
        }
        */

        if (event.target.name === "category") {
            switch (event.target.value) {
                case "Sport": {
                    this.sportRef.current.style.display = "block"
                    this.entertainmentRef.current.style.display = "none"
                    this.foodRef.current.style.display = "none"
                    break
                }
                case "Entertainment": {
                    this.sportRef.current.style.display = "none"
                    this.entertainmentRef.current.style.display = "block"
                    this.foodRef.current.style.display = "none"
                    break
                }
                case "Food": {
                    this.sportRef.current.style.display = "none"
                    this.entertainmentRef.current.style.display = "none"
                    this.foodRef.current.style.display = "block"
                    break
                }
                default: {
                    this.sportRef.current.style.display = "none"
                    this.entertainmentRef.current.style.display = "none"
                    this.foodRef.current.style.display = "none"
                    break
                }
            }
        }

        console.log(event.target.value)
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.state)
        //alert('A name was submitted: ' + this.state.value);
        this.props.onSearch(this.state)
        event.preventDefault();


    }

    handleMapChange(event) {
        console.log("PositionChange: ")
        console.log(event)
        this.setState({
            ["lat"]: event.lat,
            ["long"]: event.lng
        })
        this.setState
    }

    render() {
        var cT = this.getCurrentTime()
        if (this.state.fromTime < cT) {
            this.setState({["fromTime"]: cT})
        }
        console.log(this.state.fromTime < cT)
        return (
            <React.Fragment>
                    <Navbar className="bg-dark justify-content-around" variant="dark" style={{fontSize: "40px"}}>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link href="#/activities/search"><FaFutbol/></Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link href="#/activities/create"><FaPizzaSlice/></Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link href="#/activityhistory"><FaTv/></Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link href="#/activityhistory"><FaTools/></Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar>

                <Container>
                    <Form.Group>
                        <Form.Control type="text" name="activityName" placeholder="Search for activityname"
                                      value={this.state.value} onChange={this.handleChange}/>
                    </Form.Group>
                </Container>

                <Container fluid>
                    <h3>Search-filters:</h3>
                    <Form>
                        <Form.Row className="justify-content-between">
                            <Form.Group as={Col}>

                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" name="category" defaultValue="Other"
                                              onChange={this.handleChange}>
                                    <option>Sport</option>
                                    <option>Entertainment</option>
                                    <option>Food</option>
                                    <option>Other</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Activityname</Form.Label>
                                <Form.Control type="text" name="activityName" placeholder="Search for activityname"
                                              value={this.state.value} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>From Time</Form.Label>
                                <Form.Control type="datetime-local" name="fromTime" value={this.state.fromTime} min={cT}
                                              max={this.state.toTime} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>To Time</Form.Label>
                                <Form.Control type="datetime-local" name="toTime" value={this.state.toTime}
                                              min={this.state.fromTime} onChange={this.handleChange}/>
                                <br/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>From Age</Form.Label>
                                <Form.Control type="number" name="fromAge" value={this.state.fromAge} min="18"
                                              max={this.state.toAge} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>To Age</Form.Label>
                                <Form.Control type="number" name="toAge" value={this.state.toAge}
                                              min={this.state.fromAge}
                                              max="150" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Preferred Gender</Form.Label>
                                <Form.Control as="select" name="gender" defaultValue="Female"
                                              onChange={this.handleChange}>
                                    <option>Female</option>
                                    <option>Male</option>
                                    <option>Other</option>
                                    <option>Does not matter</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Min Price</Form.Label>
                                <Form.Control type="number" name="minPrice" value={this.state.minPrice} min="1"
                                              max={this.state.maxPrice} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Max Price</Form.Label>
                                <Form.Control type="number" name="maxPrice" value={this.state.maxPrice}
                                              min={this.state.minPrice} max="5" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <div ref={this.sportRef} style={{display: "none"}}>
                                    <Form.Label>Select the physical condition of your companion:</Form.Label>
                                    <Form.Label>Min physical condition</Form.Label>
                                    <Form.Control type="number" name="minPhyCondition"
                                                  value={this.state.minPhyCondition}
                                                  min="1" max={this.state.maxPhyCondition}
                                                  onChange={this.handleChange}/>

                                    <Form.Label>Max physical condition</Form.Label>
                                    <Form.Control type="number" name="maxPhyCondition"
                                                  value={this.state.maxPhyCondition}
                                                  min={this.state.minPhyCondition} max="4"
                                                  onChange={this.handleChange}/>
                                </div>

                                <div ref={this.entertainmentRef} style={{display: "none"}}>
                                    <Form.Label>Title of the movie/concert/opera, which your desired activity should
                                        have</Form.Label>
                                    <Form.Control type="text" name="title" placeholder="E.g TopGun II"
                                                  value={this.state.title} onChange={this.handleChange}/>
                                </div>

                                <div ref={this.foodRef} style={{display: "none"}}>
                                    <Form.Label>Select the physical condition of your companion:</Form.Label>
                                    <Form.Check
                                        inline
                                        checked={this.state.kitchen === "Italian"}
                                        label="Italian"
                                        type="radio"
                                        name="kitchen"
                                        id="Italian"
                                        onChange={this.handleRBChange}
                                    />
                                    <Form.Check
                                        inline
                                        checked={this.state.kitchen === "Japanese"}
                                        label="Japanese"
                                        type="radio"
                                        name="kitchen"
                                        id="Japanese"
                                        onChange={this.handleRBChange}
                                    />
                                    <Form.Check
                                        inline
                                        checked={this.state.kitchen === "Chinese"}
                                        label="Chinese"
                                        type="radio"
                                        name="kitchen"
                                        id="Chinese"
                                        onChange={this.handleRBChange}
                                    />
                                    <Form.Check
                                        inline
                                        checked={this.state.kitchen === "German"}
                                        label="German"
                                        type="radio"
                                        name="kitchen"
                                        id="German"
                                        onChange={this.handleRBChange}
                                    />
                                    <Form.Check
                                        inline
                                        checked={this.state.kitchen === "FastFood"}
                                        label="Fast Food"
                                        type="radio"
                                        name="kitchen"
                                        id="FastFood"
                                        onChange={this.handleRBChange}
                                    />
                                    <Form.Check
                                        inline
                                        checked={this.state.kitchen === "StreetFood"}
                                        label="Street Food"
                                        type="radio"
                                        name="kitchen"
                                        id="StreetFood"
                                        onChange={this.handleRBChange}
                                    />
                                    <Form.Check
                                        inline
                                        checked={this.state.kitchen === "Other"}
                                        label="Other"
                                        type="radio"
                                        name="kitchen"
                                        id="Other"
                                        onChange={this.handleRBChange}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Filter Location</Form.Label>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Location
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Card style={{width: '45rem'}}>
                                            <LocationPicker onLocChange={this.handleMapChange} onDistChange={this.handleDistChange} distanceSelect={true}/>
                                            <Form.Label>In which radius should be searched in (in meters)?</Form.Label>
                                            <Form.Control type="number" name="minPhyCondition"
                                                          value={this.state.maxDistance} min="1" max={500000}
                                                          onChange={this.handleChange}/>
                                        </Card>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                    <br/>
                    <Button onClick={this.handleSubmit}>Search for activities</Button>
                </Container>
            </React.Fragment>
        );
    }
}