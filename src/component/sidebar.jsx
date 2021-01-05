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
      <Sider width={240} className="site-layout-background" >
      <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >

            <Menu.Item key="1" icon={<DashboardOutlined />} style={{height:'8vh',textAlign:'center',fontSize:'16px',display:'flex',alignItems:'center'}}>Dashboard</Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined/>} style={{height:'8vh',textAlign:'center',fontSize:'16px',display:'flex',alignItems:'center'}}>Cattles</Menu.Item>
            <Menu.Item key="3" icon={<EnvironmentOutlined />} style={{height:'8vh',textAlign:'center',fontSize:'16px',display:'flex',alignItems:'center'}}>Map View</Menu.Item>
            <Menu.Item key="4" icon={<BankOutlined />} style={{height:'8vh',textAlign:'center',fontSize:'16px',display:'flex',alignItems:'center'}}>Hospitals</Menu.Item>
        6
            <Menu.Item key="5" icon={<ToolOutlined />} style={{height:'8vh',textAlign:'center',fontSize:'16px',display:'flex',alignItems:'center'}}>Settings</Menu.Item>
            <Menu.Item key="6" icon={<CommentOutlined />}style={{height:'8vh',textAlign:'center',fontSize:'16px',display:'flex',alignItems:'center'}}>Support</Menu.Item>
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
          <h1 style={{fontSize:'16px',fontWeight:'light',paddingLeft:'10px'}} >  <b>Cattles &gt;</b> Mr.Ambba Cow  </h1>
          <br></br>
          {/* Start of dashBoard content */}
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
      <Col className="gutter-row" span={6} >
      <div style={{textAlign:'right'}}><img src={cowPic} style={{height:'180px',width:'180px',borderRadius:'50%'}} alt='Cow Pic'/></div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={{padding: '4px 8px',fontSize:'30px',fontWeight:'bold'}}>Cattle</div>
        <div style={{padding: '4px 8px',fontSize:'24px',fontWeight:'light'}}>Mr.Ambba Cow</div>
        <div style={{padding: '8px 8px'}}><Button type="primary" shape="round" icon={<UserOutlined />} size={'large'}>
          View Profile
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

{/* 
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{padding:'10px 0'}}>
      <Col className="gutter-row" span={24} id='container' >
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