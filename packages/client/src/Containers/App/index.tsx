import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
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

  performAuth: (email: string, password: string, profileType: string) =>
    dispatch(performAuthAction(email, password, profileType)),

  getAllSellers: () => dispatch(getAllSellersAction()),

  logOut: () => dispatch(logOutAction()),
});

const redirectTo = (routeProps: RouteComponentProps, url: string) => {
  routeProps.history.push(url);
};

class App extends React.Component<PropsI, ComponentStateI> {
  /* constructor(props: PropsI) { */
  /*   super(props); */
  /* } */

  componentDidMount() {
    console.log('App mounted');
    this.props.loadLocalToken();
  }

  componentDidUpdate(prevProps: PropsI) {
    if (this.props.tokenStatus !== this.props.tokenStatus) {
      console.log('tokenStatus changed');
    }
  }

  appRoute = () => (
    <Switch>
      <Route
        exact
        path="/login"
        render={(routeProps: RouteComponentProps) => (
          <Login
            componentTitle="Login"
            performAuth={this.props.performAuth}
            token={this.props.token}
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
            token={this.props.token}
          />
        )}
      />

      <Route
        exact
        path="/p/:id"
        render={(routeProps) => {
          const profileId = routeProps.match.params.id;
          if (!this.props.token) {
            return (
              <Login
                componentTitle="Signup"
                performAuth={this.props.performAuth}
                token={this.props.token}
              />
            );
          }
          return <Profile profileId={profileId} />;
        }}
      />

      <Route
        exact
        path="/"
        render={(routeProps) => {
          if (!this.props.token) {
            return (
              <Login
                componentTitle="Signup"
                performAuth={this.props.performAuth}
                token={this.props.token}
              />
            );
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
    console.log(this.props.tokenStatus);
    return (
      <>
        <Router>
          <Switch>
            <Route
              path="/"
              render={(routeProps) => {
                /* if ( */
                /*   this.props.tokenStatus === TokenStatus.Fetched && */
                /*   !this.props.token && */
                /*   !this.state.redirectedToLoginPage */
                /* ) { */
                /*   this.setState({ redirectedToLoginPage: true }); */
                /*   redirectTo(routeProps, '/login'); */
                /* } */
                console.log('this is test');
                return (
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
                );
              }}
            />
          </Switch>
        </Router>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
