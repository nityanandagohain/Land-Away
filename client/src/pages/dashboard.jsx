import React, { Component } from 'react';
import { connect } from "react-redux";
import { loadTransactions } from "../store/actions/transactionActions";
import CreateTransaction from '../components/transactions/createTransaction';

class Dashboard extends Component {

    state = {
        createModalOpen: false
    }

    onCreateModal = () => {
        this.setState({
            createModalOpen: true
        })
    }

    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        })
    }

    componentDidMount() {
        this.props.loadTransactions();
    }

    render() {
        let {auth, transactions } = this.props;
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
                        { transactions.length >0 ?
                            transactions.map(transaction => (
                                <li 
                                    key={transaction._id}
                                    className="list-group-item"
                                    >
                                        <p>Type: {transaction.type}</p>
                                        <p>Type: {transaction.amount}</p>
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

export default connect(mapStateToProps, {loadTransactions})(Dashboard);