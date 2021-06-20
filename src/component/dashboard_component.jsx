import React from 'react';
import 'antd/dist/antd.css';
import './sidebar.css';
import {Card,Row,Col, Tooltip,Layout} from 'antd';
import {InfoCircleFilled, CaretUpFilled } from '@ant-design/icons';
import MultiMapContainer from './gmaps/multicattlemap.component';
import ChartCard from './ChartCard';
import MiniArea from './MiniArea';
import MiniBar from './MiniBar';
import MiniProgress from './MiniProgress';
import {movementSummary} from './dummydata/movementSummary';
import {visitSummary} from './dummydata/visitsSummary'
import { connect } from 'react-redux';
import { selectCurrentUser } from '../redux/user/user.selector';
import { createStructuredSelector } from 'reselect';
import { firestore } from '../Firebase/firebase';
import DemoPie from './graphs/pie.component';
class DashboardComponent extends React.Component{
  state={
    cattles_data:[],
    count:0,
    sensor_data:[]
  }
  componentDidMount(){
    const{currentuser}=this.props;
    this.sensData= firestore.collection(`sensors`).onSnapshot((querySnapshot) => {
      this.setState({
        count:querySnapshot.size
      })
      querySnapshot.docs.forEach(element => {
        this.setState({
          sensor_data: {...this.state.sensor_data,[element.id]:element.data()}
        })

      }); 
  })
    this.getResult=firestore.doc(`cattles/${currentuser.invoiceId}`).onSnapshot(
       data=>{
         this.setState({
           cattles_data:(data.data().cattle_data.map(data=>data.id)),
         })
       });
  }
  componentWillUnmount(){
  this.sensData();
  this.getResult();
  }
render(){
const data=this.state.cattles_data;
const sdata=this.state.sensor_data;
var cdata=Object.keys(sdata);
if(cdata.length === this.state.count && this.state.count > 0){
 var unwanted_id = cdata.filter(val => !data.includes(val));
 if(unwanted_id.length !==cdata.length)
 unwanted_id.forEach(id=>delete sdata[id]);
}
var sdata_values=Object.values(sdata);
var total=sdata_values.length;
var healthy=sdata_values.filter(idx=>idx.status ==="Healthy")
var healthy_count=healthy.length;
var unhealthy_count=total - healthy_count;
var ratio=(unhealthy_count/total)*100;
const {Content} = Layout;
const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
  };
  return(
<Content
          className="site-layout-background"
          style={{
            padding: 28,
            margin: 0,
            minHeight: '80vh',
          }}
        >
          <h1 style={{fontSize:'16px',fontWeight:'light',paddingLeft:'10px'}} >  <b>Dashboard</b></h1>
          <br></br>
          {/* Start of dashBoard content */}
          
    <>
      <Row gutter={24} type="flex">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="Total Cattles"
            action={
              <Tooltip title="Total number of Cattles">
                <InfoCircleFilled />
              </Tooltip>
            }
            loading={true}
            total={total}
           
            contentHeight={47}
          >
            <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
              Weekly Changes
              <span className="trendText">{14}%</span>
              <CaretUpFilled style={{ color: '#52c41a' }} />
            </div>
          </ChartCard>
        </Col>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="Healthy"
            action={
              <Tooltip title="Total number of Healthy Cattles in the last month.">
                <InfoCircleFilled />
              </Tooltip>
            }
            loading={false}
            total={healthy_count}
            
            contentHeight={47}
          >
            <MiniArea color="#975FE4" data={visitSummary} />
          </ChartCard>
        </Col>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="Unhealthy Cattles"
            action={
              <Tooltip title="Number Of Unhealthy Cattles.">
                <InfoCircleFilled />
              </Tooltip>
            }
            loading={true}
            total={unhealthy_count}
            
            contentHeight={47}
          >
            <MiniBar data={movementSummary} />
          </ChartCard>
        </Col>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Col {...topColResponsiveProps}>
          <ChartCard
            bordered={false}
            title="Ratio"
            action={
              <Tooltip title="Percentage of unheathy Cattles.">
                <InfoCircleFilled />
              </Tooltip>
            }
            loading={true}
            total={ratio + ' %'}
            contentHeight={47}
          >
            <MiniProgress
              percent={ratio}
              strokeWidth={16}
              color="#13C2C2"
              target={100}
            />
          </ChartCard>
        </Col>
      </Row>
      <Row gutter={24} type="flex">
        <Col span={12}>
          <Card title="Weekly Unhealthy Cattle">
           <DemoPie hcount={healthy_count} ucount={unhealthy_count} />
          </Card>
        </Col>
        <Col span={12}>
        <h3 style={{padding:'16px',border:'solid #F0F0F0 1px',marginBottom:'0',marginRight:'16px',paddingRight:'0'}}>Map Location</h3>
        <div style={{height:'60px',width:'100%'}}>
        <MultiMapContainer/>
        </div>
        </Col>
      </Row>
    </>
        </Content>);
}
}
    const mapStateToProps = createStructuredSelector({
      currentuser :selectCurrentUser
    });
    export default connect(mapStateToProps)(DashboardComponent);