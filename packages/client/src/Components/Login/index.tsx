import React, { Component } from 'react';
import { ComponentPropsI } from './types';

class Login extends Component<ComponentPropsI> {
  componentDidMount() {
    console.log('login component did mount');
    this.props.performAuth();
  }

  render() {
    return <div>App Loads Here</div>;
  }
}

export default Login;
