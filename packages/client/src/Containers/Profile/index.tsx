import React from 'react';
import { connect } from 'react-redux';
import './Profile.scss';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Avatar from 'antd/lib/avatar';
import UserOutlined from '@ant-design/icons/UserOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import {
  MapDispatchToPropsI,
  MapStateToPropsI,
  PropsI,
  ComponentStateI,
  StoreStateI,
} from './types';
import { GlobalStateI } from '../../rootReducer';
import { getUserAction, getRateChartAction, insertRateAction } from './action';
import { RateI } from '../../utils/types';

const mapStateToProps = (globalState: GlobalStateI): MapStateToPropsI => {
  const state = globalState.profileReducer;
  return {
    userDetails: state.userDetails,
    rateChart: state.rateChart,
  };
};

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsI => ({
  getUser: (email: string) => dispatch(getUserAction(email)),

  getRateChart: (email: string) => dispatch(getRateChartAction(email)),

  insertRate: (orangeName: string, orangePrice: number) =>
    dispatch(insertRateAction(orangeName, orangePrice)),
});

class Profile extends React.Component<PropsI, ComponentStateI> {
  constructor(props: PropsI) {
    super(props);
    this.state = {
      rowIdToEdit: '',
      rowIdToDelete: '',
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.profileId);
    console.log('profile mounted');
  }

  componentDidUpdate(prevProps: PropsI) {
    console.log(this.props.userDetails);
    if (this.props.userDetails.email !== prevProps.userDetails.email) {
      console.log('rate chart requested');
      this.props.getRateChart(this.props.userDetails.email);
    }
  }

  getRateChartRow = (rate: RateI) => (
    <div className="table-row">
      {this.state.rowIdToEdit !== '--row_id' ? (
        <>
          <div className="table-col">{rate.goodsMeta.type}</div>
          <div className="table-col">{rate.goodsMeta.price}</div>
        </>
      ) : (
        <>
          <Input value="orange 220" />
          <Input value="12" />
        </>
      )}
      <div className="table-col">
        <Button
          icon={<EditOutlined />}
          onClick={() => this.setState({ rowIdToEdit: '__row_id' })}
        />
        <Button
          icon={<DeleteOutlined />}
          onClick={() => this.setState({ rowIdToDelete: '__row_id' })}
        />
      </div>
    </div>
  );

  render() {
    console.log(this.state.rowIdToDelete, this.state.rowIdToEdit);
    return (
      <div className="profile-container">
        <div className="profile-details">
          <Avatar shape="square" size={120} icon={<UserOutlined />} />
          <div className="info">
            <div className="name">
              <span>Name:</span>
              {this.props.userDetails.username}
              <EditOutlined
                className="edit-icon"
                onClick={(e: React.MouseEvent) => {
                  console.log('edit name');
                }}
              />
            </div>
            <div className="description">
              <span>Description:</span>
              {this.props.userDetails.description}
              <EditOutlined
                className="edit-icon"
                onClick={(e: React.MouseEvent) => {
                  console.log('edit description');
                }}
              />
            </div>
            <div className="email">
              <span>Email:</span>
              {this.props.userDetails.email}
              <EditOutlined
                className="edit-icon"
                onClick={(e: React.MouseEvent) => {
                  console.log('edit email');
                }}
              />
            </div>
            <div
              className="password"
              onClick={(e: React.MouseEvent) => {
                console.log('edit password');
              }}
            >
              Change password
            </div>
          </div>
        </div>
        <div className="rate-chart">
          <div className="table-header">
            <div className="table-col">Orange Name</div>
            <div className="table-col">Price (INR/Kg)</div>
            <div className="table-col">Actions</div>
          </div>
          <div className="table-body">
            {this.props.rateChart.map((r) => this.getRateChartRow(r))}
          </div>

          <div className="table-footer">
            <Form
              layout="inline"
              onFinish={(values: {
                orangeName: string;
                orangePrice: number;
              }) => {
                console.log(values);
                this.props.insertRate(values.orangeName, values.orangePrice);
              }}
            >
              <Form.Item className="table-col" name="orangeName">
                <Input />
              </Form.Item>
              <Form.Item className="table-col" name="orangePrice">
                <Input />
              </Form.Item>
              <Form.Item className="table-col">
                <Button type="primary" htmlType="submit">
                  ADD
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
