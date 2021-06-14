import React, { useState,useEffect } from 'react';
import 'antd/dist/antd.css';
import './sidebar.css';
import { withRouter } from 'react-router-dom'
import { List, Popconfirm, Layout, Card, Drawer, Form, Button, Col, Row, Input,Radio, Select } from 'antd';
import { DownloadOutlined, EyeOutlined, DeleteOutlined, QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { selectCurrentUser } from '../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { storage, firestore,createCattleProfileDocument } from '../Firebase/firebase';
import {connect} from 'react-redux';
import 'firebase/firestore';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const { Meta } = Card;
const { Option } = Select;



const { Header, Content, Sider, Footer } = Layout;
const CattleList = ({ history,currentuser }) => {
  const [info , setInfo] = useState([]);
  const [sensorData,setSensorData]= useState({});
  const [visible, setVisible] = useState(false);
  const [image , setImage] = useState('');
  const [imageUrl , setImageUrl] = useState('');
  const [form] = Form.useForm();
  useEffect(() => {
    console.log(currentuser)
    sensData()
    getResult(currentuser)  
  },[])

const handleSubmit = async (values) => {
  const invoice_id=values.invoice_id;
  const cattle_id=values.Cattle_id;
  const Name =values.name;
  const age  = values.age;
  const breed = values.Breed;
  const imageData=values.image.file.originFileObj;
  // const image_url=`images/${cattle_id}`;
  const image_name=imageData.name;

  try {
      console.log(values);
      await storage.ref(`/images/${cattle_id}/${imageData.name}`).put(imageData);
      const image_url=await storage.ref(`/images/${cattle_id}`).child(image_name).getDownloadURL()
      .then(url => {
      return url
      });
    await createCattleProfileDocument({invoice_id,cattle_id,age,Name,breed,image_url,image_name});
    sensData()
    getResult(currentuser)
    setVisible(false)
    form.resetFields();
  } catch (error) {
    console.log(error);
  }
};
  
  const handleAnt = e => {
    console.log(e.file.originFileObj);
    setImage(e.file.originFileObj);
  };
  

  const getResult=async(currentuser)=> {
    await firestore.doc(`cattles/${currentuser.invoiceId}`).get().then(
      data=>{
        setInfo(data.data())
      })
      }    
  
  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };
  const sensData=async()=> {
    await firestore.collection(`sensors`).get().then((querySnapshot) => {
      querySnapshot.docs.forEach(element => {
          setSensorData(args=>({...args,[element.id]:element.data()}))
      }); 
  })
}



  const data=info;
  console.log(data,currentuser.invoiceId)
  console.log(sensorData);

  const deleteCattle = (currentuser,id)=>{
     firestore.doc(`cattles/${currentuser.invoiceId}`).update({
      cattle_data:data.cattle_data.filter(dx =>dx.id !== id)
    })
    getResult(currentuser)
    }
    
  return (
  <Content
    className="site-layout-background"
    style={{
      padding: 28,
      margin: 0,
      minHeight: '80vh',
    }}
  >
    <h1 style={{ fontSize: '16px', fontWeight: 'light', paddingLeft: '10px' }} >  <b>Cattles</b></h1>
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
      dataSource={data.cattle_data}
      renderItem={item => (
        <List.Item>
          <Card
            hoverable
            cover={
              <img
                alt="example"
                src={item.image_url}
              />
            }
            actions={[
              <EyeOutlined onClick={() => { history.push('/cattle_profile') }} />,
              <DownloadOutlined />,
              <Popconfirm title="Are you sure？" onConfirm={()=>deleteCattle(currentuser,item.id)} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}><DeleteOutlined />
              </Popconfirm>,
            ]}
          >
            <Meta
              title={item.name}
              
              description={<p>
                <b>Temperature</b>{sensorData[item.id].temp} C<br>
                </br>
                <b>Pulse</b> : {sensorData[item.id].pulse} BPM<br>
                </br>
                <b>Activity</b> : {sensorData[item.id].activity}<br>
                </br>
                <b>Status</b> : {sensorData[item.id].status}<br>
                </br>
              </p>}
            />
          </Card>
        </List.Item>
      )}
    />
    <Button type="primary" onClick={showDrawer}>
      <PlusOutlined /> New Cattle
        </Button>
    <Drawer
      title="Create a new Cattle"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 1 }}>
            Cancel
              </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form} initialValues={{'invoice_id':currentuser.invoiceId}} onFinish={handleSubmit} hideRequiredMark>
      <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Cattle_id"
              label="Cattle ID"
              rules={[{ required: true, message: 'Please enter Cattle ID' }]}
            >
              <Input placeholder="Please enter Cattle ID" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter Cattle name' }]}
            >
              <Input placeholder="Please enter Cattle name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="color"
              label="Color"
              rules={[{ required: true, message: 'Please enter Cattle Color' }]}
            >
              <Input placeholder="Please enter Cattle Color" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="age"
              label="Age"
              rules={[{ required: true, message: 'Please enter Age' }]}
            >
              <Input
                style={{ width: '100%' }}
                type={Number}
                placeholder="Please enter Age"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="gender" label="Cattle Gender"
            rules={[{ required: true, message: 'Please select Cattle Gender' }]}
            >
        <Radio.Group>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="Breed"
              label="Type"
              rules={[{ required: true, message: 'Please enter the breed' }]}
            >
              <Input
                style={{ width: '100%' }}
                type={Number}
                placeholder="Please enter Cattle Breed"
              />
              
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
          <Form.Item label="Upload cow Image">
        <Form.Item name="image"  valuePropName="file"  getValueFromEvent={image} noStyle>
          <Upload.Dragger name="file"  multiple={false} onChange={handleAnt} >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
          </Col>
        </Row>
        <Form.Item
              name="invoice_id"
              hidden
            >
              <Input />
            </Form.Item>
        <Form.Item >
        <Button type="primary" style={{width:'100%'}} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>
    </Drawer>
  </Content>)
};
const mapStateToProps = createStructuredSelector({
  currentuser :selectCurrentUser
});

export default withRouter(connect(mapStateToProps)(CattleList));


