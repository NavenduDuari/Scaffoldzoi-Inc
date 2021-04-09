import React, { Component } from 'react';
import './Market.scss';
import Avatar from 'antd/lib/avatar';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { ComponentPropsI, ComponentStateI } from './types';
import Context from '../../Containers/App/appContext';
import { UserDetailsI } from '../../utils/types';

const getSellersCard = (
  sellers: UserDetailsI[],
  redirectTo: (url: string) => void
) =>
  sellers.map((seller) => (
    <div
      className="card-container"
      key={seller._id}
      onClick={() => {
        console.log('card clicked');
        redirectTo(`/p/${seller._id}`);
      }}
    >
      <Avatar className="avatar" size={45} icon={<UserOutlined />} />
      <div className="title-n-description">
        <div className="name">{seller.username}</div>
        <div className="description">{seller.description}</div>
      </div>
    </div>
  ));

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

  render() {
    console.log(this.props.sellers);
    return (
      <div className="market-container">
        {getSellersCard(this.props.sellers, this.context.redirectTo)}
      </div>
    );
  }
}

Market.contextType = Context;

export default Market;
