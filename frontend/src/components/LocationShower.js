import React, { useRef } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import ReactCSSTransitionGroup from 'react-transition-group';
 


export class LocationShower extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
              mapPos: { lat: this.props.coords[1], lng: this.props.coords[0] },
              showMap: "none",
              address: "",
              first: true
            }
        
        this.handleMap = this.handleMap.bind(this)

        // Create some references to be able to access html-components.
        this.searchButtonRef = React.createRef();
        this.mapRef = React.createRef();
      }

      async getLocation(location) {


        var query = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+location[1]+","+location[0]+"&key=AIzaSyCm-HwLhA8qvL4JPcBl9aKojPcHSKOdwY8"
        console.log("Searching for: "+encodeURI(query))

        var header = new Headers()

        try{
            let resp = await fetch(query, {
            method: 'GET',
            headers: header
           })

           var res = await resp.json()
           console.log(res.results[0].formatted_address)
           this.setState({ ["address"]: res.results[0].formatted_address })

        } catch(error) {
            console.log(error)
        }
        
    }
    

      handleChange(event) {
        console.log(event.target)
        this.setState({ [event.target.name]: event.target.value });
      }

      handleMap(event) {
        //console.log(this.state.showMap)
        //console.log(this.state)
        console.log(this.searchButtonRef)
        if(this.state.showMap === "none") {
          console.log("none")
          this.setState({ "showMap": "block"})
          this.mapRef.current.style.display = "block"
          console.log(this.mapRef.current.style.display)
          this.searchButtonRef.current.textContent = "Hide Map"
        }
        else {
          console.log("block")
          this.setState({ "showMap": "none"})
          this.mapRef.current.style.display = "none"
          console.log(this.mapRef.current.style.display)
          this.searchButtonRef.current.textContent = "Show Map"
        }
      }
    
      render() {
        const mapStyle = {
          display: this.state.showMap,
          //transitionTimingFunction: 'ease-in-out',
          transition: '2s ease-in-out'
        }

        if(this.state.first) {
          this.getLocation(this.props.coords)
          this.setState({ ["first"]: false })
        }

        console.log(this.state)
        return (
          <div>
            Address: {this.state.address}
            <div>
              <button type="button" name="ShowMap" ref={this.searchButtonRef} onClick={this.handleMap}>Show map</button>
                <div ref={this.mapRef} style={mapStyle}>
              <Map
              google={this.props.google}
              style={{ width: "50rem", height: "30rem" }}
              className={"map"}
              zoom={14}
              
              initialCenter={this.state.mapPos}
              center = {this.state.mapPos}
            >
            <Marker position={this.state.mapPos}/>
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
})(LocationShower)



function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}