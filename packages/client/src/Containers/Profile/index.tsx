import React from 'react';
import { connect } from 'react-redux';
import './Profile.scss';
import Form, { FormInstance } from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Avatar from 'antd/lib/avatar';
import UserOutlined from '@ant-design/icons/UserOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import Context from '../App/appContext';
import {
  MapDispatchToPropsI,
  MapStateToPropsI,
  PropsI,
  ComponentStateI,
  StoreStateI,
} from './types';
import { GlobalStateI } from '../../rootReducer';
import {
  getUserAction,
  getRateChartAction,
  insertRateAction,
  updateUserAction,
} from './action';
import { ProfileType, RateI, UserDetailsI } from '../../utils/types';
import { isNumber, isString } from '../../utils/type-checker';

const checkPrice = (_: any, value: { number: number }) => {
  if (value.number > 0) {
    return Promise.resolve();
  }
  return Promise.reject();
};

const mapStateToProps = (globalState: GlobalStateI): MapStateToPropsI => {
  const state = globalState.profileReducer;
  return {
    userDetails: state.userDetails,
    rateChart: state.rateChart,
  };
};

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsI => ({
  getUser: (email: string) => dispatch(getUserAction(email)),

  getRateChart: (id: string) => dispatch(getRateChartAction(id)),

  insertRate: (orangeName: string, orangePrice: number) =>
    dispatch(insertRateAction(orangeName, orangePrice)),

  updateUser: (id: string, path: string[], value: any) =>
    dispatch(updateUserAction(id, path, value)),
});

class Profile extends React.Component<PropsI, ComponentStateI> {
  formRef = React.createRef<FormInstance>();

  constructor(props: PropsI) {
    super(props);
    this.state = {
      rowIdToEdit: '',
      rowIdToDelete: '',
      editProfileName: false,
      editProfileDescription: false,
      editProfileEmail: false,
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.profileId);
  }

  componentDidUpdate(prevProps: PropsI) {
    if (this.props.profileId !== prevProps.profileId) {
      this.props.getUser(this.props.profileId);
    }
    if (this.props.userDetails._id !== prevProps.userDetails._id) {
      this.props.getRateChart(this.props.userDetails._id);
    }
  }

  getRateChartRow = (rate: RateI) => {
    const isOwer = this.props.userDetails._id === this.context.loggedInUser._id;
    return (
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
        {isOwer && (
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
        )}
      </div>
    );
  };

  render() {
    const {
      editProfileName,
      editProfileEmail,
      editProfileDescription,
    } = this.state;

    const { userDetails } = this.props;
    const { loggedInUser } = this.context;
    const isOwer = userDetails._id === loggedInUser._id;

    return (
      <div className="profile-container">
        <div className="profile-details">
          <Avatar shape="square" size={120} icon={<UserOutlined />} />
          <div className="info">
            <div className="name">
              <span>Name:</span>
              {editProfileName ? (
                <Input
                  autoFocus
                  defaultValue={userDetails.username}
                  onBlur={() => this.setState({ editProfileName: false })}
                  onPressEnter={(e: React.KeyboardEvent) => {
                    this.props.updateUser(
                      userDetails._id,
                      ['username'],
                      (e.target as any).value
                    );
                    this.setState({ editProfileName: false });
                  }}
                />
              ) : (
                userDetails.username
              )}
              {isOwer && (
                <EditOutlined
                  className="edit-icon"
                  onClick={() => this.setState({ editProfileName: true })}
                />
              )}
            </div>
            <div className="description">
              <span>Description:</span>
              {editProfileDescription ? (
                <Input
                  autoFocus
                  defaultValue={userDetails.description}
                  onBlur={() =>
                    this.setState({ editProfileDescription: false })
                  }
                  onPressEnter={(e: React.KeyboardEvent) => {
                    this.props.updateUser(
                      userDetails._id,
                      ['description'],
                      (e.target as any).value
                    );
                    this.setState({ editProfileDescription: false });
                  }}
                />
              ) : (
                userDetails.description
              )}
              {isOwer && (
                <EditOutlined
                  className="edit-icon"
                  onClick={() =>
                    this.setState({ editProfileDescription: true })
                  }
                />
              )}
            </div>
            <div className="email">
              <span>Email:</span>
              {editProfileEmail ? (
                <Input
                  autoFocus
                  defaultValue={userDetails.email}
                  onBlur={() => this.setState({ editProfileEmail: false })}
                  onPressEnter={(e: React.KeyboardEvent) => {
                    this.props.updateUser(
                      userDetails._id,
                      ['email'],
                      (e.target as any).value
                    );
                    this.setState({ editProfileEmail: false });
                  }}
                />
              ) : (
                userDetails.email
              )}
              {isOwer && (
                <EditOutlined
                  className="edit-icon"
                  onClick={() => this.setState({ editProfileEmail: true })}
                />
              )}
            </div>
            {isOwer && (
              <div
                className="password"
                onClick={(e: React.MouseEvent) => {
                  console.log('edit password');
                }}
              >
                Change password
              </div>
            )}
          </div>
        </div>
        {(loggedInUser as UserDetailsI).profileType === ProfileType.Seller && (
          <div className="rate-chart">
            <div className="table-header">
              <div className="table-col">Orange Name</div>
              <div className="table-col">Price (₹/Kg)</div>
              {isOwer && <div className="table-col">Actions</div>}
            </div>
            <div className="table-body">
              {this.props.rateChart.map((r: RateI) => this.getRateChartRow(r))}
            </div>

            {isOwer && (
              <div className="table-footer">
                <Form
                  ref={this.formRef}
                  layout="inline"
                  onFinish={(values: {
                    orangeName: string;
                    orangePrice: number;
                  }) => {
                    const { orangeName } = values;
                    const orangePrice = Number(values.orangePrice);
                    if (isString(orangeName) && isNumber(orangePrice)) {
                      this.props.insertRate(orangeName, orangePrice);
                    }
                    this.formRef.current?.resetFields();
                  }}
                >
                  <Form.Item className="table-col" name="orangeName">
                    <Input placeholder="Enter orange name" />
                  </Form.Item>
                  <Form.Item className="table-col" name="orangePrice">
                    <Input placeholder="Enter orange price" />
                  </Form.Item>
                  <Form.Item className="table-col">
                    <Button type="primary" htmlType="submit">
                      ADD
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Profile.contextType = Context;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
