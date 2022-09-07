import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div style={{color: 'red'}}>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 36.80278,
      lng: 10.17972,
    },
    zoom: 15,
  };

  render() {
    return (
      <div
        style={{
          height: "50vh",
        }}
      >
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          
        >
          <AnyReactComponent lat={36.80278} lng={10.17972} text="" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
