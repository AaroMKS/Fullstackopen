import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountry] = useState([])
  
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY


  const handleChange = (event) => {
    setValue(event.target.value)
  }
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountry(response.data)
      })
  }, [])

  const filterCountries = countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
  
  const Country = ({country}) => {
    const [weather, setWeather] = useState(null)
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const languages = Object.values(country.languages)


    useEffect(() => {

      const capital = country.capital
    
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
    }, [country])

     return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>

        <h3>languages:</h3>
        <ul>
          {languages.map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>

        <img src={country.flags.png} alt="flag" width="200" />
        {weather && (
          <div>
            <h3>Weather in {country.capital[0]}</h3>
            <p>Temperature {weather.main.temp} celsius</p>
            
            <img 
              
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>Wind {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    )
  }
  
  
  if (filterCountries.length > 10) {
    return (
      <div>
        find countries: <input value={value} onChange={handleChange} />
        <pre>
          Too many matches, specify another filter
        </pre>
      </div>
    )
  }
   if (filterCountries.length === 1) {
    return (
      <div>
        find countries: <input value={value} onChange={handleChange} />
        <pre>
          <Country country={filterCountries[0]} />
        </pre>
      </div>
    )
  }
  if (filterCountries.length < 10 &&  filterCountries.length > 1) {
    return (
      <div>
        find countries: <input value={value} onChange={handleChange} />
        <pre>
          {filterCountries.map(c => (
            <li key={c.cca3}>{c.name.common}
            <button onClick={() => setValue(c.name.common)}>Show</button>
            </li>
          ))}
          
        </pre>
      </div>
    )
}}


export default App
