import { Layout,Modal,Badge,Popover,Button, Row,Avatar,Col,Input} from 'antd';
import { BellOutlined ,PoweroffOutlined,UserOutlined} from '@ant-design/icons';
import logo from "./logo.svg";
import React from 'react';
import {auth} from '../Firebase/firebase'
import { connect } from 'react-redux';
import { selectCurrentUser } from '../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
const onSearch = value => console.log(value);
const {Search}=Input;
const {Header} =Layout;
function info(currentuser) {
  Modal.info({
    title: `Profile Info`,
    content: (
      <div>
        <p></p>
        <p>Name : {currentuser.displayName}</p>
        <p>Email : {currentuser.email}</p>
        <p>Phone : {currentuser.phone}</p>
        <p>Invoice Id : {currentuser.invoiceId}</p>
      </div>
    ),
    onOk() {},
  });
}
const TopHeader=({currentuser})=>(
  

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
<Popover placement="bottomRight"  content={<div><Button  icon={<UserOutlined />} onClick={()=>info(currentuser)}>Profile ! </Button><br></br> 
<p></p>
<Button  type="primary" icon={<PoweroffOutlined />} onClick={()=> auth.signOut()} >LogOut</Button>
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
</Header>
);
const mapStateToProps = createStructuredSelector({
  currentuser :selectCurrentUser
});
export default connect(mapStateToProps)(TopHeader);