import React, { Component } from 'react';
import './Market.scss';
import Avatar from 'antd/lib/avatar';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { ComponentPropsI, ComponentStateI } from './types';
import Context from '../../Containers/App/appContext';

const getSellerCard = (redirectTo: (url: string) => void) => (
  <div
    className="card-container"
    onClick={() => {
      console.log('card clicked');
      redirectTo('/profile');
    }}
  >
    <Avatar className="avatar" size={45} icon={<UserOutlined />} />
    <div className="title-n-description">
      <div className="name">Navendu -the orange seller</div>
      <div className="description">this is description</div>
    </div>
  </div>
);

class Market extends Component<ComponentPropsI, ComponentStateI> {
  constructor(props: ComponentPropsI) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log('market component did mount');
    // get all sellers
  }

  render() {
    return (
      <div className="market-container">
        {getSellerCard(this.context.redirectTo)}
      </div>
    );
  }
}

Market.contextType = Context;

export default Market;
