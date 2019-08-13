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