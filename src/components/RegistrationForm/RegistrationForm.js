import React from 'react';
import Backend from '../../util/Backend';
import { useHistory } from 'react-router-dom';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Tooltip,
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

const RegistrationForm = props => {

  const history = useHistory();

  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    const body = {
      username: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    };
    Backend.register(body
      ).then( res => {
        notification.success({
          message: `Greeting ${values.name}!`,
          placement: 'bottomRight'
        });
        history.push('/login');
      }).catch( err => {
        if (err.response && err.response.data) {
          notification.error({
            message: err.response.data.message,
            placement: 'bottomRight'
          });
        } else {
          notification.error({
            message: `Register failed.`,
            placement: 'bottomRight'
          });
        }
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
      style={{paddingRight: 40, margin: 'auto'}}
    >
      <Form.Item
        name="email"
        label="Email"
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
      <Form.Item
        name="firstName"
        label={<span>First name&nbsp;</span>}
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastName"
        label={<span>Last name&nbsp;</span>}
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;