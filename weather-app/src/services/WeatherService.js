import axios from "axios";

export const getWeatherForCity = async (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_STACK_KEY;

    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no`;

    const weatherData = await axios.get(url);
    console.log('Current Weather: ', weatherData.data);
    return weatherData.data;
}