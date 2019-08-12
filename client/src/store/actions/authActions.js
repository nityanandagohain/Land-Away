import Axios from 'axios';
import * as Types from './types';
import jwtDecode from 'jwt-decode';

export const register = (user, history) => dispatch => {
    Axios.post('/api/users/register', user)
        .then(res => {

            // Remove any previous error
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: {}
                }
            });
            console.log(res);
            history.push("/login");
        })
        .catch(err => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: err.response.data
                }
            });
        });
}

export const login = (user, history) => dispatch => {
    Axios.post('/api/users/login', user)
        .then(res => {
            // decode our token
            let token = res.data.token
            localStorage.setItem('auth_token', token);
            let decode = jwtDecode(token);
            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: decode
                }
            })

            history.push("/")
                // save our token to local storage
                // set AUth header
                // dispatch SET user
        })
        .catch(err => {
            console.log(err.response.data);
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: err.response.data
                }
            })
        })
}