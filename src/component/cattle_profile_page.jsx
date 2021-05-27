import React from 'react';
import 'antd/dist/antd.css';
import './sidebar.css';
import { Layout,Card,Badge, Menu, Breadcrumb,Row,Avatar,Col,Button,Input} from 'antd';
import { BellOutlined ,UserOutlined,CommentOutlined,ToolOutlined,DashboardOutlined,EnvironmentOutlined,BankOutlined } from '@ant-design/icons';
import logo from "./logo.svg";
import wave from "./waves.svg";
import SideBar from "./sidebar"
import TopHeader from './header'
import CattleProfile from './cattle_profile';
const onSearch = value => console.log(value);
const {Search}=Input;
const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
}
const { Header, Content, Sider,Footer } = Layout;
const cattle_profile_page=()=>(
  <Layout>
    <TopHeader />
    <Layout style={{marginTop:'60px'}}>
    <SideBar />
      <Layout  style={{marginLeft:'240px',paddingTop:'1px',paddingLeft:'1px'}}>
      <CattleProfile></CattleProfile>
      </Layout>
      
    </Layout>
    
  </Layout>
);

export default cattle_profile_page;