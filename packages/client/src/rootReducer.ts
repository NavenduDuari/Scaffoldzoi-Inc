import { combineReducers } from 'redux';
import appReducer from './Containers/App/reducer';
import { StoreStateI as appStoreStateI } from './Containers/App/types';
import profileReducer from './Containers/Profile/reducer';
import { StoreStateI as profileStoreStateI } from './Containers/Profile/types';

export interface GlobalStateI {
  appReducer: appStoreStateI;
  profileReducer: profileStoreStateI;
}

const rootReducer = combineReducers({
  appReducer,
  profileReducer,
});

export default rootReducer;
