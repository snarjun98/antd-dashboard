import React, { useState } from 'react';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { auth,createUserProfileDocument} from '../Firebase/firebase';

// const { Option } = Select;
// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 8,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 16,
//     },
//   },
// };
// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };


 const handleSubmit = async (values) => {
    const displayName =values.name;
    const email  = values.email;
    const phone = values.phone;
    const password = values.password;
    const invoiceId=values.invoiceId;

    try {
        console.log(values);
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user,{phone,displayName,invoiceId});
    } catch (error) {
      console.error(error);
    }
  };


  
  return (
    <Form
      form={form}
      style={
          {
              position:'absolute',
              width:'40%',
              height:'40%',
              top:'10%',
              left:'30%'
            
          }
      }
      name="register"
      onFinish={handleSubmit}
      scrollToFirstError
    >
        <h1 style={{textAlign:'center'}}>Register</h1>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {  
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
        type='number'
          style={{
            width: '100%',
          }}
        />
      </Form.Item>
      <Form.Item
        name="invoiceId"
        label="Invoice ID"
        tooltip="Check Your Bill to get it"
        rules={[
          {
            required: true,
              message : 'Please input correct ID!'
          }
        ]}
      >
        <Input
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
                
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
        <a href="/login" style={{float:'right'}}>Already Registered?</a>
      </Form.Item>
      <Form.Item >
        <Button type="primary" style={{width:'100%'}} htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegistrationForm;