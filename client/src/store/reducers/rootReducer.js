import { combineReducers } from 'redux';
import authReducer from './authReducer';
import transactionReducer from './transactionReducer';

const rootReducers = combineReducers({
    auth: authReducer,
    transactions: transactionReducer
});

export default rootReducers;