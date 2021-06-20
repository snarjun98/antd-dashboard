import React from 'react';
import './App.css';
// import cattle_profile_page from "./component/cattle_profile_page";
// import Dashboard from "./component/dashboard";
import CattleList from "./component/cattleList";
import Mapview from "./component/mapview";
import { Switch ,Route,Redirect } from 'react-router-dom';
import { auth,createUserProfileDocument } from './Firebase/firebase';
import {connect} from 'react-redux';
import { setCurrentUser } from './redux/user/user.action';
import { createStructuredSelector } from 'reselect';
import CattleProfile from './component/cattle_profile';
import 'antd/dist/antd.css';
import './component/sidebar.css';
import { Layout} from 'antd';
import NormalLoginForm from "./component/login";
import SideBar from "./component/sidebar"
import TopHeader from './component/header'
import DashboardComponent from "./component/dashboard_component"
import { selectCurrentUser } from './redux/user/user.selector';
import RegistrationForm from "./component/register";
class App extends React.Component{
unsubscribeFromAuth=null;

componentDidMount(){
  const {setCurrentUser}=this.props;
  this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth=>{
    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapshot=>{
        setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
    }
    setCurrentUser(userAuth);
    
  });
}
componentWillUnmount(){
  this.unsubscribeFromAuth();
}

  render(){
    return (
      this.props.currentuser?(
        <Layout>
            <TopHeader />
            <Layout style={{marginTop:'60px'}}>
            <SideBar currentuser={this.props.currentuser} />
              <Layout  style={{marginLeft:'240px',paddingTop:'1px',paddingLeft:'1px'}}>
             <Switch>
              {/* <Route exact path='/' render={()=>this.props.currentuser ?(<Redirect to='/dashboard' />):(<Redirect to='/auth' />)} /> */}
              <Route exact path='/' component={DashboardComponent}/>
              <Route exact path='/cattle/:cattle_id' component={CattleProfile} /> 
              <Route exact path='/cattle_list' component={CattleList} /> 
              <Route exact path='/login' render={()=><Redirect to='/' />} /> 
              <Route exact path='/register' render={()=><Redirect to='/' />} />
              {/* <Route exact path='/auth' render={()=>this.props.currentuser ?(<Redirect to='/' />):(<SigninandSignupPage></SigninandSignupPage>)}/> */}
              <Route path='/Mapview' component={Mapview}/>
             </Switch>
             </Layout>
              </Layout>
            </Layout>
          ):(    
<div >
  <Switch>
    <Route exact path='/' render={()=><Redirect to='/login'/>}  />
    <Route exact path='/login' component={NormalLoginForm} />
    <Route exact path='/register' component={RegistrationForm } />
    <Route exact path='/cattle_profile' render={()=><Redirect to='/login'/>} /> 
    <Route exact path='/cattle_list' render={()=><Redirect to='/login'/>} /> 
    <Route path='/Mapview' render={()=><Redirect to='/login'/>}/>
  </Switch>
     </div>
  )
    );
  
}
}

const mapStateToProps = createStructuredSelector({
  currentuser :selectCurrentUser
});

const mapDispatchToProps = dispatch =>({
setCurrentUser: user =>dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);

