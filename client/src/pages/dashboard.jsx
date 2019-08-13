import React, { Component } from 'react';
import { connect } from "react-redux";
import { loadTransactions } from "../store/actions/transactionActions";

class Dashboard extends Component {

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

                    <br></br>

                    <h1>Transactions</h1>
                    <ul className="list-group">
                        {
                            transactions.map(transaction => (
                                <li 
                                    key={transaction._id}
                                    className="list-group-item"

                                    >
                                        <p>Type: {transaction.type}</p>
                                        <p>Type: {transaction.amount}</p>
                                </li>
                            ))
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