import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { addNewProperty } from '../../store/actions/propertyActions';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: "50rem"
    }
};


const initialState = {
    property_name: "",
    contact_email: "",
    contact_phone: "",
    price: 0,
    description: "",
    tags: [],
    state: "",
    country: "",
    locality: "",
    pincode: 0,
    error: {}
}

class CreateTransaction extends Component {
    state = initialState;

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.close();
        let data = {
            property_name: this.state.property_name,
            contact_email: this.state.contact_email,
            contact_phone: this.state.contact_phone,
            price: this.state.price,
            description: this.state.description,
            tags: this.state.tags,
            address: {
                state: this.state.state,
                country: this.state.country,
                locality: this.state.locality,
                pincode: this.state.pincode
            }
        }

        console.log(data);


        this.props.addNewProperty(data);
        this.setState(initialState);
        alert("New Property Added");
        this.props.close();
    }

    render() {
        let { property_name, contact_email, contact_phone, description, price, locality, state, pincode, country } = this.state;
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
                            placeholder="Enter Property Name"
                            name="property_name"
                            id="property_name"
                            value={property_name}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={description}>description :</label>
                        <textarea
                            className="form-control"
                            placeholder="Enter a description of the property"
                            name="description"
                            id="description"
                            value={description}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={contact_email}>Contact Email :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter email"
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
                            placeholder="Enter phone number"
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
                            placeholder="Enter price of the property"
                            name="price"
                            id="price"
                            value={price}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={locality}>Locality :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter locality name"
                            name="locality"
                            id="locality"
                            value={locality}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={state}>State :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter state name"
                            name="state"
                            id="state"
                            value={state}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={pincode}>pincode :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter pincde"
                            name="pincode"
                            id="pincode"
                            value={pincode}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor={country}>Country :</label>
                        <input
                            // className={error.email ? "form-control is-invalid" : "form-control"}
                            className="form-control"
                            placeholder="Enter country name"
                            name="country"
                            id="country"
                            value={country}
                            onChange={this.changeHandler}
                        />
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </Modal>
        )
    }
}

export default connect(null, { addNewProperty })(CreateTransaction);