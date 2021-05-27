import React from 'react';
import 'antd/dist/antd.css';
import './sidebar.css';
import cowPic from './cowPic.jpg';
import {Card,Row,Avatar,Col,Button,Layout} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import DemoLine from './graphs/linegraphs.component';
import DemoGauge from './graphs/gauge.component';
import DemoLiquid from "./graphs/liquid.component";
import MultiLine from './graphs/multiLineGraph.component';
import MapContainer from './gmaps/maps.component';

const { Header, Content, Sider,Footer } = Layout;
const CattleProfile=()=>(
<Content
          className="site-layout-background"
          style={{
            padding: 28,
            margin: 0,
            minHeight: '80vh',
          }}
        >
          <h1 style={{fontSize:'16px',fontWeight:'light',paddingLeft:'10px'}} >  <b>Cattles &gt;</b> Mr.Ambba Cow  </h1>
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
    src={cowPic}
  />
  </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={{padding: '4px 8px',fontSize:'30px',fontWeight:'bold'}}>Cattle</div>
        <div style={{padding: '4px 8px',fontSize:'24px',fontWeight:'light'}}>Mr.Ambba Cow</div>
        <div style={{padding: '8px 8px'}}><Button type="primary" shape="round" icon={<UserOutlined />} size={'large'}>
          Edit Profile
        </Button></div>
      </Col>

      <Col className="gutter-row" span={6} style={{borderRight:'1px solid #e6eeee',height:'100px',top:'25px'}}>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'right'}}>Age :<b> 10 Years</b></div>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'right'}}>Color : <b>White</b></div>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'right'}}>Breed : <b>Ongole</b></div>
      </Col>
      <Col className="gutter-row" span={6} style={{top:'25px'}}>
      <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'left'}}>Gender :<b> Male</b></div>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'left'}}>Cow# :<b> 1231</b></div>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'left'}}>Status :<b> Healthy</b></div>
      </Col>
    </Row>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
    <Col className="gutter-row" span={6} style={{top:'25px'}} >
      <Card title="Temperature" >
      <div style={{height:'20vh' }}> <DemoGauge /></div>
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
    <Col className="gutter-row" span={24} id='container' style={{top:'25px'}} >
      <Card title="Pulse" bordered={true} >
     <div style={{height:'20vh'}}> <DemoLine /></div>
    </Card>
      </Col>
        </Row>
        </Col>
    <Col className="gutter-row" span={10} id='container' style={{top:'25px'}}>
      <h3 style={{padding:'16px',border:'solid #F0F0F0 1px',marginBottom:'0'}}>Map Location</h3>
        <div style={{height:'60vh'}}>
        <MapContainer />
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
        </Content>);
    
    export default CattleProfile;