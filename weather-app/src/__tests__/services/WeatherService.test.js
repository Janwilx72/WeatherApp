import axios from 'axios';
import { getWeatherForCity } from "../../services/WeatherService";

// Mock Axios
jest.mock('axios');

describe('getWeatherForCity', () => {
    it('fetches weather data for a city from the API and returns the data', async () => {
        // Set up environment variable
        process.env.REACT_APP_WEATHER_STACK_KEY = 'testKey';

        // Setup
        const weather = { forecast: 'Rainy' };
        const resp = { data: weather };
        axios.get.mockResolvedValue(resp);

        // Call function and check result
        const result = await getWeatherForCity('City');
        expect(result).toEqual(weather);

        // Check that API call was made correctly
        const expectedUrl = 'http://api.weatherapi.com/v1/forecast.json?key=testKey&q=City&days=7&aqi=no';
        expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
});
