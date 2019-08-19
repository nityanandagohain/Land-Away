import axiosApi from '../../utils/axios_custom';

import * as Types from './types';

export const loadProperties = () => dispatch => {
    axiosApi.get('/api/properties')
        .then(res => {
            dispatch({
                type: Types.LOAD_PROPERTIES,
                payload: {
                    properties: res.data
                }
            })

        })
        .catch(err => {
            console.log(err)
        })
}

export const addNewTransaction = (transaction) => dispatch => {
    axiosApi.post('/api/transactions', transaction)
        .then(response => {
            dispatch({ type: Types.CREATE_PROPERTY, payload: { transaction: response.data } })
        })
        .catch(err => {
            console.log(err);
        })
}

export const removeTransaction = id => dispatch => {
    axiosApi.delete(`/api/transactions/${id}`)
        .then(response => {
            dispatch({ type: Types.REMOVE_PROPERTY, payload: { id: response.data._id } });
        })
        .catch(err => {
            console.log(err);
        });
}

export const updateTransaction = (id, transaction) => dispatch => {
    axiosApi.put(`api/transactions/${id.trim()}`, transaction)
        .then(result => {
            console.log("trans", result);
            dispatch({ type: Types.UPDATE_PROPERTY, payload: { transaction: result.data.transaction } })
        })
        .catch(err => {
            console.log(err);
        })
}