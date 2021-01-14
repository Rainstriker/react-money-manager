import React from 'react';
import Backend from '../../util/Backend';
import LocalStorageService from '../../services/localStorageService';
import { withRouter } from 'react-router-dom';
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

const UpdatePassword = props => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    const body = {
      password: values.password,
    };
    Backend.updateUserPassword(body
      ).then( res => {
        notification.success({
          message: `Update password success.${values.name}!`,
          placement: 'bottomRight'
        });
        LocalStorageService.removeToken();
        props.history.push('/login');
      }).catch( err => {
        notification.error({
          message: `Update password failed.`,
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
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
      style={{paddingRight: 40, margin: 'auto'}}
    >
    

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
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Confirm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withRouter(UpdatePassword);