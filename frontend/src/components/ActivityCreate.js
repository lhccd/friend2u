import React from 'react';
import LocationPicker from './LocationPicker';
import {Button, Card, Row, Container, Col, Form, Alert, Dropdown} from 'react-bootstrap';
import UserService from '../services/AuthService';

export class ActivityCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromAge: 18,
            toAge: 150,
            category: "Others",
            activityName: "",
            dateTime: this.getCurrentTime(),
            approxTime: false,
            duration: 0,
            prefGender: "Female",
            description: "1",
            price: "p3",
            location: {
                coordinates: [11.5969768950502, 48.14137159149285]
            },
            phyCondition: "2",
            kitchen: "Other",
            title: "",
            status: 0,
            first: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMapChange = this.handleMapChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.handleRBChange = this.handleRBChange.bind(this)
        this.handleMapChange = this.handleMapChange.bind(this)
        this.handleATChange = this.handleATChange.bind(this)

        // Refs for individual categories.
        this.sportRef = React.createRef()
        this.entertainmentRef = React.createRef()
        this.foodRef = React.createRef()
        this.submitAlertRef = React.createRef()
    }

    getCurrentTime() {
        var currTime = new Date().toISOString().substring(0, 16) // Cut the time before the sec.
        //console.log(currTime)
        return currTime
    }

    handleATChange(event) {
        console.log(event.target)
        if (this.state.approxTime) {
            this.setState({["approxTime"]: false})
        } else {
            this.setState({["approxTime"]: true})
        }
    }

    handleCategoryChange(event) {
        console.log(event.target.id)
        console.log(this)
        this.setState({[event.target.name]: event.target.id});

        // Changing input-view based upon the selected category.
        switch (event.target.id) {
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
        console.log(event.target.name)
        console.log(event.target.value)
        console.log(event.target)
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {

        //creator
        console.log("Infos about me: ")
        console.log(UserService.getCurrentUser())


        var error = false
        console.log(this.state.activityName.length)

        if (this.state.activityName.length == 0) {
            error = true
        }
        if (this.state.category === "Entertainment" && this.state.title.length == 0) {
            error = true
        }
        console.log(error)

        if (error) {
            console.log("Check your input!")
            this.submitAlertRef.current.style.display = "block"
            //event.preventDefault();
        } else {

            if (this.state.price.length > 1) {
                // Adjusted price.
                //console.log(this.state.price)
                var ap = this.state.price.substr(1, 1)
                //console.log(ap)
                this.state.price = ap
                //console.log(this.state.price)
            }

            console.log("Create the activity: ")
            console.log(this.state)
            this.props.onCreate(this.state)

            window.location = '/#/activities/search'

            //alert('A name was submitted: ' + this.state.price);

            //this.props.onSearch(this.state)
            //event.preventDefault();
        }

        event.preventDefault();


    }

    handleMapChange(event) {
        console.log("PositionChange: ")
        //console.log(event)
        this.setState({["location"]: {["coordinates"]: [event.lng, event.lat]}})
        console.log(this.state.location.coordinates)
    }


    render() {
        var cT = this.getCurrentTime()
        if(this.props.activity && this.state.first) {
            console.log("True or false, that is the question!")
            console.log(this.props.activity)
            this.state = this.props.activity
            this.state.price = "p"+this.props.activity.price
            console.log(this.getCurrentTime())
            console.log(this.props.activity.dateTime)
            this.state.dateTime = this.props.activity.dateTime.substring(0,16)
            //this.setState({ ["price"]: "p"+this.props.activity.price})
            // Show the category-specific filters; Therefore

            //console.log("PhyCond:")
            //console.log(this.state.phyCondition)
            //console.log(this.state.phyCondition.toString())
            // Physical condition is stored as number, but is here based on a string;
            // Therefore conversion is necessary.
            this.state.phyCondition = this.state.phyCondition.toString()
            
            this.state.first = false
        } else {
            console.log("The answer is false")
            console.log(this.props.activity)
        }
        return (
            <React.Fragment>
                <Container fluid>
                    <h1 className="text-center">Create Your activity</h1>
                    <Form>
                        <Form.Group>

                            <Form.Label>Activityname</Form.Label>
                            <Form.Control type="text" name="activityName" placeholder="Sth. meaningful"
                                          value={this.state.activityName} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Check
                                inline
                                checked={this.state.category === "Sport"}
                                label="Sport"
                                type="radio"
                                name="category"
                                id="Sport"
                                onChange={this.handleCategoryChange}
                            />
                            <Form.Check
                                inline
                                checked={this.state.category === "Entertainment"}
                                label="Entertainment"
                                type="radio"
                                name="category"
                                id="Entertainment"
                                onChange={this.handleCategoryChange}
                            />
                            <Form.Check
                                inline
                                checked={this.state.category === "Food"}
                                label="Food"
                                type="radio"
                                name="category"
                                id="Food"
                                onChange={this.handleCategoryChange}
                            />
                            <Form.Check
                                inline
                                checked={this.state.category === "Others"}
                                label="Others"
                                type="radio"
                                name="category"
                                id="Others"
                                onChange={this.handleCategoryChange}
                            />
                            <br/>

                            <div ref={this.sportRef} style={{display: "none"}}>
                                <Form.Label>Level of "Sportiness"</Form.Label>
                                <Form.Check
                                    inline
                                    checked={this.state.phyCondition === "1"}
                                    label="Couchpotato"
                                    type="radio"
                                    name="phyCondition"
                                    id="1"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    inline
                                    checked={this.state.phyCondition === "2"}
                                    label="Casual Athlete"
                                    type="radio"
                                    name="phyCondition"
                                    id="2"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    inline
                                    checked={this.state.phyCondition === "3"}
                                    label="Quite Sporty"
                                    type="radio"
                                    name="phyCondition"
                                    id="3"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    inline
                                    checked={this.state.phyCondition === "4"}
                                    label="Very well trained"
                                    type="radio"
                                    name="phyCondition"
                                    id="4"
                                    onChange={this.handleRBChange}
                                />
                            </div>

                            <div ref={this.entertainmentRef} style={{display: "none"}}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title"
                                              placeholder="Title of the movie/concert/opera e.g TopGun II"
                                              value={this.state.title} onChange={this.handleChange}/>
                            </div>


                            <div ref={this.foodRef} style={{display: "none"}}>
                                <Form.Label>Cuisine</Form.Label>
                                <Form.Check

                                    checked={this.state.kitchen === "Italian"}
                                    label="Italian"
                                    type="radio"
                                    name="kitchen"
                                    id="Italian"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    checked={this.state.kitchen === "Japanese"}
                                    label="Japanese"
                                    type="radio"
                                    name="kitchen"
                                    id="Japanese"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    checked={this.state.kitchen === "Chinese"}
                                    label="Chinese"
                                    type="radio"
                                    name="kitchen"
                                    id="Chinese"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    checked={this.state.kitchen === "German"}
                                    label="German"
                                    type="radio"
                                    name="kitchen"
                                    id="German"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    checked={this.state.kitchen === "FastFood"}
                                    label="Fast Food"
                                    type="radio"
                                    name="kitchen"
                                    id="FastFood"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    checked={this.state.kitchen === "StreetFood"}
                                    label="Street Food"
                                    type="radio"
                                    name="kitchen"
                                    id="StreetFood"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    checked={this.state.kitchen === "Other"}
                                    label="Other"
                                    type="radio"
                                    name="kitchen"
                                    id="Other"
                                    onChange={this.handleRBChange}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="datetime-local" name="dateTime" value={this.state.dateTime} min={cT}
                                          onChange={this.handleChange}/>

                            <Form.Check type="checkbox" name="approxTime" checked={this.state.approxTime}
                                        label="Time just roughly, we might talk about it"
                                        onChange={this.handleATChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Activity Duration</Form.Label>
                            <Form.Control type="number" name="duration" value={this.state.duration} min="1"
                                          onChange={this.handleChange}/>

                            <br/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price Range</Form.Label>
                            <Form.Check

                                checked={this.state.price === "p1"}
                                label="$"
                                type="radio"
                                name="price"
                                id="p1"
                                onChange={this.handleRBChange}
                            />
                            <Form.Check

                                checked={this.state.price === "p2"}
                                label="$$"
                                type="radio"
                                name="price"
                                id="p2"
                                onChange={this.handleRBChange}
                            />
                            <Form.Check

                                checked={this.state.price === "p3"}
                                label="$$$"
                                type="radio"
                                name="price"
                                id="p3"
                                onChange={this.handleRBChange}
                            />
                            <Form.Check

                                checked={this.state.price === "p4"}
                                label="$$$$"
                                type="radio"
                                name="price"
                                id="p4"
                                onChange={this.handleRBChange}
                            />
                            <Form.Check

                                checked={this.state.price === "p5"}
                                label="$$$$$"
                                type="radio"
                                name="price"
                                id="p5"
                                onChange={this.handleRBChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Companion Preferences</Form.Label>
                            <br/>
                            <Form.Group>
                                <Form.Label>From Age</Form.Label>
                                <Form.Control type="number" name="fromAge" value={this.state.fromAge} min="18"
                                              max={this.state.toAge} onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>To Age</Form.Label>
                                <Form.Control type="number" name="toAge" value={this.state.toAge}
                                              min={this.state.fromAge}
                                              max="150" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Preferred Gender</Form.Label>
                                <Form.Control as="select" name="gender" defaultValue="Female"
                                              onChange={this.handleChange}>
                                    <option>Female</option>
                                    <option>Male</option>
                                    <option>Other</option>
                                    <option>Does not matter</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Filter Location</Form.Label>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Location
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Card style={{width: '45rem'}}>
                                        <LocationPicker onLocChange={this.handleMapChange}/>
                                    </Card>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                        <Button onClick={this.handleSubmit}>Create Your Activity</Button>
                        <Alert ref={this.submitAlertRef} style={{display: "none"}}>
                            Please validate your input, there seems to be something wrong (especially check whether
                            every field is filled).
                        </Alert>
                    </Form>
                </Container>

                {/*<Container fluid>
                <h3>Create Activity:</h3>
                <Form>
                    <Form.Row>

                        <Form.Group as={Col}>

                            <Form.Label>Activityname</Form.Label>
                            <Form.Control type="text" name="activityName" placeholder="Sth. meaningful"
                                          value={this.state.activityName} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Category</Form.Label>
                            <Form.Check
                                 
                                checked={this.state.category === "Sport"}
                                label="Sport"
                                type="radio"
                                name="category"
                                id="Sport"
                                onChange={this.handleCategoryChange}
                            />
                            <Form.Check
                                 
                                checked={this.state.category === "Entertainment"}
                                label="Entertainment"
                                type="radio"
                                name="category"
                                id="Entertainment"
                                onChange={this.handleCategoryChange}
                            />
                            <Form.Check
                                 
                                checked={this.state.category === "Food"}
                                label="Food"
                                type="radio"
                                name="category"
                                id="Food"
                                onChange={this.handleCategoryChange}
                            />
                            <Form.Check
                                 
                                checked={this.state.category === "Others"}
                                label="Others"
                                type="radio"
                                name="category"
                                id="Others"
                                onChange={this.handleCategoryChange}
                            />
                            <br/>

                            <div ref={this.sportRef} style={{display: (this.state.category == "Sport") ? "block" : "none"}}>
                                <Form.Label>Level of "Sportiness"</Form.Label>
                                <Form.Check
                                     
                                    checked={this.state.phyCondition === "1"}
                                    label="Couchpotato"
                                    type="radio"
                                    name="phyCondition"
                                    id="1"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                     
                                    checked={this.state.phyCondition === "2"}
                                    label="Casual Athlete"
                                    type="radio"
                                    name="phyCondition"
                                    id="2"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                     
                                    checked={this.state.phyCondition === "3"}
                                    label="Quite Sporty"
                                    type="radio"
                                    name="phyCondition"
                                    id="3"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                     
                                    checked={this.state.phyCondition === "4"}
                                    label="Very well trained"
                                    type="radio"
                                    name="phyCondition"
                                    id="4"
                                    onChange={this.handleRBChange}
                                />
                            </div>

                            <div ref={this.entertainmentRef} style={{display: (this.state.category == "Entertainment") ? "block" : "none"}}>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="title" placeholder="Title of the movie/concert/opera e.g TopGun II"
                                              value={this.state.title} onChange={this.handleChange}/>
                            </div>


                            <div ref={this.foodRef} style={{display: (this.state.category == "Food") ? "block" : "none"}}>
                                <Form.Label>Cuisine</Form.Label>
                                <Form.Check

                                    checked={this.state.kitchen === "Italian"}
                                    label="Italian"
                                    type="radio"
                                    name="kitchen"
                                    id="Italian"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    checked={this.state.kitchen === "Japanese"}
                                    label="Japanese"
                                    type="radio"
                                    name="kitchen"
                                    id="Japanese"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    checked={this.state.kitchen === "Chinese"}
                                    label="Chinese"
                                    type="radio"
                                    name="kitchen"
                                    id="Chinese"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    checked={this.state.kitchen === "German"}
                                    label="German"
                                    type="radio"
                                    name="kitchen"
                                    id="German"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    checked={this.state.kitchen === "FastFood"}
                                    label="Fast Food"
                                    type="radio"
                                    name="kitchen"
                                    id="FastFood"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
                                    checked={this.state.kitchen === "StreetFood"}
                                    label="Street Food"
                                    type="radio"
                                    name="kitchen"
                                    id="StreetFood"
                                    onChange={this.handleRBChange}
                                />
                                <Form.Check
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
                            <Form.Label>Time</Form.Label>
                            <Form.Control type="datetime-local" name="dateTime" value={this.state.dateTime} min={cT}
                                          onChange={this.handleChange}/>

                            <Form.Check type="checkbox" name="approxTime" checked={this.state.approxTime}
                                        label="Time just roughly, we might talk about it"
                                        onChange={this.handleATChange}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Activity Duration</Form.Label>
                            <Form.Control type="number" name="duration" value={this.state.duration} min="1"
                                          onChange={this.handleChange}/>

                            <br/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Price Range</Form.Label>
                            <Form.Check
                                 
                                checked={this.state.price === "p1"}
                                label="$"
                                type="radio"
                                name="price"
                                id="p1"
                                onChange={this.handleRBChange}
                            />
                            <Form.Check
                                 
                                checked={this.state.price === "p2"}
                                label="$$"
                                type="radio"
                                name="price"
                                id="p2"
                                onChange={this.handleRBChange}
                            />
                            <Form.Check
                                 
                                checked={this.state.price === "p3"}
                                label="$$$"
                                type="radio"
                                name="price"
                                id="p3"
                                onChange={this.handleRBChange}
                            />
                            <Form.Check
                                 
                                checked={this.state.price === "p4"}
                                label="$$$$"
                                type="radio"
                                name="price"
                                id="p4"
                                onChange={this.handleRBChange}
                            />
                            <Form.Check
                                 
                                checked={this.state.price === "p5"}
                                label="$$$$$"
                                type="radio"
                                name="price"
                                id="p5"
                                onChange={this.handleRBChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Companion Preferences</Form.Label>
                            <br/>
                        <Form.Group as={Col}>
                            <Form.Label>From Age</Form.Label>
                            <Form.Control type="number" name="fromAge" value={this.state.fromAge} min="18"
                                          max={this.state.toAge} onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>To Age</Form.Label>
                            <Form.Control type="number" name="toAge" value={this.state.toAge} min={this.state.fromAge}
                                          max="150" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Preferred Gender</Form.Label>
                            <Form.Control as="select" name="prefGender" defaultValue="Female" onChange={this.handleChange}>
                                <option>Female</option>
                                <option>Male</option>
                                <option>Other</option>
                                <option>Does not matter</option>
                            </Form.Control>
                        </Form.Group>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Filter Location</Form.Label>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Location
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Card style={{width: '45rem'}}>
                                        <LocationPicker onLocChange={this.handleMapChange} editLocation={(this.props.activity) ? this.props.activity.location : ""}/>
                                    </Card>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                        <br/>

                    </Form.Row>
                    <Button onClick={this.handleSubmit}>{(this.props.activity) ? "Update Your Activity":"Create Your Activity"}</Button>
                    <Alert ref={this.submitAlertRef} style={{display: "none"}}>
                        Please validate your input, there seems to be something wrong (especially check whether
                        every field is filled).
                    </Alert>
                </Form>
                </Container>*/}
            </React.Fragment>
        )
    }
}


/*

var cT = this.getCurrentTime()
return (
<div>
<Form onSubmit={this.handleSubmit}>
<Form.Row>
<Form.Group as={Col}>
<Form.Label>Activityname</Form.Label>
<Form.Control type="text" name="actName" placeholder="Search for activityname" value={this.state.value} onChange={this.handleChange}/>
</Form.Group>
<Form.Group as={Col}>
<Form.Label>From</Form.Label>
<Form.Control type="datetime-local" name="fromTime" value={this.state.fromTime} min={cT} onChange={this.handleChange}/>
</Form.Group>
</Form.Row>
Activityname:
<input type="text" name="actName" placeholder="Search for activityname" value={this.state.value} onChange={this.handleChange}/>
From Time:
<input type="datetime-local" name="fromTime" value={this.state.fromTime} min={cT} onChange={this.handleChange}/>
To Time:
<input type="datetime-local" name="toTime" value={this.state.toTime} min={this.state.from_time} onChange={this.handleChange}/>
From Age:
<input type="number" name="fromAge" value={this.state.fromAge} min="18" max="150" onChange={this.handleChange}></input>
To Age:
<input type="number" name="toAge" value={this.state.toAge} min="18" max="150" onChange={this.handleChange}></input>
Min Price:
<input type="number" name="minPrice" value={this.state.minPrice} min="1" max="5" onChange={this.handleChange}></input>
Max Price:
<input type="number" name="maxPrice" value={this.state.maxPrice} min="1" max="5" onChange={this.handleChange}></input>
<input type="submit" value="Search" />
</Form>
<LocationPicker onLocChange={this.handleMapChange}/>
</div>);


*/