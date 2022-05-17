import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';
import Complete from './complete';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    // validate entire form
    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }

        // console.log(`errors: ${Object.keys(errors)}`);

        return errors;
    };

    // validate a property
    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    };

    // handle submit
    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    // handle change
    handleChange = ({ currentTarget: input }) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    handleCheck = () => {
        const data = {...this.state.data};
        data.isComplete = !data.isComplete;
        this.setState({ data });
    };

    handleTagChange = ({ currentTarget: input }) => {
        // validate because tags is an array
        const errors = {...this.state.errors};
        const obj = { [input.name]: input.value };
        const schema = { [input.name]: Joi.string().required() };
        const { error } = Joi.validate(obj, schema);

        const errorMessage = error ? error.details[0].message : null;
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = {...this.state.data};
        data.tags[input.id] = input.value;
        this.setState({ data, errors });

        // again, the focus leaves the input after 1 change,
        // not sure if it's a bug or because my computer
        // is running so slow at the moment, but will worry
        // about it later
        // this now seems to be fine, I changed the key to
        // the index of the tags array
    };

    renderButton(label) {
        return (
            <button
                className="btn btn-primary"
                disabled={this.validate()}
            >
                {label}
            </button>
        );
    };

    renderInput(name, label, type = 'text') {

        const { data, errors } = this.state;

        return (
            <Input
                type={type}
                name={name}
                value={data[name]}
                label={label}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    };

    renderTagInput(name, label, index, type = 'text') {
        const { data, errors } = this.state;

        const value = data.tags[index];

        return (
            <Input
                type={type}
                name={name}
                value={value}
                label={label}
                onChange={this.handleTagChange}
                error={errors[name]}
                id={index}
            />
        );
    };

    renderSelect(name, label, options) {
        const { data, errors } = this.state;
      
        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    };

    renderComplete(name, label) {
        const { data } = this.state;

        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <Complete
                    onClick={this.handleCheck}
                    complete={data[name]}
                />
            </div>
        );
    };
}
 
export default Form;