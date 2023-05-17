import React from 'react';

const InputField = ({ label = 'Label', type = 'text', value, onChange, placeholder = 'User Name' }) => {
    return (

        <input
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={onChange}
            className="border w-full border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
    );
};

export default InputField;
