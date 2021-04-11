import React from 'react';
import { connect } from 'react-redux';
import './Profile.scss';
import Form, { FormInstance } from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Avatar from 'antd/lib/avatar';
import UserOutlined from '@ant-design/icons/UserOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
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
  deleteRateAction,
  updateRateAction,
} from './action';
import { ProfileType } from '../../utils/types';
import RateChart from '../../Components/RateChart/index';

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

  deleteRate: (id: string) => dispatch(deleteRateAction(id)),

  updateRate: (id: string, jobs: { path: string[]; value: any }[]) =>
    dispatch(updateRateAction(id, jobs)),

  updateUser: (id: string, path: string[], value: any) =>
    dispatch(updateUserAction(id, path, value)),
});

class Profile extends React.Component<PropsI, ComponentStateI> {
  constructor(props: PropsI) {
    super(props);
    this.state = {
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
              {isOwer && !editProfileName && (
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
              {isOwer && !editProfileDescription && (
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
              {isOwer && !editProfileEmail && (
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
        {userDetails.profileType === ProfileType.Seller && (
          <RateChart
            rateChart={this.props.rateChart}
            insertRate={this.props.insertRate}
            deleteRate={this.props.deleteRate}
            updateRate={this.props.updateRate}
            isProfileOwner={isOwer}
          />
        )}
      </div>
    );
  }
}

Profile.contextType = Context;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
