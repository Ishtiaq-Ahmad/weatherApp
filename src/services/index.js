const apiUrl = "https://api.openweathermap.org";
const apiKey = "5e6b71725c2ab72b537cb7c0c6e6a2b3";

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
