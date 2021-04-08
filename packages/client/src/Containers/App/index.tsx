import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Profile from '../Profile/index';
import Login from '../../Components/Login/index';

import {
  PropsI,
  ComponentStateI,
  StoreStateI,
  MapStateToPropsI,
  MapDispatchToPropsI,
} from './types';
import { performAuthAction, loadLocalTokenAction } from './action';
import { GlobalStateI } from '../../rootReducer';
import Header from '../../Components/Header/index';

const mapStateToProps = (globalState: GlobalStateI): MapStateToPropsI => {
  const state = globalState.appReducer;
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsI => ({
  loadLocalToken: () => dispatch(loadLocalTokenAction()),
  performAuth: (email: string, password: string) =>
    dispatch(performAuthAction(email, password)),
});

class App extends React.Component<PropsI, ComponentStateI> {
  constructor(props: PropsI) {
    super(props);
  }

  componentDidMount() {
    console.log('App mounted');
    this.props.loadLocalToken();
  }

  render() {
    return (
      <>
        <Header />
        <Router>
          <Switch>
            <Route
              exact
              path="/profile/:id"
              render={(routeProps) => {
                const profileId = routeProps.match.params.id;
                return <Profile profileId={profileId} />;
              }}
            />
            <Route
              exact
              path="/login"
              render={(routeProps) => (
                <Login
                  componentTitle="Login"
                  performAuth={this.props.performAuth}
                />
              )}
            />

            <Route
              exact
              path="/signup"
              render={(routeProps) => (
                <Login
                  componentTitle="Signup"
                  performAuth={this.props.performAuth}
                />
              )}
            />
          </Switch>
        </Router>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
