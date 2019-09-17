import React from "react";
import mapboxgl from "mapbox-gl";
// import { apiKey, mapInit } from "./config";
import { apiKey } from "../../modules/Order/ApiKey.js";
import { mapInit } from "../../modules/Order/api.js";
import MapModal from '../MapModal'
import { connect } from "react-redux";
import { getAddressList, mapRequest } from "../../modules/Order";

class MapBox extends React.PureComponent {
  mapContainer = React.createRef();

  async componentDidMount() {
    this.map = await mapInit(this.mapContainer, apiKey, mapboxgl);
    this.props.mapRequest(this.map);
  }

  render() {
    const style ={
      position: 'absolute',
      height: '96%',
      width: '100%'
    };

    return (
      <React.Fragment>
        <div style={ style } ref={this.mapContainer} />
        <MapModal />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({ addressList: getAddressList(state) }),
  { mapRequest }
)(MapBox);