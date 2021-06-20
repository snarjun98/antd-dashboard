import cowMapIcon from './cow-map-icon.svg'
import cowPic from '../cowPic.jpg';
import React, { Component } from "react";
import { Layout,Card,Badge, Menu, Breadcrumb,Row,Avatar,Col,Button,Input} from 'antd';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { connect } from 'react-redux';
import {firestore} from '../../Firebase/firebase';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

export class MultiMapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    c_lat:12,
    c_lon:77,
    cattle_data:[],
    sensor_data:[],
    showingInfoWindow: false
  };
 
  componentDidMount(){
    const{currentuser}=this.props;
    navigator.geolocation.watchPosition(
      position => this.setState({ 
        c_lat: position.coords.latitude, 
        c_lon: position.coords.longitude
      }), 
      err => console.log(err)
    );
    this.sensData= firestore.collection(`sensors`).onSnapshot((querySnapshot) => {
      this.setState({
        count:querySnapshot.size
      })
      querySnapshot.docs.forEach(element => {
        this.setState({
          sensor_data: {...this.state.sensor_data,[element.id]:element.data()}
        })

      }); 
  })
  this.getResult=firestore.doc(`cattles/${currentuser.invoiceId}`).onSnapshot(
    data=>{
      this.setState({
        cattle_data:(data.data().cattle_data)
      })
    });
   
}
componentWillUnmount(){
  this.sensData();
  this.getResult();
  }

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
    var cdata=this.state.cattle_data;
    cdata.map((val,idx)=>(
     cdata[idx].sensor_data=this.state.sensor_data[val.id]
    ))
     console.log(this.state.c_lat);
    return ( 
     <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ width: '93%',
        height: '88%',
        border: 'solid #F0F0F0 1px',}}
        center={
                {
            lat: this.state.c_lat,
            lng: this.state.c_lon
          }}
        zoom={8}
      >

  {cdata.map((val,idx)=>( 
  <Marker
    key={val.id}
    name={val.name}
    data={val}
    onClick={this.onMarkerClick}
    position={{ lat: val.sensor_data.lat, lng: val.sensor_data.lon }}
    icon={{
url:cowMapIcon,
scaledSize: new this.props.google.maps.Size(37, 37)
  }}
  />
  )
)
  }      
<InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}

        >
          {this.state.selectedPlace.data?
( <div style={{height:'80px',width:'180px',overflow:'hidden'}}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{height:'80px'}} >
        <Col className="gutter-row" span={10} >
        <div style={{textAlign:'center',paddingBottom:'20px'}}>
        <Avatar
        shape="square"
    size={
      80
    }
    src={this.state.selectedPlace.data.image_url}
  />
  </div>
          </Col>
          <Col className="gutter-row" span={10} >
            
              <h3>{this.state.selectedPlace.data.name}</h3>
                <h5>Temp:{this.state.selectedPlace.data.sensor_data.temp}C</h5>
                <h5>Pluse:{this.state.selectedPlace.data.sensor_data.pulse}BPM</h5>
                <h5>Activity:{this.state.selectedPlace.data.sensor_data.activity}</h5>
                   </Col>
          </Row>
          </div>):(
            <div />
          )
  }
        </InfoWindow>
      </Map>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentuser :selectCurrentUser
});
export default  GoogleApiWrapper({
  apiKey: "AIzaSyB8Xbzc8GAtKunr7DxO4kWxS5323_AkVeE",
  version: "3.38"
})(connect(mapStateToProps)(MultiMapContainer));
