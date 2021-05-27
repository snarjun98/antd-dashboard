import { Layout,Card,Badge,Popover, Menu, Breadcrumb,Row,Avatar,Col,Button,Input} from 'antd';
import { BellOutlined ,UserOutlined,CommentOutlined,ToolOutlined,DashboardOutlined,EnvironmentOutlined,BankOutlined } from '@ant-design/icons';
import logo from "./logo.svg";
import React from 'react';
import {auth} from '../Firebase/firebase'
const onSearch = value => console.log(value);
const {Search}=Input;
const {Header} =Layout;
const TopHeader=()=>(

<Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%',padding:'0',borderBottom:'1px solid #e6eeee' }} >
<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
  <Col className="gutter-row" span={5}  >
  <img src={logo} alt="LOGO" height='50px' width='240px' style={{borderRight:'1px solid #e6eeee'}} />
  </Col>
  <Col className="gutter-row" span={15}  style={{borderRight:'1px solid #e6eeee'}}>
  <div style={{height:'20%'}}></div>
  <Search
placeholder="input search text"
allowClear
enterButton
size="large"
onSearch={onSearch}
bordered={false}
/>
</Col>
<Col className="gutter-row" span={2} style={{textAlign:'center',borderRight:'1px solid #e6eeee'}}>
<div style={{height:'15%'}}></div>
<Badge count={5}>
<BellOutlined style={{fontSize:'30px'}}/>
</Badge>
</Col>
<Col className="gutter-row" span={2} style={{textAlign:'center'}} >
<Popover placement="bottomRight"  content={<div><a>Profile</a><br></br> 
<a onClick={()=> auth.signOut()} >LogOut</a>
</div>} trigger="click">
<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"  size={{
xs: 24/1.6,
sm: 32/1.6,
md: 40/1.6,
lg: 64/1.6,
xl: 80/1.6,
xxl: 100/1.6,
}}
style={{
bottom:'5px'
}}
/>
      </Popover>

</Col>
</Row>

{/* <Menu className='navBar' theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
  <Menu.Item key="1">nav 1</Menu.Item>
  <Menu.Item key="2">nav 2</Menu.Item>
  <Menu.Item key="3">nav 3</Menu.Item>
</Menu> */}
</Header>
);
export default TopHeader;