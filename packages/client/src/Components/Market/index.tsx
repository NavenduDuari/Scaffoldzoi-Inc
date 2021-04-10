import React, { Component } from 'react';
import './Market.scss';
import Avatar from 'antd/lib/avatar';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { ComponentPropsI, ComponentStateI } from './types';
import Context from '../../Containers/App/appContext';
import { UserDetailsI } from '../../utils/types';

class Market extends Component<ComponentPropsI, ComponentStateI> {
  constructor(props: ComponentPropsI) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log('market component did mount');
    // get all sellers
    this.props.getAllSellers();
  }

  getSellersCard = (sellers: UserDetailsI[]) =>
    sellers.map((seller) => {
      if (seller._id === this.context.loggedInUser._id) {
        return <></>;
      }
      return (
        <div
          className="card-container"
          key={seller._id}
          onClick={() => {
            console.log('card clicked');
            this.context.redirectTo(`/p/${seller._id}`);
          }}
        >
          <Avatar className="avatar" size={45} icon={<UserOutlined />} />
          <div className="title-n-description">
            <div className="name">{seller.username}</div>
            <div className="description">{seller.description}</div>
          </div>
        </div>
      );
    });

  render() {
    console.log(this.props.sellers);
    return (
      <div className="market-container">
        {this.getSellersCard(this.props.sellers)}
      </div>
    );
  }
}

Market.contextType = Context;

export default Market;
