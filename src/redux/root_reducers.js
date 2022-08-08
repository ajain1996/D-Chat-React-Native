import { combineReducers } from 'redux';
import login_reducer from './reducers/login_reducer';
import profile_reducer from './reducers/profile_reducer';
import signup_reducer from './reducers/signup_reducer';

const rootReducer = combineReducers({
    loginReducer: login_reducer,
    signupReducer: signup_reducer,
    profileReducer: profile_reducer,
});

export default rootReducer;