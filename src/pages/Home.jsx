import React, { useState } from 'react'
import SearchIcon from '../component/atom/SearchIcon';
import InputField from '../component/atom/InputField';

const Home = () => {
    const appId = "5e6b71725c2ab72b537cb7c0c6e6a2b3";

    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);


    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}%2C{{Pakistan}}&APPID=${appId}`
            );

            if (response.ok) {
                const data = await response.json();
                console.log("data", data);
                setWeatherData(data);
                setError(null);
            } else {
                setError("Failed to fetch weather data");
            }
        } catch (error) {
            console.log("error", error);
            setError("Error occurred while fetching weather data");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim() !== "") {
            fetchWeatherData();
        }
    };
    return (
        <div className=' w-full md:w-1/2 border border-indigo-500 rounded-lg flex flex-col items-center p-10  '>
            <h1 className='text-3xl font-bold text text-indigo-500 mb-10'>Weather App</h1>
            <div className=' w-full text-center pb-10'>
                <form onSubmit={handleSubmit} className=' flex  gap-2'>
                    <InputField label="Username:" placeholder="Enter City Name" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                    <SearchIcon type="submit" disabled={false} >Search</SearchIcon>
                </form>

                {error && <p className='text-red-600 pt-6'>{error}</p>}
            </div>

            {weatherData && (
                <div className='w-full '>
                    <div className='flex justify-around items-center  '>
                        <h2 className='text-2xl '>Weather Location</h2>
                        <h2 className='text-xl text-indigo-400 '>{weatherData.name}</h2>
                    </div>
                    <div className='flex justify-around items-center  '>
                        <h2 className='text-2xl '>Temperature</h2>
                        <h2 className='text-xl text-indigo-400 '>{Math.round(weatherData.main.temp - 273.15)}°C</h2>
                    </div>

                    {weatherData.weather.map((item, index) => (
                        <div key={index}>
                            <div className='flex justify-around items-center  '>
                                <h2 className='text-2xl '>Conditions</h2>
                                <h2 className='text-xl text-indigo-400 '>{item.description}</h2>
                            </div>
                            <div className='flex justify-around items-center  '>
                                <h2 className='text-2xl '>Status Icon</h2>
                                <img
                                    src={`http://openweathermap.org/img/w/${item.icon}.png`}
                                    alt={item.description}
                                />
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home