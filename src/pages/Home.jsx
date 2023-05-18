import { useEffect, useState } from 'react'
import SearchButton from '../component/atom/SearchButton';
import InputField from '../component/atom/InputField';
import { fetchWeatherData } from '../services';
import WeatherInfo from '../component/atom/WeatherInfo';


const Home = () => {

    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        if (city.trim() !== "") {
            fetchWeatherData(city)
                .then((res) => {
                    if (res.error) {
                        alert(res.message)
                        setError(true);
                    }
                    setWeatherData(res.payload);
                    setError(null);

                })
                .catch((err) => {
                    setError(true);
                    alert('failed to fetch weather data', err)
                })
                .finally(() => setLoading(false));
        }

    };
    useEffect(() => {
        if (city.trim() === '') {
            setWeatherData(null);
        }
    }, [city]);
    return (
        <>
            <div className='w-full md:w-1/3 h-4/6 border border-indigo-500 rounded-lg flex flex-col items-center p-1 md:p-10'>
                <h1 className='text-3xl font-bold text-indigo-500 mb-10'>Weather App</h1>
                <div className='w-full text-center pb-10'>
                    <form onSubmit={handleSubmit} className='flex gap-2'>
                        <InputField
                            label='Username:'
                            placeholder='Enter City Name'
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <SearchButton type='submit' disabled={city.trim() === ''}>
                            Search
                        </SearchButton>
                    </form>
                    {error && <p className='text-red-600 pt-6'>{error}</p>}
                </div>
                {loading ? (
                    'Loading...'
                ) : (
                    city.trim() !== '' && weatherData && (
                        <div className='w-full'>
                            <WeatherInfo title='Location' value={weatherData.name} />
                            <WeatherInfo
                                title='Temperature'
                                value={`${Math.round(weatherData.main.temp - 273.15)}°C`}
                            />
                            {weatherData.weather.map((item, index) => (
                                <div key={index}>
                                    <WeatherInfo title='Conditions' value={item.description} />
                                    <WeatherInfo
                                        title='Status Icon'
                                        value={
                                            <img
                                                src={`http://openweathermap.org/img/w/${item.icon}.png`}
                                                alt={item.description}
                                            />
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
            <p>Developed By: Ishtiaq Ahmad</p>
        </>
    )
}

export default Home