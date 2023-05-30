import { useState } from "react";
import { WeatherContext } from "./WeatherContext";
import { getCountries } from "../services/CountryService";
import { getWeatherForCity } from "../services/WeatherService";

// Creates the Provider to make the state accessible to the containers
export const WeatherProvider = (props) => {
    const [countries, setCountries] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [favourites, setFavourites] = useState([]);
    const [cities, setCities] = useState([]);
    const [loadingForecast, setLoadingForecast] = useState(false);

    // Make the API call to retrieve a list of countries
    const getCountriesFromApi = () => {
        const getCountriesFromApi = async () => {
            const apiCountries = await getCountries();
            setCountries(apiCountries ?? []);
        }
        getCountriesFromApi();
    }

    // Add a favourite country to the state
    const addFavourite = (country) => {
        setFavourites(prevState => [...prevState, country]);
    }

    // Remove a country from the favourites array
    const removeFavourite = (country) => {
        setFavourites(prevState => prevState.filter(x => x.country !== country.country));
    }

    // Perform the API call to fetch the forecasted weather data
    const clickSearchWeather = async () => {
        if (!selectedCity) {
            alert('No city selected')
            return;
        }

        try {
            setLoadingForecast(true);
            const weatherData = await getWeatherForCity(selectedCity);
            setSelectedCity(selectedCity);
            setForecast(weatherData.forecast.forecastday);
        }
        catch (e) {
            alert('Error fetching Weather data');
        }
        finally {
            setLoadingForecast(false);
        }
    }

    // Exposes the following to the containers housed within the Provider
    const provider = {
        countries,
        forecast,
        setForecast,
        selectedCity,
        favourites,
        getCountriesFromApi,
        cities,
        setCities,
        clickSearchWeather,
        setSelectedCity,
        addFavourite,
        removeFavourite,
        loadingForecast,
        setLoadingForecast
    }

    return (
        <WeatherContext.Provider value={provider}>
            {props.children}
        </WeatherContext.Provider>
    )
}