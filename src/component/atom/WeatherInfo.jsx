import React from 'react';

const WeatherInfo = ({ title, value }) => {
    return (
        <div className='flex justify-between items-center'>
            <h2 className='text-2xl'>{title}</h2>
            <h2 className='text-xl text-indigo-400'>{value}</h2>
        </div>
    );
};

export default WeatherInfo;
