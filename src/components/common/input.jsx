import React from 'react';

const Input = ({ name, label, value, onChange, error, type, id = name }) => {

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                name={name}
                type={type}
                className='form-control'
                id={id}
            />
            {error && <div className='alert alert-danger'>
                {error}
            </div>}
        </div>
    );
}
 
export default Input;