import React from 'react';
import 'antd/dist/antd.css';
import './sidebar.css';
import { Layout} from 'antd';
import SideBar from "./sidebar"
import TopHeader from './header'
import DashboardComponent from "./dashboard_component.jsx"

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
}
const { Header, Content, Sider,Footer } = Layout;
const Dashboard=()=>(
  <Layout>
    <TopHeader />
    <Layout style={{marginTop:'60px'}}>
    <SideBar />
      <Layout  style={{marginLeft:'240px',paddingTop:'1px',paddingLeft:'1px'}}>
      <DashboardComponent> </DashboardComponent>
      </Layout>
      
    </Layout>
    
  </Layout>
);

export default Dashboard;