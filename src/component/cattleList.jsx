import React from 'react';
import 'antd/dist/antd.css';
import './sidebar.css';
import {withRouter} from 'react-router-dom'
import cowPic from './cowPic.jpg';
import { List,Popconfirm,Layout,Card} from 'antd';
import { DownloadOutlined,EyeOutlined,DeleteOutlined,QuestionCircleOutlined} from '@ant-design/icons';
const { Meta } = Card;
const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 5',
    },
    {
      title: 'Title 6',
    },
    {
        title: 'Title 7',
      },
      {
        title: 'Title 8',
      },
      {
        title: 'Title 9',
      },
      {
        title: 'Title 10',
      },
  ];
const { Header, Content, Sider,Footer } = Layout;
const CattleList=({history})=>(
  <Content
  className="site-layout-background"
  style={{
    padding: 28,
    margin: 0,
    minHeight: '80vh',
  }}
>
  <h1 style={{fontSize:'16px',fontWeight:'light',paddingLeft:'10px'}} >  <b>Cattles</b></h1>
  <br></br>
  {/* Start of dashBoard content */}
  <List
grid={{
gutter: 16,
xs: 1,
sm: 2,
md: 4,
lg: 4,
xl: 5,
xxl: 3,
}}
dataSource={data}
renderItem={item => (
<List.Item>
<Card
hoverable
cover={
<img
alt="example"
src={cowPic}
/>
}
actions={[
<EyeOutlined onClick={()=>{history.push('/cattle_profile')}} />,
<DownloadOutlined />,
<Popconfirm title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }}  />}><DeleteOutlined />
</Popconfirm>,
]}
>
<Meta
title={item.title}
description={<p>
<b>Temperature</b> : 98 C <br>
</br>
<b>Pulse</b> : 80 BPM<br>
</br>
<b>Activity</b> : Feeding<br>
</br>
<b>Status</b> : Healthy<br>
</br>
</p>}
/>
</Card>
</List.Item>
)}
/>
</Content>
);

export default withRouter(CattleList);