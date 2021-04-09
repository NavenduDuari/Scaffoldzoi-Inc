import React, { Component } from 'react';
import './Header.scss';
import Avatar from 'antd/lib/avatar';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { ComponentPropsI } from './types';

class Header extends Component<ComponentPropsI> {
  menu = (
    <Menu>
      <Menu.Item disabled>Navendu Duari</Menu.Item>
      <Menu.Item
        onClick={() => {
          this.props.logOut();
        }}
      >
        Log out
      </Menu.Item>
    </Menu>
  );

  componentDidMount() {
    console.log('header component did mount');
  }

  render() {
    return (
      <div className="header-container">
        <div className="company-name">Scaffoldzoi Inc.</div>
        <Dropdown overlay={this.menu} trigger={['click']}>
          <Avatar className="user-avatar" size={32} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    );
  }
}

export default Header;
