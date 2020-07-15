import React, {useRef} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactCSSTransitionGroup from 'react-transition-group';
import {Button, Card, Row, Col, Form} from 'react-bootstrap';


export class LocationPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            position: {lat: 48.14137159149285, lng: 11.5969768950502},
            mapPos: {lat: 48.14137159149285, lng: 11.5969768950502},
            search: "",
            showMap: "none",
            maxDistance: "1000",
            first: true,
            error: false,
            SBText: "Find location"
        }
        this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleMapSubmit = this.handleMapSubmit.bind(this);
        this.handleMap = this.handleMap.bind(this);

        // Create some references to be able to access html-components.
        this.searchButtonRef = React.createRef();
        this.mapRef = React.createRef();
    }


    handleChange(event) {
        console.log(event.target)
        this.setState({[event.target.name]: event.target.value});
        if(event.target.name === "maxDistance") {
          this.props.onDistChange(event.target.value)
        }
    }

    handleMapSubmit(event) {
        var query = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(this.state["search"]) + "&key=AIzaSyCm-HwLhA8qvL4JPcBl9aKojPcHSKOdwY8"
        var loc = this.state.position
        console.log("Searching for: " + encodeURI(this.state["search"]))
        httpGetAsync(query, (res) => {
            var out = JSON.parse(res)
            // Should the inputtext be to unprecise, the length of the results will be 0;
            // We will notify the user about this situation.
            if(out.results.length == 0) {
              this.setState({ ["error"]: true})
              this.setState({ ["SBText"]: "Location not found"})
            } else {
              this.setState({ ["error"]: false})
              this.setState({ ["SBText"]: "Find location"})
              loc = out.results[0].geometry.location//{ lat: out.results[0].geometry.location.lat, lng: out.results[0].geometry.location.lng}
              console.log(out)
              console.log(loc)
              this.setState({["position"]: loc})
              this.setState({["mapPos"]: loc})
              this.props.onLocChange(loc)
            }
        })
        event.preventDefault();
    }


    onClick(t, map, coord) {
        const {latLng} = coord;
        const lat = Number(latLng.lat())
        const lng = Number(latLng.lng())
        const newcoords = {lat: lat, lng: lng}
        console.log("Marker set to: lat=" + newcoords.lat + "; lng=" + newcoords.lng)

        this.setState({["position"]: newcoords});
        this.props.onLocChange(newcoords)
    }


    handleMap(event) {
        //console.log(this.state.showMap)
        console.log(this.state)
        console.log(this.searchButtonRef)
        if (this.state.showMap === "none") {
            console.log("none")
            this.setState({"showMap": "block"})
            this.mapRef.current.style.display = "block"
            console.log(this.mapRef.current.style.display)
            this.searchButtonRef.current.textContent = "Hide Map"
        } else {
            console.log("block")
            this.setState({"showMap": "none"})
            this.mapRef.current.style.display = "none"
            console.log(this.mapRef.current.style.display)
            this.searchButtonRef.current.textContent = "Show Map"
        }
    }

    getLocation() {
        return this.state.position
    }

    render() {
        const mapStyle = {
            display: this.state.showMap,
            //transitionTimingFunction: 'ease-in-out',
            transition: '2s ease-in-out'
        }
        if(this.state.first && this.props.editLocation) {
          //console.log(this.props.editLocation)
          //console.log("Mhhm")
          this.state.mapPos.lng = this.props.editLocation.coordinates[0]
          this.state.mapPos.lat = this.props.editLocation.coordinates[1]
          this.state.position.lng = this.props.editLocation.coordinates[0]
          this.state.position.lat = this.props.editLocation.coordinates[1]
          this.state.first = false
        }
        return (
            <div>
                Search location by name:
                <input type="text" name="search" placeholder="Search location" value={this.state.search}
                       onChange={this.handleChange}/>
                {(this.props.distanceSelect) ? <input type="number" name="maxDistance" placeholder="Distance to search in" value={this.state.maxDistance}
                        onChange={this.handleChange}/> : ""}
                <Button onClick={this.handleMapSubmit} id="SearchButton" variant={(this.state.error)?"danger":"primary"}>{this.state.SBText}</Button>
                <div className="m-auto">
                    {/*<button type="button" name="ShowMap" ref={this.searchButtonRef} onClick={this.handleMap}>Show map</button>*/}
                    <div ref={this.mapRef} style={{height: "25rem", width: '100%' }}>
                        <Map
                            google={this.props.google}
                            // style={{width: "50rem", height: "30rem"}}
                            className={"map"}
                            zoom={14}
                            style={{ height: "30rem", float: "auto", marginRight: "2rem" }}
                            onClick={this.onClick}
                            initialCenter={this.state.mapPos}
                            center={this.state.mapPos}
                        >
                            <Marker position={this.state.position}/>
                        </Map>
                    </div>
                </div>
            </div>
        );
    }


    /*
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            markerPos: {
                "lat" : 48.1558456,
                "lng" : 11.5843351
             }
      };
    
        this.onMapClicked = this.onMapClicked.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
      }



    onMarkerClick(props, marker, e) {
        console.log(props)
        console.log(marker)
        console.log(e)
        this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    }
    
 
  onMapClicked(props, marker, e) {
      console.log(props)
      console.log(marker)
      console.log(e)
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };



    mapStyles() {
        return {
            width: '30%',
            height: '30%'
          };
    } 



    render() {
        return (
          <Map google={this.props.google} zoom={14} onClick={this.onMapClicked}>
     
            <Marker onClick={this.onMarkerClick} position={this.state.markerPos}
                    name="Marker" />
     
            <InfoWindow onClose={this.onInfoWindowClose}>
                <div>
                  <h1>{this.state.selectedPlace.name}</h1>
                </div>
            </InfoWindow>
          </Map>
        );
      }
*/
    /*
    render() {
      return (
        <Map
          google={this.props.google}
          zoom={14}
          style={this.mapStyles()}
          initialCenter={{
           lat: -1.2884,
           lng: 36.8233
          }}
        />
      );
    }

    */
}


/*
export class LocationPicker extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
      };
    
        this.onMapClicked = this.onMapClicked.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
      }

     
      onMarkerClick = (props, marker, e) =>
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
     
      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };


  render() {
    return (
      <Map google={this.props.google} zoom={14}>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

*/

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCm-HwLhA8qvL4JPcBl9aKojPcHSKOdwY8")
})(LocationPicker)


function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}