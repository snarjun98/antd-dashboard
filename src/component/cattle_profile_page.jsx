import React from 'react';
import 'antd/dist/antd.css';
import './sidebar.css';
import { Layout,Input} from 'antd';
import SideBar from "./sidebar"
import TopHeader from './header'
import CattleProfile from './cattle_profile';
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