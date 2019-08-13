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
        default:
            return state;
    }
}

export default transactionReducer;