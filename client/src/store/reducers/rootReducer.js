import { combineReducers } from 'redux';
import authReducer from './authReducer';
import propertyReducer from './propertyReducer';

const rootReducers = combineReducers({
    auth: authReducer,
    properties: propertyReducer
});

export default rootReducers;