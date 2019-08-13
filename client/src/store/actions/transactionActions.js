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