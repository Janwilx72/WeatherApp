import { useContext, useEffect } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { LocationSearch } from "../components/search/LocationSearch";
import { WeatherCard } from "../components/weather/WeatherCard";
import {DotLoader} from "react-spinners";


export const Favourites = () => {
    const { forecast, setForecast, loadingForecast, selectedCity, setSelectedCity } = useContext(WeatherContext);

    useEffect(() => {
        setSelectedCity({});
        setForecast([]);
    }, [])

    return (
        <div className='flex flex-col relative absolute left-0 bottom-0 right-0 top-0'>
            <div className="grid place-items-center">
                <div className='flex mt-8'>
                    {/*Search Bar section*/}
                    <LocationSearch isFavourite={true}/>
                </div>

                {/*Display loader while data is fetched and weather data when data is retrieved successfully*/}
                <div className='flex w-full'>
                    {loadingForecast
                        ? <div className='grid place-items-center w-full'><DotLoader /></div>
                        : <div className='flex overflow-y-scroll overscroll-contain mx-8'>{forecast &&
                            forecast.map((dayForecast, index) => {
                                return <WeatherCard dayIndex={index} city={selectedCity} weather={dayForecast.day} date={dayForecast.date} />
                            })
                        }
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}