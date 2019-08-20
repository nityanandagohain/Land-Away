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
        property_name : "",
        contact_email : "",
        contact_phone : "",
        price : 0,
        description: "",
        tags: [],
        address: {
            state: "",
            country: "",
            locality: "",
            pin: 0
        }
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
        let {property_name, contact_email, contact_phone, price, type, note} = this.state;
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
                        <label htmlFor={property_name}>Property Name :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter Amount"
                            name="property_name"
                            id="property_name"
                            value={property_name}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={contact_email}>Contact Email :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter Amount"
                            name="contact_email"
                            id="contact_email"
                            value={contact_email}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={contact_phone}>Contact Phone :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter Amount"
                            name="contact_phone"
                            id="contact_phone"
                            value={contact_phone}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={price}>Contact Phone :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter Amount"
                            name="price"
                            id="price"
                            value={price}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={contact_email}>Type :</label>
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