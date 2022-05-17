import React, { Component } from 'react';
import Form from './common/form';
import auth from '../services/authService';

class Account extends Form {
    // want to make form for user to update info, but will wait for now
    render() {
        const user = auth.getCurrentUser();
        // console.log(`user: ${JSON.stringify(user)}`);
        return (
            <div>
                <h1>{user.name} Account</h1>
                <div>
                    <h3>Name: {user.name}</h3>
                    <h3>Email: {user.email}</h3>
                </div>
            </div>
        );
    }
}
 
export default Account;