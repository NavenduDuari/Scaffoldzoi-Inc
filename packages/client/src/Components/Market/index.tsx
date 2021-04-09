import React, { Component } from 'react';
import './Market.scss';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { ComponentPropsI, ComponentStateI } from './types';

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
        <div>market</div>
      </div>
    );
  }
}

export default Market;
