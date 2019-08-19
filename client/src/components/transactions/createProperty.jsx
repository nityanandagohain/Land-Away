import React, { Component } from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {addNewTransaction} from '../../store/actions/propertyActions';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class CreateTransaction extends Component {
    state = {
        amount: 0,
        type: '',
        note: ''
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitHandler = event => {
        event.preventDefault();
        console.log(this.state);
        this.props.addNewTransaction(this.state);
        this.setState({
            amount: 0,
            type: '',
            note: ''
        })
    }

    render() {
        let {amount, type, note} = this.state;
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
                ariaHideApp={false}
            >
                <h2>Create A New Transaction</h2>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor={amount}>Amount :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter Amount"
                            name="amount"
                            id="amount"
                            value={amount}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={type}>Type :</label>
                        <select
                            className="form-control"
                            onChange={this.changeHandler}
                            name="type"
                        >
                            <option> Select A Type</option>
                            <option value="expense"></option>
                            <option value="income"></option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor={note}>Note :</label>
                        <textarea
                            className="form-control"
                            placeholder="Enter a Note"
                            name="note"
                            id="note"
                            value={note}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </Modal>
        )
    }
}

export default connect(null, {addNewTransaction})(CreateTransaction);