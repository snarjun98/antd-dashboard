import React from 'react';
import 'antd/dist/antd.css';
import './sidebar.css';
import { withRouter } from 'react-router-dom'
import {Card,Row,Avatar,Col,Button,Layout} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import DemoGauge from './graphs/gauge.component';
import DemoLiquid from "./graphs/liquid.component";
import MultiLine from './graphs/multiLineGraph.component';
import MapContainer from './gmaps/maps.component';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { firestore } from '../Firebase/firebase';
import heartBeat from'../tenor.gif';

const { Header, Content, Sider,Footer } = Layout;
class CattleProfile extends React.Component{


sensData=async(cattle_id)=> {
   await firestore.doc(`sensors/${cattle_id}`).get().then(
    data=>{
      this.setState({
        sensor_data:(data.data())
      })
    })
}

getResult=(currentuser,cattle_id)=> {
   firestore.doc(`cattles/${currentuser.invoiceId}`).get().then(
    data=>{
      this.setState({
        cattle_data:(data.data().cattle_data.filter(idx=>idx.id===cattle_id))[0]
      })
    })
    }  

state={
  cattle_data:[],
  sensor_data:[]
}

componentDidMount(){
  this.sensData(this.props.match.params.cattle_id);
  this.getResult(this.props.currentuser,this.props.match.params.cattle_id);
}

render(){
  // const { cattle_id } = this.props.match.params;
  const {cattle_data,sensor_data} =this.state;
  console.log(sensor_data);
return(
<Content
          className="site-layout-background"
          style={{
            padding: 28,
            margin: 0,
            minHeight: '80vh',
          }}
        >
          <h1 style={{fontSize:'16px',fontWeight:'light',paddingLeft:'10px'}} >  <b>Cattles &gt;</b> {cattle_data.name}  </h1>
          <br></br>
          {/* Start of dashBoard content */}
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
      <Col className="gutter-row" span={6} >
      {/* <div style={{textAlign:'right'}}><img src={cowPic} style={{height:'180px',width:'180px',borderRadius:'50%'}} alt='Cow Pic'/></div> */}
      <div style={{textAlign:'center',paddingBottom:'20px'}}><Avatar
    size={{
      xs: 24*2,
      sm: 32*2,
      md: 40*2,
      lg: 64*2,
      xl: 80*2,
      xxl: 100*2,
    }}
    src={cattle_data.image_url}
  />
  </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={{padding: '4px 8px',fontSize:'30px',fontWeight:'bold'}}>Cattle</div>
        <div style={{padding: '4px 8px',fontSize:'24px',fontWeight:'light'}}>{cattle_data.name} </div>
        <div style={{padding: '8px 8px'}}><Button type="primary" shape="round" icon={<UserOutlined />} size={'large'}>
          Edit Profile
        </Button></div>
      </Col>

      <Col className="gutter-row" span={6} style={{borderRight:'1px solid #e6eeee',height:'100px',top:'25px'}}>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'right'}}>Age :<b> {cattle_data.age} Years</b></div>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'right'}}>Color : <b>{cattle_data.color}</b></div>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'right'}}>Breed : <b>{cattle_data.breed}</b></div>
      </Col>
      <Col className="gutter-row" span={6} style={{top:'25px'}}>
      <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'left'}}>Gender :<b> {cattle_data.gender}</b></div>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'left'}}>Cow# :<b> {cattle_data.id}</b></div>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'left'}}>Status :<b> {sensor_data.status}</b></div>
      </Col>
    </Row>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
    <Col className="gutter-row" span={6} style={{top:'25px'}} >
      <Card title="Temperature" >
      <div style={{height:'20vh' }}> <DemoGauge temp={sensor_data.temp} /></div>
      </Card> 
      <br></br>
      <Card title="So2" >
      <div style={{height:'20vh' }}> <DemoLiquid /></div>
      </Card>
      </Col>
      <Col className="gutter-row" span={8} style={{top:'25px'}}>
      <Card title="Activity" >
     <div style={{height:'20vh' }}> <MultiLine /></div>
    </Card>
    <br></br>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
    <Col className="gutter-row" span={24} id='container' >
      <Card title="Pulse" bordered={true} >
     <div style={{height:'20vh',backgroundImage:`url(${heartBeat})`,backgroundSize:'cover',backgroundPosition:'center'}}>
       <p style={{float:'right',color:'red',fontSize:'40px',padding:'25px'}}>{sensor_data.pulse}</p>
     </div>
    </Card>
      </Col>
        </Row>
        </Col>
    <Col className="gutter-row" span={10} id='container' style={{top:'25px'}}>
      <h3 style={{padding:'16px',border:'solid #F0F0F0 1px',marginBottom:'0'}}>Map Location</h3>
        <div style={{height:'60vh'}}>
          { sensor_data.lat&&sensor_data.lon?(
                  <MapContainer lat={sensor_data.lat} lon={sensor_data.lon} />
          ):
          <p>Loading...</p>
}
        </div>
    </Col>
    </Row>
    {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{padding:'10px 0'}}>
      <Col className="gutter-row" span={24} id='container' style={{top:'25px'}} >
      <Card title="Pulse" bordered={true} >
     <div style={{height:'20vh'}}> <DemoLine /></div>
    </Card>
      </Col>
    </Row>  */}
          </Content>)}};

const mapStateToProps = createStructuredSelector({
  currentuser :selectCurrentUser
});
    
    export default withRouter(connect(mapStateToProps)(CattleProfile));