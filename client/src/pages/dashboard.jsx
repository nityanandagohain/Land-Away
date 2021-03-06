import React, { Component } from 'react';
import { connect } from "react-redux";
import { loadProperties, removeTransaction } from "../store/actions/propertyActions";
import CreateTransaction from '../components/transactions/createProperty';
import UpdateTransaction from '../components/transactions/UpdateProperty';

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
            createModalOpen: false
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
        this.props.loadProperties();
    }

    render() {
        let { auth, properties } = this.props;
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>Welcome {auth.user.name}</h1>
                    <p>Your Eaill is {auth.user.email}</p>
                    <button
                        className="btn btn-primary"
                        onClick={this.onCreateModal}
                    >New Property</button>
                    <CreateTransaction
                        isOpen={this.state.createModalOpen}
                        close={this.closeCreateModal}
                    />
                    <br></br>

                    <h1>Transactions</h1>
                    <ul className="list-group">
                        {properties.length > 0 ?
                            properties.map(property => (
                                <li
                                    key={property._id}
                                    className="list-group-item"
                                >
                                    <p>Type: {property.type}</p>
                                    <p>Amount: {property.amount}</p>
                                    {
                                        this.state.id === property._id ?
                                            <UpdateTransaction
                                                isOpen={this.state.updateTransactionModalOpen}
                                                close={this.closeUpdateModal}
                                                transaction = {property}
                                            /> : null
                                    }
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => this.props.removeTransaction(property._id)}
                                    >Remove</button>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => this.onUpdateModal(property._id)}
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
    properties: state.properties
});

export default connect(mapStateToProps, { loadProperties, removeTransaction})(Dashboard);