// import React, { useState, useEffect } from 'react'
import React from 'react'

const Country = ({country, toggleShowCountry}) => (
    <div>
        <span>
        {country.name}
        </span>
        <button onClick={() => toggleShowCountry(country)}>
            show
        </button>
    </div>
)

const WeatherData = ({wData}) => {

  return (
    (wData === null) ? <div></div> :
      <div>
        <div>
          <b>temperature:</b> {wData.temperature} Celsius
        </div>
        <div>
          <img src={wData.weather_icons[0]} className="App-flag" alt="wicon"/>
        </div>
        <div>
            <b>wind:</b> {wData.wind_speed} mph direction {wData.wind_dir}
        </div>
      </div>
  )
}

const CountryFull = ({country}) => {
//   console.log(country)
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>
        population {country.population}
      </div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flag} className="App-flag" alt="logo" />
      <h3>Weather in {country.capital}</h3>
      {(country.wData) ? <WeatherData wData={country.wData}/> : "" }
    </div>
  )
}

const CountryList = ({countries, toggleShowCountry}) => {
  if (countries === '') return ''

  if (countries.length >= 10)
    return <div>Too many matches, specify another filter</div>
  else if (countries.length === 1) 
    return <CountryFull country={countries[0]}/>
  else 
    return countries
      .map(country => (
        <Country key={country.name} country={country} toggleShowCountry={toggleShowCountry}/>
      ))
}

export default CountryList