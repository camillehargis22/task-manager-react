import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import userService from '../services/userService';
import { toast } from 'react-toastify';
import auth from '../services/authService';

class Register extends Form {
    state = {
        data: {
            name: '',
            username: '',
            password: ''
        },
        errors: {}
    };

    schema = {
        name: Joi.string().min(2).max(50).required().label('Name'),
        username: Joi.string().min(5).max(255).email().required().label('Email'),
        password: Joi.string().min(5).max(255).required().label('Password')
    };

    doSubmit = async () => {
        // console.log('Submitted Register');
        try {
            const response = await userService.register(this.state.data);
            auth.loginWithJwt(response.headers['x-auth-token']); // this function is not working as expected, so after registration, sending user to login
            window.location = '/login';
            toast('Successfully Registered!');
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    };

    render() { 
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('name', 'Name')}
                    {this.renderInput('username', 'Email', 'email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }
}
 
export default Register;