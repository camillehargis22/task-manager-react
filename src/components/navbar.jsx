import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/' className="navbar-brand">
                Task Manager
            </Link>
            <button
                className="navbar-toggler"
                type='button'
                data-toggle='collapse'
                data-target='#navbarNavAltMarkup'
                aria-controls='navbarNavAltMarkup'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id='navbarNavAltMarkup'>
                <NavLink to='/tasks' className="nav-item nav-link">Tasks</NavLink>
                {!user && (
                    <React.Fragment>
                        <NavLink to='/login' className="nav-item nav-link">Login</NavLink>
                        <NavLink to='/register' className="nav-item nav-link">Register</NavLink>
                    </React.Fragment>
                )}
                {user && (
                    <React.Fragment>
                        <NavLink to='/admin' className="nav-item nav-link">Admin</NavLink>
                        <NavLink to='/myaccount' className="nav-item nav-link">Account</NavLink>
                        <NavLink to='/logout' className="nav-item nav-link">Logout</NavLink>
                    </React.Fragment>
                )}
            </div>
        </nav>
    );
}
 
export default NavBar;