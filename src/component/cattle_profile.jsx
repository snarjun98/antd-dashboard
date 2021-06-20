import React from 'react';
import 'antd/dist/antd.css';
import './sidebar.css';
import { withRouter } from 'react-router-dom'
import {Card,Row,Avatar,Col,Button,Layout,Modal,Form,Input,Radio} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import DemoGauge from './graphs/gauge.component';
import DemoLiquid from "./graphs/liquid.component";
import MapContainer from './gmaps/maps.component';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { firestore,createCattleProfileDocument } from '../Firebase/firebase';
import heartBeat from'../tenor.gif';
import walking from '../cow-walk.gif';
import standing from '../standing.gif';
import feeding from '../feeding.gif';
import sleeping from '../cow-sleeping.jpg';
const { Content } = Layout;
class CattleProfile extends React.Component{
state={
  cattles_data:[],
  cattle_data:[],
  sensor_data:[],
  show_edit_modal:false
}
show_modal=()=>{
this.setState({
  show_edit_modal:true
})
}


componentDidMount()
{
  const{cattle_id}=this.props.match.params;
  const{currentuser}=this.props;
  this.sensData= firestore.doc(`sensors/${cattle_id}`).onSnapshot(
     data=>{
       this.setState({
         sensor_data:(data.data())
       })
     });
  this.getResult=firestore.doc(`cattles/${currentuser.invoiceId}`).onSnapshot(
     data=>{
       this.setState({
         cattles_data:(data.data()),
         cattle_data:(data.data().cattle_data.filter(idx=>idx.id===cattle_id))[0]
       })
     });
}

componentWillUnmount(){
this.sensData();
this.getResult();
}


onFinish=async(values)=>{
  console.log(values);
  const invoice_id=values.invoice_id;
  const cattle_id=values.cattle_id;
  const Name =values.name;
  const age  = values.age;
  const breed = values.Breed;
  const gender=values.gender;
  const image_url=values.image_url;
  const image_name=values.image_name;
  const color=values.color;
  this.setState({
    show_edit_modal:false
  })
  try {
      console.log(values);
    await firestore.doc(`cattles/${invoice_id}`).update({
      cattle_data: this.state.cattles_data.cattle_data.filter(dx =>dx.id !== cattle_id)
    });
    await createCattleProfileDocument({invoice_id,cattle_id,age,Name,breed,image_url,image_name,gender,color});
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
handleCancle=()=>{
  this.setState({
    show_edit_modal:false
  })
}

render(){
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
  };
  
  // const { cattle_id } = this.props.match.params;
  const {cattle_data,sensor_data} =this.state;
  console.log(sensor_data.activity);
  const activity=[walking,sleeping,feeding,standing];
  const activites_index=['walking','sleeping','feeding','standing'].findIndex(data=>data===sensor_data.activity)
return(
<Content
          className="site-layout-background"
          style={{
            padding: 28,
            margin: 0,
            minHeight: '80vh',
          }}
        >
          <h1 style={{fontSize:'16px',fontWeight:'light',paddingLeft:'10px'}} >  <b>Cattles &gt;</b> {cattle_data.name}  </h1>
          <br></br>
          {/* Start of dashBoard content */}
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
      <Col className="gutter-row" span={6} >
      <div style={{textAlign:'center',paddingBottom:'20px'}}><Avatar
    size={{
      xs: 24*2,
      sm: 32*2,
      md: 40*2,
      lg: 64*2,
      xl: 80*2,
      xxl: 100*2,
    }}
    src={cattle_data.image_url}
  />
  </div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div style={{padding: '4px 8px',fontSize:'30px',fontWeight:'bold'}}>Cattle</div>
        <div style={{padding: '4px 8px',fontSize:'24px',fontWeight:'light'}}>{cattle_data.name} </div>
        <div style={{padding: '8px 8px'}}><Button type="primary" onClick={this.show_modal} shape="round" icon={<UserOutlined />} size={'large'}>
          Edit Profile
        </Button></div>
        <Modal title={`Edit ${cattle_data.id} Profile`} visible={this.state.show_edit_modal} onCancel={this.handleCancle} footer={null} >
        <Form
      {...layout}
      name="basic"
      initialValues={{ name:cattle_data.name,
                        color:cattle_data.color,
                        age:cattle_data.age,
                        gender:cattle_data.gender,
                        Breed:cattle_data.breed,
                        invoice_id:this.props.currentuser.invoiceId,
                        cattle_id:cattle_data.id,
                        image_name:cattle_data.image_name,
                        image_url:cattle_data.image_url
      }}
      onFinish={this.onFinish}
    >
    <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter Cattle name' }]}
            >
              <Input placeholder="Please enter Cattle name" />
            </Form.Item>
            <Form.Item
              name="color"
              label="Color"
              rules={[{ required: true, message: 'Please enter Cattle Color' }]}
            >
              <Input placeholder="Please enter Cattle Color" />
            </Form.Item>
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
            <Form.Item name="gender" label="Gender"
            rules={[{ required: true, message: 'Please select Cattle Gender' }]}
            >
        <Radio.Group>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      </Form.Item>
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
            <Form.Item
              name="invoice_id"
              hidden
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="cattle_id"
              hidden
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="image_url"
              hidden
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="image_name"
              hidden
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
      </Modal>
      </Col>

      <Col className="gutter-row" span={6} style={{borderRight:'1px solid #e6eeee',height:'100px',top:'25px'}}>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'right'}}>Age :<b> {cattle_data.age} Years</b></div>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'right'}}>Color : <b>{cattle_data.color}</b></div>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'right'}}>Breed : <b>{cattle_data.breed}</b></div>
      </Col>
      <Col className="gutter-row" span={6} style={{top:'25px'}}>
      <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'left'}}>Gender :<b> {cattle_data.gender}</b></div>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'left'}}>Cow# :<b> {cattle_data.id}</b></div>
        <div style={{padding: '0 0 8px 8px',fontSize:'16px',fontWeight:'lighter',textAlign:'left'}}>Status :<b> {sensor_data.status}</b></div>
      </Col>
    </Row>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
    <Col className="gutter-row" span={6} style={{top:'25px'}} >
      <Card title="Temperature" >
      <div style={{height:'20vh' }}> <DemoGauge temp={sensor_data.temp} /></div>
      </Card> 
      <br></br>
      <Card title="So2" >
      <div style={{height:'20vh' }}> <DemoLiquid /></div>
      </Card>
      </Col>
      <Col className="gutter-row" span={8} style={{top:'25px'}}>
      <Card title="Activity" >
     <div style={{height:'20vh',backgroundImage:`url(${activity[activites_index]})`,backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}}> </div>
    </Card>
    <br></br>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
    <Col className="gutter-row" span={24} id='container' >
      <Card title="Pulse" bordered={true} >
     <div style={{height:'20vh',backgroundImage:`url(${heartBeat})`,backgroundSize:'cover',backgroundPosition:'center'}}>
       <p style={{float:'right',color:'red',fontSize:'40px'}}>{sensor_data.pulse}</p>
     </div>
    </Card>
      </Col>
        </Row>
        </Col>
    <Col className="gutter-row" span={10} id='container' style={{top:'25px'}}>
      <h3 style={{padding:'16px',border:'solid #F0F0F0 1px',marginBottom:'0'}}>Map Location</h3>
        <div style={{height:'60vh'}}>
          { sensor_data.lat&&sensor_data.lon?(
                  <MapContainer sensor_data={sensor_data} cattle_data={cattle_data}  />
          ):
          <p>Loading...</p>
}
        </div>
    </Col>
    </Row>
          </Content>)}};

const mapStateToProps = createStructuredSelector({
  currentuser :selectCurrentUser
});
    
    export default withRouter(connect(mapStateToProps)(CattleProfile));