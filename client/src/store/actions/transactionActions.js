import axiosApi from '../../utils/axios_custom';

import * as Types from './types';

export const loadTransactions = () => dispatch => {
    axiosApi.get('/api/transactions')
        .then(res => {
            dispatch({
                type: Types.LOAD_TRANSACTIONS,
                payload: {
                    transactions: res.data
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
            dispatch({ type: Types.CREATE_TRANSACTION, payload: { transaction: response.data } })
        })
        .catch(err => {
            console.log(err);
        })
}

export const removeTransaction = id => dispatch => {
    axiosApi.delete(`/api/transactions/${id}`)
        .then(response => {
            dispatch({ type: Types.REMOVE_TRANSACTION, payload: { id: response.data._id } });
        })
        .catch(err => {
            console.log(err);
        });
}

export const updateTransaction = (id, transaction) => dispatch => {
    axiosApi.put(`api/transactions/${id.trim()}`, transaction)
        .then(result => {
            console.log("trans", result);
            dispatch({ type: Types.UPDATE_TRANSACTION, payload: { transaction: result.data.transaction } })
        })
        .catch(err => {
            console.log(err);
        })
}