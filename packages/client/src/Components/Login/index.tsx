import React, { Component } from 'react';
import './Login.scss';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import { ComponentPropsI, ComponentStateI } from './types';
import Context from '../../Containers/App/appContext';
import { LogInRoutePurpose, ProfileType } from '../../utils/types';

const { Option } = Select;

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

    this.state = {};
  }

  componentDidUpdate(prevProps: ComponentPropsI) {
    if (!prevProps.token && this.props.token) {
      this.context.redirectTo('/');
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="title">Welcome</div>
          <Form
            {...layout}
            validateMessages={validateMessages}
            onFinish={(values: {
              email: string;
              password: string;
              profileType: string;
            }) => {
              const purpose =
                this.props.componentTitle === 'Login'
                  ? LogInRoutePurpose.Login
                  : LogInRoutePurpose.Signup;
              this.props.performAuth(
                purpose,
                values.email,
                values.password,
                values.profileType
              );
            }}
            onFinishFailed={(e: any) => {
              console.log(e);
            }}
          >
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
            {this.props.componentTitle === 'Signup' && (
              <>
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

                <Form.Item
                  name="profileType"
                  label="ProfileType"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="You are a Buyer or a Seller?">
                    <Option value={ProfileType.Buyer}>Buyer</Option>
                    <Option value={ProfileType.Seller}>Seller</Option>
                  </Select>
                </Form.Item>
              </>
            )}
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button className="submit-btn" type="primary" htmlType="submit">
                {this.props.componentTitle}
              </Button>
            </Form.Item>
          </Form>
          <div className="alternate-opt">
            <div className="msg">
              {this.props.componentTitle === 'Signup'
                ? 'Already registered? '
                : 'Not yet registered? '}
              <div
                className="next-url"
                onClick={() => {
                  const nextUrl = `/${
                    this.props.componentTitle === 'Signup' ? 'login' : 'signup'
                  }`;
                  this.context.redirectTo(nextUrl);
                }}
              >
                {this.props.componentTitle === 'Signup' ? 'Login' : 'Signup'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextType = Context;

export default Login;
