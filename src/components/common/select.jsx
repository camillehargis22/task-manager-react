import React from 'react';

const Select = ({ name, label, options, error, value, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} value={value} {...rest} className="form-control">
                <option value="" />
                {options.map(option => (
                    <option key={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className='alert alert-danger'>{error}</div>}
        </div>
    );
}
 
export default Select;