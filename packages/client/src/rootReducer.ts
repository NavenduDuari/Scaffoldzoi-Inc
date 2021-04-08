import { combineReducers } from 'redux';
import profileReducer from './Containers/Profile/reducer';

const rootReducer = combineReducers({
  profileReducer,
});

export default rootReducer;
