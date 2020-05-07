import React, { useState, useEffect } from 'react'
import './App.css'
import CountryList from './components/CountryList'
import axios from 'axios'

const InputForm = ({ label, name, value, onChange }) => (
  <div>{label} <input type='text' name={name} value={value} onChange={onChange}></input></div>
)

const SearchForm = ({ filter, handleFilterChange }) => (
  <InputForm label='filter shown with' name='filter' value={filter} onChange={handleFilterChange} />
)

const App = () => {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState('')

  // Get country data from Country API, executed on startup
  useEffect(() => {
    const country_API_URI = 'https://restcountries.eu/rest/v2/all'
    // console.log('sending request')
    axios.get(country_API_URI).then((response) => {
      // console.log('response received', response.data)
      setCountries(response.data.map((country) => {
        return ({ ...country, show: false, wData: null })
      }))
    })
  }, [])

  // Get country data from Country API, executed when showCountry or countries changes
  useEffect(() => {
    const api_key = process.env.REACT_APP_WEATHER_API_KEY
    const weather_API_URI = 'http://api.weatherstack.com/current?access_key=' + api_key + '&query='
    const index = countries.findIndex((element) => element.name === showCountry.name)

    if (showCountry !== '' && !showCountry.wData) {
      // console.log('sending wData req for: ', showCountry)
      axios.get(weather_API_URI + showCountry.capital).then((response) => {
        const tmp_countries = [...countries]
        tmp_countries[index].wData = response.data.current
        setCountries(tmp_countries)
      })
    }
  }, [showCountry, countries])

  const toggleShowCountry = (country) => {
    if (country) {
      const index = countries.findIndex((element) => element.name === country.name)
      const tmp_countries = [...countries]
      tmp_countries[index].show = !tmp_countries[index].show
      setFilter(country.name)
      setShowCountry(country)
      setCountries(tmp_countries)
    }
  }

  const filteredList = () => {
    // console.log('creating filtered list')
    if (filter && countries) {
      // console.log('filter: ', filter)
      // console.log('countries: ', countries)
      return countries.filter(
        country =>
          country.name.toLowerCase()
            .includes(filter.toLowerCase()))
    }
    return countries
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value
    const tempList = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))
    // console.log('New Filter: ', newFilter)
    // console.log('Filtered list: ', tempList.map((country) => country.name))
    if (tempList && tempList.length === 1)
      setShowCountry(tempList[0])
    setFilter(newFilter)
  }

  return (
    <div>
      <SearchForm filter={filter} handleFilterChange={handleFilterChange} />
      <CountryList countries={filteredList()} toggleShowCountry={toggleShowCountry} />
      {/* {console.log(countries.filter((country) => country.wData).map((country) => country.wData))} */}
    </div>
  );
}

export default App
