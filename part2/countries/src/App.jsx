import { useState, useEffect } from 'react'
import countriesApi from './services/countriesApi'
import Search from './components/Search'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    countriesApi
      .getAll()
      .then(fetchedCountries => {
        setCountries(fetchedCountries)
        console.log(fetchedCountries);
      })
  }, [])

  const countriesToShow = () => {
    if (countryFilter === '') return []
    const countriesList = countries.filter((country) => country.name.common.toLowerCase().startsWith(countryFilter.toLowerCase()))
    if (countriesList.length > 10) return null
    return countriesList
  }


  return (
    <div>
      <Search value={countryFilter} onChange={setCountryFilter} />
      <Countries countries={countriesToShow()} filter={countryFilter} />
    </div>
  )
}


export default App
