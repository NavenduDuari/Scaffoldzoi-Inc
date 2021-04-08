import React from 'react';
import { connect } from 'react-redux';
import { GlobalStateI } from '../../rootReducer';
import { getUserAction } from './action';
import {
  MapDispatchToPropsI,
  MapStateToPropsI,
  PropsI,
  ComponentStateI,
  StoreStateI,
} from './types';

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
    this.props.getUser('test1@mail.com');
  }

  componentDidUpdate() {
    console.log(this.props.userDetails);
  }

  render() {
    console.log(this.props.userDetails);
    return (
      <div>
        <div onClick={() => console.log(this.props.userDetails)}>
          Profile Loads Here
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
