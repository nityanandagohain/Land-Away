import axios from 'axios'


const axiosApi = axios.create({});

export const setAuthHeader = (token) => {
    axiosApi.defaults.headers.common['Authorization'] = `${localStorage.getItem('auth_token')}`;
}

setAuthHeader(localStorage.getItem('ACCESS_TOKEN'));
export default axiosApi;