import Weather from "./Weather"

const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>
                <p>Capital: {country.capital}</p>
                <p>Area: {country.area}</p>
            </div>
            <h2>Languages</h2>
            <div>
                <ul>
                    {country.languages ? (
                        <ul>
                            {Object.values(country.languages).map((language, index) => (
                                <li key={index}>{language}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No languages</p>
                    )}
                </ul>
            </div>
            <div>
                <img style={{border: 'solid'}} src={country.flags.png} alt="" />
            </div>
            <Weather capitalName={country.capital[0]} lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]} />
        </div>
    )
}

export default Country