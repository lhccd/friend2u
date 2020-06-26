
import React from 'react';
import MapContainer from './LocationPicker';

export class ActivitySearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        actName: "",
        fromTime: this.getCurrentTime(),
        toTime: this.getCurrentTime(),
        fromAge: "18",
        toAge: "150",
        gender: "",
        minPrice: "1",
        maxPrice: "5",
        coords: { lat: 48.14137159149285, lng: 11.5969768950502 }
    };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleMapChange = this.handleMapChange.bind(this);
    }

    getCurrentTime() {
      var currTime = new Date().toISOString().substring(0,16) // Cut the time before the sec.
      //console.log(currTime)
      return currTime
    }
  
    handleChange(event) {
      //console.log(event.target.value)
      console.log(event.target)
      // Adopt the "to_time" accordingly, as it has always to be
      // ahead of the "from_time".
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
      this.setState({ [event.target.name]: event.target.value });
    }
  
    handleSubmit(event) {
      console.log(this.state)
      //alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }

    handleMapChange(event) {
      //console.log("MapChange: "+event)
      console.log(event)
      this.setState({ ["coords"]: event})
    }

    


  
    render() {
      var cT = this.getCurrentTime()
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Activityname:
            <input type="text" name="act_name" placeholder="Search for activityname" value={this.state.value} onChange={this.handleChange} />
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
          </label>
          <input type="submit" value="Search" />
        </form>
        <MapContainer onLocChange={this.handleMapChange}/>
        </div>
      );
    }
}