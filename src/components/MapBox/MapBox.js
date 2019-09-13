import React from "react";
import mapboxgl from "mapbox-gl";
import { apiKey, mapInit } from "./config";

class MapBox extends React.PureComponent {
  mapContainer = React.createRef();

  componentDidMount() {
    this.map = mapInit(this.mapContainer, apiKey, mapboxgl);
  }

  render() {
    const style ={
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%'
    };

    return (
      <React.Fragment>
        <div style={ style } ref={this.mapContainer} />
      </React.Fragment>
    );
  }
}

export default MapBox;