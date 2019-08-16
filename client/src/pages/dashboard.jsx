import React, { Component } from 'react';
import { connect } from "react-redux";
import { loadTransactions, removeTransaction } from "../store/actions/transactionActions";
import CreateTransaction from '../components/transactions/createTransaction';
import UpdateTransaction from '../components/transactions/UpdateTransaction';

class Dashboard extends Component {

    state = {
        createModalOpen: false,
        updateTransactionModalOpen: false,
        id: ''
    }

    onCreateModal = () => {
        this.setState({
            createModalOpen: true
        })
    }

    closeCreateModal = () => {
        this.setState({
            updateTransactionModalOpen: false
        })
    }

    onUpdateModal = (id) => {
        console.log("click");
        this.setState({
            updateTransactionModalOpen: true,
            id
        })
    }

    closeUpdateModal = () => {
        this.setState({
            createModalOpen: false,
            id: ''
        })
    }

    componentDidMount() {
        this.props.loadTransactions();
    }

    render() {
        let { auth, transactions } = this.props;
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>Welcome {auth.user.name}</h1>
                    <p>Your Eaill is {auth.user.email}</p>
                    <button
                        className="btn btn-primary"
                        onClick={this.onCreateModal}
                    >Create New Transaction</button>
                    <CreateTransaction
                        isOpen={this.state.createModalOpen}
                        close={this.closeCreateModal}
                    />
                    <br></br>

                    <h1>Transactions</h1>
                    <ul className="list-group">
                        {transactions.length > 0 ?
                            transactions.map(transaction => (
                                <li
                                    key={transaction._id}
                                    className="list-group-item"
                                >
                                    <p>Type: {transaction.type}</p>
                                    <p>Amount: {transaction.amount}</p>
                                    {
                                        this.state.id === transaction._id ?
                                            <UpdateTransaction
                                                isOpen={this.state.updateTransactionModalOpen}
                                                close={this.closeUpdateModal}
                                                transaction = {transaction}
                                            /> : null
                                    }
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => this.props.removeTransaction(transaction._id)}
                                    >Remove</button>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => this.onUpdateModal(transaction._id)}
                                    >Update</button>
                                </li>
                            )) : <p>hello</p>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
});

export default connect(mapStateToProps, { loadTransactions, removeTransaction})(Dashboard);