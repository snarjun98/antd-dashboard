import React from 'react';
import 'antd/dist/antd.css';
import './sidebar.css';
import {Layout,Row,Col} from 'antd';
import MultiMapContainer from './gmaps/multicattlemap.component';
const {Content} = Layout;
const Mapview=()=>(
        <Content
          className="site-layout-background"
          style={{
            padding: 28,
            margin: 0,
            minHeight: '80vh',
          }}
        >
          <h1 style={{fontSize:'16px',fontWeight:'light',paddingLeft:'10px'}} >  <b>Map View</b></h1>
          <br></br>
          {/* Start of dashBoard content */}
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={24} id='container' >
          <div style={{height:'90vh',width:'100%',padding:0}}>
          <MultiMapContainer />
          </div>
          </Col>
          </Row>
        </Content>
);

export default Mapview;