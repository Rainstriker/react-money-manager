import React from 'react';
import Backend from '../../util/Backend';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Button,
  notification
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const UpdateUser = props => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    const body = {
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName
    };
    Backend.updateUserInfo(body
      ).then( res => {
        console.log(res)
        notification.success({
          message: `Update your info is success!`,
          placement: 'bottomRight'
        });
      }).catch( err => {
        notification.error({
          message: `Update failed, please try again.`,
          placement: 'bottomRight'
        });
        console.log(err);
      });
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      style={{paddingRight: 40, margin: 'auto'}}>
      <Form.Item
        name="username"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: false,
            message: 'Please input your E-mail!',
          },
        ]}>
        <Input defaultValue={props.username} value={props.username}/>
      </Form.Item>
      <Form.Item
        name="firstName"
        label={
          <span>First name&nbsp;</span>
        }
        rules={[
          {
            required: false,
            message: 'Please input your name!',
            whitespace: true,
          },
        ]}>
        <Input defaultValue={props.firstName} value={props.firstName}/>
      </Form.Item>
      <Form.Item
        name="lastName"
        label={
          <span>Last name&nbsp;</span>
        }
        rules={[
          {
            required: false,
            message: 'Please input your name!',
            whitespace: true,
          },
        ]}>
        <Input defaultValue={props.lastName} value={props.lastName}/>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Confirm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateUser;