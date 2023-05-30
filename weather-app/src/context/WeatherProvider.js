import { useState } from "react";
import { WeatherContext } from "./WeatherContext";
import { getCountries } from "../services/CountryService";
import { getWeatherForCity } from "../services/WeatherService";

export const WeatherProvider = (props) => {
    const [countries, setCountries] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [favourites, setFavourites] = useState([]);
    const [cities, setCities] = useState([]);
    const [loadingForecast, setLoadingForecast] = useState(false);

    const getCountriesFromApi = () => {
        const getCountriesFromApi = async () => {
            const apiCountries = await getCountries();
            setCountries(apiCountries ?? []);
        }
        getCountriesFromApi();
    }

    const addFavourite = (country) => {
        setFavourites(prevState => [...prevState, country]);
    }

    const removeFavourite = (country) => {
        setFavourites(prevState => prevState.filter(x => x.country !== country.country));
    }

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