// import React, { Component } from 'react';
// import { Map,InfoWindow, GoogleApiWrapper,Marker } from 'google-maps-react';
import cowMapIcon from './cow-map-icon.svg'
import cowPic from '../cowPic.jpg';
// const mapStyles = {
//   width: '93%',
//   height: '88%',
//   border: 'solid #F0F0F0 1px',
// };

// export class MapContainer extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isOpen: false,
//     };
//   }

//   handleToggleOpen = () => {
//     this.setState({
//       isOpen: true,
//     });
//   };

//   handleToggleClose = () => {
//     this.setState({
//       isOpen: false,
//     });
//   };

//   // handleMouseOver = e => {
//   //   this.setState({
//   //       showInfoWindow: true
//   //   });
//   // };
//   // handleMouseExit = e => {
//   //   this.setState({
//   //       showInfoWindow: false
//   //   });
//   // };
//   render() {
//     const {google} = this.props;

//     return (
//       <div>
//       <Map
//         google={google}
//         zoom={20}
//         style={mapStyles}
//         initialCenter={
//           {
//             lat: -1.2884,
//             lng: 36.8233
//           }
//         }
//       >
//       <Marker key="marker_1"
// onClick={() => this.handleToggleOpen()}
// position={{
//   lat: -1.2884,
//   lng: 36.8233
// }}
// icon={{
//   url:cowMapIcon,
//   scaledSize: new google.maps.Size(37, 37)
// }}
// // animation={
// //   google.maps.Animation.DROP
// // }
// // onMouseOver={this.handleMouseOver} 
// // onMouseOut={this.handleMouseExit}
// >
//                     {this.state.isOpen && (
//                       <InfoWindow onCloseClick={() => this.handleToggleClose()}>
//                         <span>Something</span>
//                       </InfoWindow>
//                     )}
  
//   </Marker></Map>
//       </div>
//     );
//   }
// }



// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyB8Xbzc8GAtKunr7DxO4kWxS5323_AkVeE'
// })(MapContainer);
import React, { Component } from "react";
import { Layout,Card,Badge, Menu, Breadcrumb,Row,Avatar,Col,Button,Input} from 'antd';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MultiMapContainer extends Component {
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
            lat: 37.788519,
            lng: -122.40564
          }}
        zoom={14}
      >
        <Marker
          name="Marker 1"
          onClick={this.onMarkerClick}
          position={{ lat: 37.778519, lng: -122.40564 }}
          icon={{
  url:cowMapIcon,
  scaledSize: new this.props.google.maps.Size(37, 37)
}}
        />
        <Marker
          name="Marker 2"
          onClick={this.onMarkerClick}
          position={{ lat: 37.788519, lng: -122.40564 }}
          icon={{
  url:cowMapIcon,
  scaledSize: new this.props.google.maps.Size(37, 37)
}}
        />
        <Marker
          name="Marker 3"
          onClick={this.onMarkerClick}
          position={{ lat: 37.798519, lng: -122.40564 }}
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
    src={cowPic}
  />
  </div>
          </Col>
          <Col className="gutter-row" span={10} >
            
              <h3>Mr.Ambba</h3>
                <h5>Temp:98F </h5>
                <h5>Pluse:98BPM</h5>
                <h5>Activity:Walking</h5>
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
})(MultiMapContainer);
