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
import { UserDetailsI } from '../../utils/types';

const mapStateToProps = (globalState: GlobalStateI): MapStateToPropsI => {
  const state = globalState.appReducer;
  return {
    token: state.token,
    tokenStatus: state.tokenStatus,
  };
};

const mapDispatchToProps = (dispatch: any): MapDispatchToPropsI => ({
  loadLocalToken: () => dispatch(loadLocalTokenAction()),

  performAuth: (email: string, password: string) =>
    dispatch(performAuthAction(email, password)),

  getAllSellers: () => dispatch(getAllSellersAction()),

  logOut: () => dispatch(logOutAction()),
});

const redirectTo = (routeProps: RouteComponentProps, url: string) => {
  routeProps.history.push(url);
};

class App extends React.Component<PropsI, ComponentStateI> {
  constructor(props: PropsI) {
    super(props);
    this.state = {
      redirectedToLoginPage: false,
    };
  }

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
        path="/profile/:id"
        render={(routeProps) => {
          const profileId = routeProps.match.params.id;
          return <Profile profileId={profileId} />;
        }}
      />

      <Route
        exact
        path="/"
        render={(routeProps) => (
          <Market
            getAllSellers={this.props.getAllSellers}
            sellers={[] as UserDetailsI[]}
          />
        )}
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
                if (
                  this.props.tokenStatus === TokenStatus.Fetched &&
                  !this.props.token &&
                  !this.state.redirectedToLoginPage
                ) {
                  this.setState({ redirectedToLoginPage: true });
                  redirectTo(routeProps, '/login');
                }
                return (
                  <AppContextProvider
                    value={{
                      redirectTo: (url: string) => redirectTo(routeProps, url),
                      token: this.props.token,
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
