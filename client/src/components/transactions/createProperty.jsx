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
        // this.props.addNewTransaction(this.state);
        // this.setState({
        //     amount: 0,
        //     type: '',
        //     note: ''
        // })
    }

    render() {
        let {property_name, contact_email, contact_phone, description, address, price} = this.state;
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
                ariaHideApp={false}
            >
                <h2>Add a new property</h2>
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
                        <label htmlFor={price}>Price :</label>
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
                        <label htmlFor={price}>Price :</label>
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
                        <label htmlFor={address.locality}>Locality :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter Amount"
                            name="locality"
                            id="locality"
                            value={address.locality}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={address.pin}>pin :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter Amount"
                            name="pin"
                            id="pin"
                            value={address.pin}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={address.state}>State :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter Amount"
                            name="state"
                            id="state"
                            value={address.state}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={address.country}>Country :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter Amount"
                            name="country"
                            id="country"
                            value={address.country}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={description}>description :</label>
                        <textarea
                            className="form-control"
                            placeholder="Enter a Note"
                            name="description"
                            id="description"
                            value={description}
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