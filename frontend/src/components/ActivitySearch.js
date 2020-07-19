import React from 'react';
import LocationPicker from './LocationPicker';
import {FaFutbol, FaPizzaSlice, FaHammer, FaTv, FaTools} from "react-icons/fa";
import {Button, Card, Container, Row, Col, Form, Control, Dropdown, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import logo from "../media/f2uLogo.svg";
import AuthService from "../services/AuthService";

import DatePicker from "react-datepicker";

export class ActivitySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.category,
            activityName: "",
            fromTime: new Date(), //this.getCurrentTime(false),
            toTime: new Date(),
            fromAge: "18",
            toAge: "150",
            prefGender: "Female",
            minPrice: "1",
            maxPrice: "5",
            lat: 48.14137159149285,
            long: 11.5969768950502,
            title: "",
            kitchen: "Italian",
            maxPhyCondition: "4",
            minPhyCondition: "1",
            maxDistance: "1000",
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleMapChange = this.handleMapChange.bind(this)
        this.handleRBChange = this.handleRBChange.bind(this)
        this.handleDistChange = this.handleDistChange.bind(this)
        this.handleResetFilters = this.handleResetFilters.bind(this)
        this.localTimeToUTC = this.localTimeToUTC.bind(this)
        this.categoryClick = this.categoryClick.bind(this)

        this.showDatePicker = this.showDatePicker.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)

        // Creating Refs, to show the category-specific filters.
        this.sportRef = React.createRef()
        this.entertainmentRef = React.createRef()
        this.foodRef = React.createRef()
    }

    handleChangeDate(date, t) {
        if (t === 'from') this.setState(Object.assign({}, this.state, {fromTime: date}));
        else this.setState(Object.assign({}, this.state, {toTime: date}));
    }

    showDatePicker(t) {
        const ExampleCustomTimeInput = ({value, onChange}) => (
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{border: "solid 1px pink"}}
            />
        );
        return (
            <DatePicker
                selected={t === 'from' ? this.state.fromTime : this.state.toTime}
                onChange={date => this.handleChangeDate(date, t)}
                showTimeInput
                customTimeInput={<ExampleCustomTimeInput/>}
            />
        );
    }


    getCurrentTime(plusZwei) {
        // ToTime should be one day in the future;
        // Offset privided in milliseconds.
        var toTimeOffset = 0
        if (plusZwei) toTimeOffset = 24 * 60 * 60000

        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset + toTimeOffset)).toISOString().slice(0, -1);

        console.log("Current time:")
        console.log(toTimeOffset)
        console.log(localISOTime)
        return localISOTime.substring(0, 16)
    }

    categoryClick(event) {
        console.log("CategoryClick: ")
        console.log(event.target)
        this.props.onCategoryChange(event.target.name)
        this.setState({["category"]: event.target.name})
    }

    handleResetFilters() {
        console.log("Reset was clicked in category: " + this.state.category)
        this.props.onCategoryChange(this.state.category)
    }

    handleDistChange(newDist) {
        console.log("New Dist.: " + newDist)
        this.setState({["maxDistance"]: newDist})
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
        console.log("HandleChange:")
        console.log(event.target.value)
        this.setState({[event.target.name]: event.target.value});
    }

    localTimeToUTC(oldTime) {
        var isoDateUTC = new Date(oldTime).toISOString().substring(0, 16)
        //console.log(isoDateUTC)
        return isoDateUTC
    }

    handleSubmit(event) {
        console.log(this.state)
        //alert('A name was submitted: ' + this.state.value);
        // Gender-Preferences differ slightly in frontend and backend;
        // Conversion is done here; Additionally UTC and timezone time 
        // have to be considered, also handled here.
        var tmpFromTime = this.state.fromTime
        var tmpToTime = this.state.toTime
        this.state.fromTime = this.localTimeToUTC(this.state.fromTime)
        this.state.toTime = this.localTimeToUTC(this.state.toTime)
        if (this.state.prefGender === "Does not matter") this.state.prefGender = "notdeclared"
        this.props.onSearch(this.state)
        event.preventDefault();
        this.state.fromTime = tmpFromTime
        this.state.toTime = tmpToTime
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
        var cT = this.getCurrentTime(false)
        if (this.state.fromTime < cT) {
            //this.setState({["fromTime"]: cT})
            this.state.fromTime = cT
        }
        if (this.state.fromTime > this.state.toTime) {
            this.state.toTime = this.state.fromTime
        }
        console.log(this.state.fromTime)
        console.log(this.state.fromTime < cT)
        console.log(this.state.category)
        return (
            <React.Fragment>
                <Navbar className="bg-dark justify-content-around" variant="dark" style={{fontSize: "40px"}}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Nav>
                        <Button href="#/activities/sport" name="sport" onClick={this.categoryClick}
                                className={(this.state.category === "sport") ? "btn-success btn-lg" : "btn-outline-success btn-light btn-lg"}>
                            Sport
                        </Button>
                    </Nav>
                    <Nav>
                        <Button href="#/activities/food" name="food" onClick={this.categoryClick}
                                className={(this.state.category === "food") ? "btn-danger btn-lg" : "btn-outline-danger btn-light btn-lg"}>
                            Food
                        </Button>
                    </Nav>
                    <Nav>
                        <Button href="#/activities/entertainment" name="entertainment" onClick={this.categoryClick}
                                className={(this.state.category === "entertainment") ? "btn-warning btn-lg" : "btn-outline-warning btn-light btn-lg"}>
                            Entertainment
                        </Button>
                    </Nav>
                    <Nav>
                        <Button href="#/activities/others" name="others" onClick={this.categoryClick}
                                className={(this.state.category === "others") ? "btn-primary btn-lg" : "btn-outline-primary btn-light btn-lg"}>
                            Others
                        </Button>
                    </Nav>
                </Navbar>

                <Container style={{marginTop: "5px"}}>

                </Container>

                <div style={{display: (this.props.category !== "all") ? "block" : "none"}}>
                    <Container fluid>
                        <h3>Search-filters:</h3>
                        <Form>
                            <Form.Group style={{marginRight: "10rem", marginLeft: "10rem"}}>
                                <Form.Control type="text" name="activityName" placeholder="Search for activityname"
                                              value={this.state.value} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Row className="justify-content-between">
                                <Form.Group as={Col} md={{span: "auto", offset: "auto"}}>
                                    <Form.Label>From Time</Form.Label><br/>
                                    {
                                        this.showDatePicker('from')
                                    }
                                </Form.Group>
                                <Form.Group as={Col} md={{span: "auto", offset: "auto"}}>
                                    <Form.Label>To Time</Form.Label><br/>
                                    {
                                        this.showDatePicker('to')
                                    }
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
                                    <Form.Control as="select" name="prefGender" defaultValue="Female"
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
                                    <Form.Label>Filter Location</Form.Label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Location
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Card style={{width: '45rem'}}>
                                                <LocationPicker onLocChange={this.handleMapChange}
                                                                onDistChange={this.handleDistChange}
                                                                distanceSelect={true}/>
                                                <Form.Label>In which radius should be searched in (in
                                                    meters)?</Form.Label>
                                                <Form.Control type="number" name="minPhyCondition"
                                                              value={this.state.maxDistance} min="1" max={500000}
                                                              onChange={this.handleChange}/>
                                            </Card>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <div ref={this.sportRef}
                                         style={{display: (this.state.category === "sport") ? "block" : "none"}}>
                                        <Form.Label>Select the physical condition of your companion: </Form.Label>
                                        <Row>
                                            <Col>
                                                <Form.Label>Min physical condition</Form.Label>
                                            </Col>
                                            <Col>
                                                <Form.Control
                                                    type="number"
                                                    name="minPhyCondition"
                                                    value={this.state.minPhyCondition}
                                                    min="1"
                                                    max={this.state.maxPhyCondition}
                                                    onChange={this.handleChange}/>
                                            </Col>
                                            <Col>
                                                <Form.Label>Max physical condition</Form.Label>
                                            </Col>
                                            <Col>
                                                <Form.Control
                                                    type="number"
                                                    name="maxPhyCondition"
                                                    value={this.state.maxPhyCondition}
                                                    min={this.state.minPhyCondition}
                                                    max="4"
                                                    onChange={this.handleChange}/>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div ref={this.entertainmentRef}
                                         style={{display: (this.state.category === "entertainment") ? "block" : "none"}}>
                                        <Form.Label>Title of the movie/concert/opera, which your desired activity should
                                            have</Form.Label>
                                        <Form.Control type="text" name="title" placeholder="E.g TopGun II"
                                                      value={this.state.title} onChange={this.handleChange}/>
                                    </div>

                                    <div ref={this.foodRef}
                                         style={{display: (this.state.category === "food") ? "block" : "none"}}>
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
                            </Form.Row>
                        </Form>
                        <br/>
                        <Button onClick={this.handleSubmit}>Search for activities</Button>
                        <Button style={{float: "right"}} onClick={this.handleResetFilters} className="btn-warning">Reset
                            filters</Button>
                    </Container>
                </div>

            </React.Fragment>
        );
    }
}


// Category selection no longer needed!
/*
<Form.Label>Category</Form.Label>
                                <Form.Control as="select" name="category" defaultValue="Other"
                                              onChange={this.handleChange}>
                                    <option>Sport</option>
                                    <option>Entertainment</option>
                                    <option>Food</option>
                                    <option>Other</option>
                                </Form.Control>
                                */


/*
<Nav.Item name="food" onClick={this.categoryClick}>
                                <Nav.Link href="#/activities/food"><FaPizzaSlice/></Nav.Link>
                            </Nav.Item>

<Nav.Item>
    <Nav.Link href="#/activities/entertainment"><FaTv name="entertainment" onClick={this.categoryClick}/></Nav.Link>
</Nav.Item>

<Nav.Item>
    <Nav.Link href="#/activities/other"><FaTools name="other" onClick={this.categoryClick}/></Nav.Link>
</Nav.Item>
*/
