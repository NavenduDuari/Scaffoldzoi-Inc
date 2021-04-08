import React, { Component } from 'react';
import './Header.scss';
import Avatar from 'antd/lib/avatar';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { ComponentPropsI } from './types';

class Header extends Component<ComponentPropsI> {
  componentDidMount() {
    console.log('header component did mount');
  }

  render() {
    return (
      <div className="header-container">
        <div className="company-name">Scaffoldzoi Inc.</div>
        <div className="avatar-container">
          <Avatar size={32} icon={<UserOutlined />} />
        </div>
      </div>
    );
  }
}

export default Header;
