import { useContext, useEffect, useState } from "react";
import { getCities } from "../../services/CityService";
import { Button } from "@mui/material";
import { WeatherContext } from "../../context/WeatherContext";
import { useNavigate } from "react-router";

export const LocationSearch = (props) => {

    const {
        countries,
        getCountriesFromApi,
        cities,
        setCities,
        setSelectedCity,
        clickSearchWeather,
        favourites,
        addFavourite,
        removeFavourite
    } = useContext(WeatherContext);

    const [isFavourite, setIsFavourite] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setCities();
        setSelectedCity();
        if (!props.isFavourite) {
            getCountriesFromApi();
        }
    },[])

    const onCountrySelectChange = (selectedCountryIndex) => {
        const selectedCountry = countries[selectedCountryIndex];
        const selectedCities = getCities(selectedCountry);
        setCities(selectedCities);
        setSelectedCountry(selectedCountry);
        getFavouriteText(selectedCountry);
    }

    const onCitySelectChange = (selectedCityIndex) => {
        setSelectedCity(cities[selectedCityIndex]);
    }

    const getFavouriteText = (selectedCountry) => {
        const country = favourites.filter(fav => fav.country === selectedCountry.country);
        if ((country?.length ?? 0) > 0) {
            setIsFavourite(true);
        }
        else {
            setIsFavourite(false);
        }
    }

    const clickToggleFavourite = () => {
        if (isFavourite) {
            setIsFavourite(false);
            removeFavourite(selectedCountry);
        }
        else {
            setIsFavourite(true);
            addFavourite(selectedCountry);
        }
    }

    const viewFavourites = () => {
        navigate('/favourites');
    }

    const viewAllCountries = () => {
        navigate('/');
    }

    const renderSelects = () => {
        if (props.isFavourite && favourites.length === 0) {
            return renderNoFavourites();
        }

        return (
            <div className='flex space-x-2'>
                <select className='border' onChange={(e) => onCountrySelectChange(e.target.value)}>
                    <option selected hidden>
                        Select your country
                    </option>
                    {!props.isFavourite
                        ? countries.map((country, index) => {
                            return (
                                <option key={index} value={index}>
                                    {country.country}
                                </option>
                            )
                        })
                        :   favourites.map((country, index) => {
                            return (
                                <option key={index} value={index}>
                                    {country.country}
                                </option>
                            )
                        })
                    }

                </select>

                <select className='border' onChange={(e) => onCitySelectChange(e.target.value)}>
                    <option selected hidden>
                        Select your city
                    </option>
                    {cities && cities.map((city, index) => {
                        return (
                            <option key={index} value={index}>
                                {city}
                            </option>
                        )
                    })}
                </select>
            </div>
        )
    }

    const renderNoFavourites = () => {
        return <div>
            <span>You currently have no favourites</span>
        </div>
    }

    return (
        <div className='flex space-x-4'>

            {renderSelects()}

            <Button variant='contained' onClick={(e) => clickSearchWeather()}>Search</Button>

            {!props.isFavourite
                ?   <Button onClick={() => clickToggleFavourite()} color='secondary' variant='contained'>{!isFavourite ? 'Favourite' : 'Unfavourite'}</Button>
                :   <Button onClick={() => viewAllCountries()} color='secondary' variant='contained'>View all Countries</Button>
            }

            {!props.isFavourite &&
                <Button onClick={() => viewFavourites()} color='secondary' variant='contained'>View Favourites</Button>
            }


        </div>
    )

}