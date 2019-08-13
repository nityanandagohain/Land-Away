import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import * as Types from './store/actions/types'
import jwtDecode from 'jwt-decode';

// Get the token if it is stored in the local storage
// i.e the user has logged in previously
const token = localStorage.getItem('auth_token');

// If the token is present then dispath the action
// i.e sign the user in without connecting to server
if (token) {
    let decode = jwtDecode(token)
    store.dispatch({
        type: Types.SET_USER,
        payload: {
            user: decode
        }
    });
}

ReactDOM.render( < Provider store = { store } >
        <
        App / >
        <
        /Provider> , document.getElementById('root'));

        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: https://bit.ly/CRA-PWA
        serviceWorker.unregister();