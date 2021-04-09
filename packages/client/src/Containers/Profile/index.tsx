import React from 'react';
import { connect } from 'react-redux';
import './Profile.scss';
import Table from 'antd/lib/table';
import Space from 'antd/lib/space';
import Avatar from 'antd/lib/avatar';
import UserOutlined from '@ant-design/icons/UserOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import {
  MapDispatchToPropsI,
  MapStateToPropsI,
  PropsI,
  ComponentStateI,
  StoreStateI,
} from './types';
import { GlobalStateI } from '../../rootReducer';
import { getUserAction } from './action';

const rateChartCols = [
  {
    title: 'Orange Name',
    dataIndex: 'orangeName',
    key: 'orangeName',
  },
  {
    title: 'Price(INR/Kg)',
    dataIndex: 'orangePrice',
    key: 'orangePrice',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: any) => (
      <Space size="middle">
        {console.log('action :: ', text, record)}
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const rateChartData = [
  {
    key: '1',
    orangeName: 'John Brown',
    orangePrice: 32,
  },
  {
    key: '2',
    orangeName: 'John Brown',
    orangePrice: 32,
  },
  {
    key: '3',
    orangeName: 'John Brown',
    orangePrice: 32,
  },
  {
    key: '4',
    orangeName: 'John Brown',
    orangePrice: 32,
  },
  {
    key: '5',
    orangeName: 'John Brown',
    orangePrice: 32,
  },
  {
    key: '6',
    orangeName: 'John Brown',
    orangePrice: 32,
  },
];

const mapStateToProps = (globalState: GlobalStateI): MapStateToPropsI => {
  const state = globalState.profileReducer;
  return {
    userDetails: state.userDetails,
  };
};

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsI => ({
  getUser: (email: string) => dispatch(getUserAction(email)),
});

class Profile extends React.Component<PropsI, ComponentStateI> {
  constructor(props: PropsI) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    /* this.props.getUser('test1@mail.com'); */
    console.log('profile mounted');
  }

  componentDidUpdate() {
    console.log(this.props.userDetails);
  }

  render() {
    return (
      <div className="profile-container">
        <div className="profile-details">
          <Avatar shape="square" size={120} icon={<UserOutlined />} />
          <div className="info">
            <div className="name">
              <span>Name:</span>
              navendu duari
              <EditOutlined
                className="edit-icon"
                onClick={(e: React.MouseEvent) => {
                  console.log('edit name');
                }}
              />
            </div>
            <div className="description">
              <span>Description:</span>
              fullstack developer
              <EditOutlined
                className="edit-icon"
                onClick={(e: React.MouseEvent) => {
                  console.log('edit description');
                }}
              />
            </div>
            <div className="email">
              <span>Email:</span>
              navendu@mail.com
              <EditOutlined
                className="edit-icon"
                onClick={(e: React.MouseEvent) => {
                  console.log('edit email');
                }}
              />
            </div>
            <div className="password">
              <span>Password:</span>
              password
              <EditOutlined
                className="edit-icon"
                onClick={(e: React.MouseEvent) => {
                  console.log('edit password');
                }}
              />
            </div>
          </div>
        </div>
        <div className="rate-chart">
          <Table
            columns={rateChartCols}
            dataSource={rateChartData}
            pagination={{ position: ['none', 'none'] as any }}
            scroll={{ y: 340 }}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
