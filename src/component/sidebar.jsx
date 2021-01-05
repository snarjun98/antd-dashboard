import React from 'react';
import 'antd/dist/antd.css';
import './sidebar.css';
import cowPic from './cowPic.jpg';
import { Layout, Menu, Breadcrumb,Row, Col,Button,Input} from 'antd';
import { UserOutlined,CommentOutlined,ToolOutlined,DashboardOutlined,EnvironmentOutlined,BankOutlined } from '@ant-design/icons';
import DemoLine from './graphs/linegraphs.component';

const onSearch = value => console.log(value);
const {Search}=Input;

const { Header, Content, Sider,Footer } = Layout;
const Sidebar=()=>(
  <Layout>
    <Header className="header"  >
      <div className="logo" />
      {/* <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="small"
      onSearch={onSearch}
    /> */}
      <Menu className='navBar' theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background" >
      <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >

            <Menu.Item key="1" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined/>}>Cattles</Menu.Item>
            <Menu.Item key="3" icon={<EnvironmentOutlined />}>Map View</Menu.Item>
            <Menu.Item key="4" icon={<BankOutlined />} >Hospitals</Menu.Item>
          
            <Menu.Item key="5" icon={<ToolOutlined />} >Settings</Menu.Item>
            <Menu.Item key="6" icon={<CommentOutlined />}>Support</Menu.Item>
        </Menu>
      </Sider>
      <Layout  style={{paddingTop:'1px',paddingLeft:'1px'}}>
        <Content
          className="site-layout-background"
          style={{
            padding: 28,
            margin: 0,
            minHeight: '80vh',
          }}
        >
          <h1 style={{fontSize:'24px'}} >  Cattles &gt; Mr.Ambba Cow  </h1>
          <br></br>
          {/* Start of dashBoard content */}
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
      <Col className="gutter-row" span={6} >
      <div style={{textAlign:'right'}}><img src={cowPic} style={{height:'150px',width:'70%',borderRadius:'50%'}} alt='Cow Pic'/></div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={{padding: '4px 8px',fontSize:'30px',fontWeight:'bold'}}>Cattle</div>
        <div style={{padding: '4px 8px',fontSize:'24px',fontWeight:'light'}}>Mr.Ambba Cow</div>
        <div style={{padding: '8px 8px'}}><Button type="primary" shape="round" icon={<UserOutlined />} size={'large'}>
          View Profile
        </Button></div>
      </Col>

      <Col className="gutter-row" span={6} style={{paddingTop:'10px'}}>
        <div style={{padding: '8px 8px',fontSize:'20px',fontWeight:'light',float:'right'}}>Age : 10 Years</div>
        <div style={{padding: '8px 8px',fontSize:'20px',fontWeight:'light',float:'right'}}>Color : White</div>
        <div style={{padding: '8px 8px',fontSize:'20px',fontWeight:'light',float:'right'}}>Breed : Ongole</div>
        
      </Col>
      <Col className="gutter-row" span={6} style={{paddingTop:'10px'}}>
      <div style={{padding: '8px 8px',fontSize:'20px',fontWeight:'light',float:'left'}}>Gender : Male</div>
        <div style={{padding: '8px 8px',fontSize:'20px',fontWeight:'light',float:'left'}}>Cow# : 1231</div>
        <div style={{padding: '8px 8px',fontSize:'20px',fontWeight:'light',float:'left'}}>Status : Healthy</div>
      </Col>
    </Row>

{/* 
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{padding:'10px 0'}}>
      <Col className="gutter-row" span={6} id='container' >
      <DemoLine />
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={{padding: '4px 8px',fontSize:'30px',fontWeight:'bolder'}}>Cattle</div>
        <div style={{padding: '4px 8px',fontSize:'24px',fontWeight:'light'}}>Mr.Ambba Cow</div>
        <div style={{padding: '4px 8px'}}><Button type="primary" shape="round" icon={<UserOutlined />} size={'large'}>
          View Profile
        </Button></div>
      </Col>

      <Col className="gutter-row" span={6}>
        <div style={{padding: '8px 8px',fontSize:'18px',fontWeight:'light'}}>Age : 10 Years</div>
        <div style={{padding: '4px 8px',fontSize:'18px',fontWeight:'light'}}>Color : White</div>
        <div style={{padding: '4px 8px',fontSize:'18px',fontWeight:'light'}}>Breed : Ongole</div>
        
      </Col>
      <Col className="gutter-row" span={6}>
      <div style={{padding: '8px 8px',fontSize:'18px',fontWeight:'light'}}>Gender : Male</div>
        <div style={{padding: '4px 8px',fontSize:'18px',fontWeight:'light'}}>Cow# : 1231</div>
        <div style={{padding: '4px 8px',fontSize:'18px',fontWeight:'light'}}>Status : Healthy</div>
      </Col>
    </Row> */}




        </Content>
      </Layout>
      
    </Layout>
    
  </Layout>
);

export default Sidebar;