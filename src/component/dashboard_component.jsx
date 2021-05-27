import React from 'react';
import 'antd/dist/antd.css';
import './sidebar.css';
import {Card,Row,Col, Tooltip,Layout} from 'antd';
import {InfoCircleFilled, CaretUpFilled } from '@ant-design/icons';
import MultiMapContainer from './gmaps/multicattlemap.component';
import MapContainer from './gmaps/maps.component';
import ChartCard from './ChartCard';
import MiniArea from './MiniArea';
import MiniBar from './MiniBar';
import MiniProgress from './MiniProgress';
import ProductBarChart from './ProductBarChart';
const visitSummary = [
    { x: '2020-09-18', y: 21 },
    { x: '2020-09-19', y: 9 },
    { x: '2020-09-20', y: 5 },
    { x: '2020-09-21', y: 6 },
    { x: '2020-09-22', y: 14 },
    { x: '2020-09-23', y: 17 },
    { x: '2020-09-24', y: 5 },
    { x: '2020-09-25', y: 3 },
    { x: '2020-09-26', y: 11 },
    { x: '2020-09-27', y: 14 },
    { x: '2020-09-28', y: 12 },
    { x: '2020-09-29', y: 19 },
    { x: '2020-09-30', y: 5 },
    { x: '2020-10-01', y: 20 },
    { x: '2020-10-02', y: 2 },
    { x: '2020-10-03', y: 16 },
    { x: '2020-10-04', y: 11 },
    { x: '2020-10-05', y: 21 },
    { x: '2020-10-06', y: 32 },
    { x: '2020-10-07', y: 16 },
    { x: '2020-10-08', y: 7 },
    { x: '2020-10-09', y: 0 },
    { x: '2020-10-10', y: 11 },
    { x: '2020-10-11', y: 13 },
    { x: '2020-10-12', y: 18 },
    { x: '2020-10-13', y: 13 },
    { x: '2020-10-14', y: 27 },
    { x: '2020-10-15', y: 14 },
    { x: '2020-10-16', y: 2 },
    { x: '2020-10-17', y: 15 },
  ];
  const movementSummary = [
    { x: '2019-11', y: 0 },
    { x: '2019-12', y: 0 },
    { x: '2020-1', y: 0 },
    { x: '2020-2', y: 0 },
    { x: '2020-3', y: 730 },
    { x: '2020-4', y: 178 },
    { x: '2020-5', y: 0 },
    { x: '2020-6', y: 6 },
    { x: '2020-7', y: 18 },
    { x: '2020-8', y: 222 },
    { x: '2020-9', y: 99 },
    { x: '2020-10', y: 978 },
  ];
const {Content} = Layout;
const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
  };
const DashboardComponent=()=>(
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
            total={12}
            footer={
              <>
                <span className="boldText">{13}</span> Cattles added in the last{' '}
                <span className="boldText">7</span> days
              </>
            }
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
            total={10}
            footer={
              <>
                <span className="boldText">{12}</span> Average of Healthy Cattles per
                day
              </>
            }
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
            total={124}
            footer={
              <>
                <span className="boldText">{123}</span> Unhealthy Cattles in the last
                month
              </>
            }
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
            total={10 + ' %'}
            footer={
              <>
                <span className="boldText">{12}</span> Unheathy cattles % in the last year
              </>
            }
            contentHeight={47}
          >
            <MiniProgress
              percent={10}
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
            <ProductBarChart />
          </Card>
        </Col>
        <Col span={12}>
        <h3 style={{padding:'16px',border:'solid #F0F0F0 1px',marginBottom:'0',marginRight:'16px',paddingRight:'0'}}>Map Location</h3>
        <div style={{height:'60px',width:'100%'}}>
        <MultiMapContainer />
        </div>
        </Col>
      </Row>
    </>
        </Content>);
    export default DashboardComponent;