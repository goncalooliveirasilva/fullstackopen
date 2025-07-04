import { useState, useEffect } from "react";
import getCountryWeather from "../services/weatherApi"

const Weather = ({capitalName, lat, lon}) => {
    const [weather, setWeather] = useState(null)
    console.log(lat, lon);
    
    const toCelsius = (tempKelvin) => {
        return (tempKelvin - 273.15).toFixed(2)
    }
    useEffect(() => {
        getCountryWeather(lat, lon)
            .then(fetchedWeather => {
                setWeather(fetchedWeather)
                console.log(fetchedWeather);
            })
    }, [])

    if (weather) {
        console.log(weather)
        return (
        <div>
            <h2>Weather in {capitalName}</h2>
            <p>Temperature {toCelsius(weather.main.temp)} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
    }
}

export default Weather