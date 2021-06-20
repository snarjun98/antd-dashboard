import { Layout, Menu } from 'antd';
import {UserOutlined,CommentOutlined,ToolOutlined,DashboardOutlined,EnvironmentOutlined,BankOutlined } from '@ant-design/icons';
import wave from "./waves.svg";
import {withRouter} from 'react-router-dom';
const {Sider}=Layout;
var welcome;
var date = new Date();  
var hour = date.getHours();
if (hour < 12) {  
  welcome = "Good Morning";  
} else if (hour < 17) {  
  welcome = "Good Afternoon";  
} else if(hour <19) {  
  welcome = "Good Evening";  
} else{
  welcome="Good Night"
} 
const SideBar =({history,match,currentuser})=>(
<Sider width={240} breakpoint="lg" collapsedWidth="0" 
onBreakpoint={broken => {
  console.log(broken);
}}
onCollapse={(collapsed, type) => {
  console.log(collapsed, type);
}} style={{
  height: '100vh',
  position: 'fixed',
}} >
  <div className='container' style={{position:'relative',height:'200px',width:'100%'}}>
  <img src={wave} alt="Norway" style={{width:'100%',height:'100%'}} />
<div class="text-block" style={{position: 'absolute', bottom: '20px',right:'60px'}}>
<h2>{welcome}</h2>
<h3>{currentuser.displayName}</h3>
</div>
</div>
<Menu
    defaultSelectedKeys={['1']}
    mode="inline"
    defaultOpenKeys={['sub1']}
    style={{ height: '100%', borderRight: 0 }}
  >

      <Menu.Item key="1" icon={<DashboardOutlined />}  style={{height:'8vh',textAlign:'center',fontSize:'16px',display:'flex',alignItems:'center'}} onClick={() => history.push('/')}>Dashboard</Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined/>}  style={{height:'8vh',textAlign:'center',fontSize:'16px',display:'flex',alignItems:'center'}}onClick={() => history.push('/cattle_list')}>Cattles</Menu.Item>
      <Menu.Item key="3" icon={<EnvironmentOutlined />}  style={{height:'8vh',textAlign:'center',fontSize:'16px',display:'flex',alignItems:'center'}} onClick={() => history.push('/Mapview')}>Map View</Menu.Item>
      <Menu.Item key="5" icon={<ToolOutlined />}  style={{height:'8vh',textAlign:'center',fontSize:'16px',display:'flex',alignItems:'center'}} onClick={() => history.push('/')}>Settings</Menu.Item>
      <Menu.Item key="6" icon={<CommentOutlined />}  style={{height:'8vh',textAlign:'center',fontSize:'16px',display:'flex',alignItems:'center'}} onClick={() => history.push('/')}>Support</Menu.Item>
  </Menu>
</Sider>
)

export default withRouter(SideBar);