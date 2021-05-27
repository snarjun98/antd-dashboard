import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
//import './login.css';
import {auth} from '../Firebase/firebase'

const NormalLoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    console.log(values.username);
  };

  const handleSubmit = async (values) =>{
    try{
        await auth.signInWithEmailAndPassword(values.email,values.password);
        console.log('logged in')
    }catch(error){
        alert(error);
    }

}
  return (
    <div >
<h1 style={
  {textAlign:'center'}
}> Welcome Back To DashBoard</h1>
    <Form
      style={{
        display: 'flex',
        flexDirection:'column',
        height:'90vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: false,
      }}
      onFinish={handleSubmit}
    >
      <h1>LOGIN</h1>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{width:'100%'}} className="login-form-button">
          Log in
        </Button>
        <br></br>
        Or <a href="/register">register now!</a>
      </Form.Item>
    </Form>
    </div>
  );
};

export default  NormalLoginForm;