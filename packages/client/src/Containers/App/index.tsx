import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom';
import { AppContextProvider } from './appContext';
import { GlobalStateI } from '../../rootReducer';
import {
  PropsI,
  ComponentStateI,
  StoreStateI,
  MapStateToPropsI,
  MapDispatchToPropsI,
  TokenStatus,
} from './types';

import {
  performAuthAction,
  loadLocalTokenAction,
  getAllSellersAction,
  logOutAction,
} from './action';
import Profile from '../Profile/index';
import Header from '../../Components/Header/index';
import Market from '../../Components/Market/index';
import Login from '../../Components/Login/index';
import { LogInRoutePurpose } from '../../utils/types';

const mapStateToProps = (globalState: GlobalStateI): MapStateToPropsI => {
  const state = globalState.appReducer;
  return {
    token: state.token,
    tokenStatus: state.tokenStatus,
    loggedInUser: state.loggedInUser,
    sellers: state.sellers,
  };
};

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsI => ({
  loadLocalToken: () => dispatch(loadLocalTokenAction()),

  performAuth: (
    purpose: LogInRoutePurpose,
    name: string,
    email: string,
    password: string,
    profileType: string
  ) => dispatch(performAuthAction(purpose, name, email, password, profileType)),

  getAllSellers: () => dispatch(getAllSellersAction()),

  logOut: () => dispatch(logOutAction()),
});

const redirectTo = (routeProps: RouteComponentProps, url: string) => {
  routeProps.history.push(url);
};

class App extends React.Component<PropsI, ComponentStateI> {
  componentDidMount() {
    this.props.loadLocalToken();
  }

  appRoute = () => (
    <Switch>
      <Route
        exact
        path="/login"
        render={(routeProps: RouteComponentProps) => {
          if (this.props.token) {
            return <Redirect to="/" />;
          }
          return (
            <Login
              componentTitle="Login"
              performAuth={this.props.performAuth}
              token={this.props.token}
            />
          );
        }}
      />

      <Route
        exact
        path="/signup"
        render={(routeProps) => {
          if (this.props.token) {
            return <Redirect to="/" />;
          }
          return (
            <Login
              componentTitle="Signup"
              performAuth={this.props.performAuth}
              token={this.props.token}
            />
          );
        }}
      />

      <Route
        exact
        path="/p/:id"
        render={(routeProps) => {
          const profileId = routeProps.match.params.id;
          if (!this.props.token) {
            return <Redirect to="/login" />;
          }
          return <Profile profileId={profileId} />;
        }}
      />

      <Route
        path="/"
        render={(routeProps) => {
          if (!this.props.token) {
            return <Redirect to="/login" />;
          }
          return (
            <Market
              getAllSellers={this.props.getAllSellers}
              sellers={this.props.sellers}
            />
          );
        }}
      />
    </Switch>
  );

  render() {
    if (this.props.tokenStatus === TokenStatus.YetToFetch) {
      return <></>;
    }
    return (
      <>
        <Router>
          <Switch>
            <Route
              path="/"
              render={(routeProps) => (
                <AppContextProvider
                  value={{
                    redirectTo: (url: string) => redirectTo(routeProps, url),
                    token: this.props.token,
                    loggedInUser: this.props.loggedInUser,
                  }}
                >
                  <Header logOut={this.props.logOut} />
                  {this.appRoute()}
                </AppContextProvider>
              )}
            />
          </Switch>
        </Router>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
