import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { logout } from '../store/actions/authActions';
import { loadProperties } from '../store/actions/propertyActions';

class Home extends Component {
    componentDidMount() {
        this.props.loadProperties();
    }
    render() {
        let { properties } = this.props;
        return (
            <div className="container">
                <h1> Properties </h1>
                {properties.length > 0 ?
                    properties.map(property => (
                        <li
                            key={property._id}
                            className="list-group-item"
                        >
                            <p>{property.property_name}</p>
                            <p>Amount: {property.price}</p>
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
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    properties: state.properties
})

export default connect(mapStateToProps, { loadProperties, logout })(Home);