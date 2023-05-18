const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const fetchWeatherData = async (city) => {
    try {
        const response = await fetch(
            `${apiUrl}/data/2.5/weather?q=${city}%2C{{Pakistan}}&APPID=${apiKey}`
        );

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Failed to fetch weather data");
        }

        const data = await response.json();
        return { error: false, payload: data };
    } catch (error) {
        return { error: true, message: error.message };
    }
};
