import React from 'react';
import { connect } from 'react-redux';
import { getUserAction } from './action';
import {
  MapDispatchToPropsI,
  MapStateToPropsI,
  PropsI,
  ComponentStateI,
  StoreStateI,
} from './types';

class Profile extends React.Component<PropsI, ComponentStateI> {
  constructor(props: PropsI) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getUser('test1@mail.com');
  }

  render() {
    console.log(this.props.userDetails);
    return (
      <div>
        <div>Profile Loads Here</div>
      </div>
    );
  }
}

const mapStateToProps = (state: StoreStateI): MapStateToPropsI => ({
  userDetails: state.userDetails,
});

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsI => ({
  getUser: (email: string) => dispatch(getUserAction(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
