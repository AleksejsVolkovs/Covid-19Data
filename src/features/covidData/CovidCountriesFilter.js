import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { countriesSet, countryUpdated } from './covidDataSlice'

// Component that returns a combo box for filtering data by countries
let CovidCountriesFilter = () => {
// Getting variables values from redux store
    const { records, country } = useSelector(state => state.covidData)
const dispatch = useDispatch()

// Updating the country value depending on the selection
const handleChange = (e) => {
dispatch(countryUpdated(e.target.value))
}

// Getting a list of countries from the general data
const renderCountries = () => {
    let out = []
	let items = records
for (var i=0, len=items.length; i<len; i++) {
    if (out.indexOf(items[i].countriesAndTerritories) === -1) {
out.push(items[i].countriesAndTerritories);
}
}
return out;
}

// Set Received countries to storage
useEffect(() => {
    dispatch(countriesSet(renderCountries()))
    }, [])

    // Get countries from the redux store
const { countries } = useSelector(state => state.covidData)

return (
<div className="col-lg-3 col-md-6 col-sm-12 mb-3">
<form className="form-control">
<div className="text-center">
<p><label className="form-label">Фильтрация по странам</label></p>
<select value={country === 'Все страны' ? 'Все страны' : country} onChange={handleChange}
className="form-select" aria-label="Фильтрация по странам">
<option>Все страны</option>
{countries.map((item, index) => {return <option key={index}>{item}</option>})}
</select>
</div>
</form>
</div>
	)
	}

	export default CovidCountriesFilter