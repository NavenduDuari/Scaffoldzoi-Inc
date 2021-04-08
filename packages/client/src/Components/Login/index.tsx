import React, { Component } from 'react';
import './Login.scss';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { ComponentPropsI, ComponentStateI } from './types';

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class Login extends Component<ComponentPropsI, ComponentStateI> {
  constructor(props: ComponentPropsI) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    console.log('login component did mount');
    /* this.props.performAuth('test1@mail.com', 'test1@pass'); */
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="title">Welcome</div>
          <Form {...layout} validateMessages={validateMessages}>
            <Form.Item
              name="email"
              label="Email"
              hasFeedback
              rules={[{ required: true }, { type: 'email' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              hasFeedback
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              hasFeedback
              dependencies={['password']}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
          <Button className="submit-btn" type="primary">
            {this.props.componentTitle}
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
