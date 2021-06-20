import cowMapIcon from './cow-map-icon.svg'
import cowPic from '../cowPic.jpg';

import React, { Component } from "react";
import { Row,Avatar,Col} from 'antd';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  render() {
    const {sensor_data,cattle_data}=this.props;

   
    if (!this.props.loaded) return <div>Loading...</div>;

    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ width: '93%',
          height: '88%',
          border: 'solid #F0F0F0 1px',}}
                  initialCenter={
          {
            lat: parseFloat(sensor_data.lat),
            lng: parseFloat(sensor_data.lon)
          }}
        zoom={20}
      >
        <Marker
          name={cattle_data.name}
          onClick={this.onMarkerClick}
          position={{  lat: parseFloat(sensor_data.lat),
          lng: parseFloat(sensor_data.lon)
        }}
          icon={{
  url:cowMapIcon,
  scaledSize: new this.props.google.maps.Size(37, 37)
}}
        />

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div style={{height:'80px',width:'180px',overflow:'hidden'}}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{height:'80px'}} >
        <Col className="gutter-row" span={10} >
        <div style={{textAlign:'center',paddingBottom:'20px'}}>
        <Avatar
        shape="square"
    size={
      80
    }
    src={cattle_data.image_url}
  />
  </div>
          </Col>
          <Col className="gutter-row" span={10} >
            
              <h3>{cattle_data.name}</h3>
                <h5>Temp:{sensor_data.temp}C </h5>
                <h5>Pluse:{sensor_data.pulse}BPM</h5>
                <h5>Activity:{sensor_data.activity}</h5>
                   </Col>
          </Row>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyB8Xbzc8GAtKunr7DxO4kWxS5323_AkVeE",
  version: "3.38"
})(MapContainer);
