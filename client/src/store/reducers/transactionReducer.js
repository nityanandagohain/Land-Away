import * as Types from '../actions/types';

const init = []

const transactionReducer = (state = init, action) => {
    switch (action.type) {
        case Types.LOAD_TRANSACTIONS:
            {
                return action.payload.transactions;
            }
        case Types.CREATE_TRANSACTION:
            {
                let transactions = [...state]
                transactions.unshift(action.payload.transaction);
                return transactions
            }
        case Types.REMOVE_TRANSACTION:
            {
                let transactions = [...state];
                return transactions.filter(trans => {
                    return trans._id !== action.payload.id
                })
            }
        case Types.UPDATE_TRANSACTION:
            {
                let transactions = [...state];
                return transactions.map(trans => {
                    if (trans._id == action.payload.transaction.id) {
                        return action.payload.transacation
                    }
                    return trans;
                })
            }
        default:
            return state;
    }
}

export default transactionReducer;