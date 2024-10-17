import React, { useEffect, useState } from 'react';
import { ALL_COUNTRIES_URL, COUNTRY_DETAILS_URL, makeRequest } from './api';
import { Country, CountryDetails } from './types';
import './App.css';

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await makeRequest<Country[]>(ALL_COUNTRIES_URL);
        setCountries(countries);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const showCountryInfo = async (alphaCode: string) => {
    try {
      const country = await makeRequest<CountryDetails>(COUNTRY_DETAILS_URL(alphaCode));
      setSelectedCountry(country);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h3>Countries</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          countries.map(country => (
            <div
              key={country.alpha3Code}
              onClick={() => showCountryInfo(country.alpha3Code)}
              style={{ cursor: 'pointer', padding: '5px' }}
            >
              {country.name}
            </div>
          ))
        )}
      </div>
      <div className="details">
        {selectedCountry ? (
          <>
            <h2>{selectedCountry.name}</h2>
            <img src={selectedCountry.flag} alt={`Flag of ${selectedCountry.name}`} style={{ width: '100px', marginBottom: '10px' }} />
            <p><strong>Code:</strong> {selectedCountry.alpha3Code}</p>
            <p><strong>Population:</strong> {selectedCountry.population}</p>
            <p><strong>Region:</strong> {selectedCountry.region}</p>
            <h4>Borders:</h4>
            <ul className="borders-list">
              {selectedCountry.borders && selectedCountry.borders.length > 0 ? (
                selectedCountry.borders.map(border => {
                  const borderCountry = countries.find(c => c.alpha3Code === border);
                  return borderCountry ? (
                    <li key={border}>{borderCountry.name}</li>
                  ) : null;
                })
              ) : (
                <li>No borders</li>
              )}
            </ul>
          </>
        ) : (
          <h4>Choose a country</h4>
        )}
      </div>
    </div>
  );
};

export default App;