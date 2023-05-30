
export const WeatherCard = (props) => {

    const weather = props.weather;

    return (
        <div className='flex flex-col bg-gray-100 rounded-2xl mx-1 mt-8 p-8'>
            {props.dayIndex === 0
                ? <span>Today</span>
                : <span>{props.date}</span>
            }

            <div className='grid place-items-center'>
                {weather.condition &&
                    <img src={weather.condition.icon}/>
                }
            </div>

            <span>Temperature: {weather.avgtemp_c} &#8451; <br/><br/></span>

            {weather.condition.icon &&
                <span>{weather.condition.text}<br/><br/></span>
            }

            <span>Wind Speed: {weather.maxwind_kph} KPH<br/><br/></span>

            <span>Total Precipitation: {weather.totalprecip_mm} mm<br/></span>

        </div>
    )
}