import { useState, useEffect } from "react";
import Country from "./Country";
import Button from "./Button";

const Countries = ({countries, filter}) => {
    const [selectedCountry, setSelectedCountry] = useState(null)
    console.log(countries);

    useEffect(() => {
        setSelectedCountry(null)
    }, [filter])

    if (countries === null) return <div>Too many matches, specify another filter</div>

    if (selectedCountry) return <Country country={selectedCountry} />

    if (countries.length > 1) {
        return (
            <div>
                {countries.map((country) => (
                    <div key={country.cca2}>
                        <p>{country.name.common}</p>
                        <Button 
                            text={"Show"} 
                            onClick={() => setSelectedCountry(country)} 
                        />
                    </div>
                ))}
            </div>
        )
    }
    if (countries.length === 1) {
        return <Country country={countries[0]} />
    }
}
 
export default Countries