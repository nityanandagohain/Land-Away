import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../store/actions/authActions';

class Navigation extends Component {
    state = {
        menu: false
    }

    toggleMenu = ()=>{
        this.setState({ menu: !this.state.menu })
    }
    render() {
        const show = (this.state.menu) ? "show" : "" ;
        return (
            <nav className='navmar navbar-expand-lg navbar-dark bg-dark'>
                <Link to='/'>
                    <span className="navbar-brand">Land Away</span>
                </Link>
                <button className="navbar-toggler" type="button" onClick={this.toggleMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={"collapse navbar-collapse " + show} id='nav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink to='/' activeClassName='active' exact>
                                <span className='nav-link'>
                                    Home
                                </span>
                            </NavLink>
                        </li>
                        {
                            this.props.auth.isAuthenticated ?
                                <React.Fragment>
                                    <li className='nav-item'>
                                        <NavLink to='/dashboard' activeClassName='active' exact>
                                            <span className='nav-link'>
                                                DashBoard
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <button className="btn btn-danger" onClick={() => this.props.logout(this.props.history)}> Logut </button>
                                    </li>
                                </React.Fragment>
                                :
                                <React.Fragment>

                                    <li className='nav-item'>
                                        <NavLink to='/login' activeClassName='active' exact>
                                            <span className='nav-link'>
                                                Login
                                            </span>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to='/register' activeClassName='active' exact>
                                            <span className='nav-link'>
                                                Register
                                            </span>
                                        </NavLink>
                                    </li>
                                </React.Fragment>
                        }


                    </ul>
                </div>

            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(withRouter(Navigation));