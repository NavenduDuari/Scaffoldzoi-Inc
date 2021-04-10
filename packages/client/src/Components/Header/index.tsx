import React, { Component } from 'react';
import './Header.scss';
import Avatar from 'antd/lib/avatar';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import UserOutlined from '@ant-design/icons/UserOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import HomeFilled from '@ant-design/icons/HomeFilled';
import Context from '../../Containers/App/appContext';
import { ComponentPropsI } from './types';
import { UserDetailsI } from '../../utils/types';

class Header extends Component<ComponentPropsI> {
  getMenu = () => {
    const loggedInUser = this.context.loggedInUser as UserDetailsI;
    return (
      <Menu>
        <Menu.Item
          onClick={() => this.context.redirectTo(`/p/${loggedInUser._id}`)}
        >
          View profile
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            this.props.logOut();
          }}
        >
          Log out
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    const loggedInUser = this.context.loggedInUser as UserDetailsI;
    return (
      <div className="header-container">
        <HomeFilled
          className="home-icon"
          onClick={() => this.context.redirectTo('/')}
        />
        <div
          className="company-name"
          onClick={() => this.context.redirectTo('/')}
        >
          Scaffoldzoi Inc.
        </div>
        {this.context.token && (
          <Dropdown overlay={this.getMenu()} trigger={['click']}>
            <div>
              <div className="user-name">{loggedInUser.username}</div>
              <Avatar
                className="user-avatar"
                size={32}
                icon={<UserOutlined />}
              />
              <DownOutlined />
            </div>
          </Dropdown>
        )}
      </div>
    );
  }
}

Header.contextType = Context;

export default Header;
