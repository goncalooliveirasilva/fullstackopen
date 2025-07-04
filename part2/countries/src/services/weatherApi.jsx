import axios from 'axios'
const apiKey = import.meta.env.VITE_WEATHER_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getCountryWeather = (lat, lon) => {
    const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    return request.then(response => response.data)
}

export default getCountryWeather