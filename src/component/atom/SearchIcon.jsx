import React from 'react'

const SearchIcon = ({ onClick, disabled = false, children }) => {
    return (
        <button
            className={`py-2 px-4 rounded-md ${disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
                }`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default SearchIcon