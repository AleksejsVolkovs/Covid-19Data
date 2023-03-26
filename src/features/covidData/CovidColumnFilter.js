import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { columnsSet, columnUpdated, columnValueFromUpdated, columnValueToUpdated } from './covidDataSlice'

import './style.css'

// component that returns a combo box for filtering data by properties
let CovidColumnFilter = () => {

//getting values ​​from redux store
let { records, hidden } = useSelector(state => state.covidData)
let { columns, column, columnValueFrom, columnValueTo } = useSelector(state => state.covidData)

let dispatch = useDispatch()
// Changing the value of a column from a selection
let handleChange = (e) => {
dispatch(columnUpdated(e.target.value))
}

// Variables for changing colors in text fields
let classNameFromAndTo = ''
let [inputTextColorFrom, setInputTextColorFrom] = useState(classNameFromAndTo)
let [inputTextColorTo, setInputTextColorTo] = useState(classNameFromAndTo)
// Changing text input color when typing wrong character by adding css class into first input field
let handleValueFrom = (e) => {
    let characterCheck = false
    if (column === 'dateRep') {
        characterCheck = /[^\d{2}/\d{2}/\d{4}]/g.test(e.target.value)
        } else if (column === 'day' || column === 'month' || column === 'year' || column === 'cases' || column === 'deaths' || column === 'popData2019' || column === 'Cumulative_number_for_14_days_of_COVID-19_cases_per_100000') {
        characterCheck = /\D/g.test(e.target.value)
    } else if (column === 'geoId' || column === 'countryterritoryCode') {
        characterCheck = /[^A-Z]/g.test(e.target.value)
        } else if (column === 'countriesAndTerritories' || column === 'continentExp') {
            characterCheck = /[^A-Za-z]/g.test(e.target.value)
    }

if (characterCheck === true) {
    setInputTextColorFrom('')
    classNameFromAndTo += 'redText'
     setInputTextColorFrom(classNameFromAndTo)
     } else {
        setInputTextColorFrom('')
        classNameFromAndTo += 'autoTextColor'
        setInputTextColorFrom(classNameFromAndTo)
    }
dispatch(columnValueFromUpdated(e.target.value))
    }
    
    // Changing text input color when typing wrong character by adding css class into second input field
    let handleValueTo = (e) => {
        let characterCheck = false
        if (column === 'dateRep') {
            characterCheck = /[^\d{2}/\d{2}/\d{4}]/g.test(e.target.value)
            } else if (column === 'day' || column === 'month' || column === 'year' || column === 'cases' || column === 'deaths' || column === 'popData2019' || column === 'Cumulative_number_for_14_days_of_COVID-19_cases_per_100000') {
            characterCheck = /\D/g.test(e.target.value)
        } else if (column === 'geoId' || column === 'countryterritoryCode') {
            characterCheck = /[^A-Z]/g.test(e.target.value)
            } else if (column === 'countriesAndTerritories' || column === 'continentExp') {
                characterCheck = /[^A-Za-z]/g.test(e.target.value)
        }
    
        if (characterCheck === true) {
            setInputTextColorTo('')
            classNameFromAndTo += 'redText'
            setInputTextColorTo(classNameFromAndTo)
             } else {
                setInputTextColorTo('')
                classNameFromAndTo += 'autoTextColor'
setInputTextColorTo(classNameFromAndTo)
            }
        dispatch(columnValueToUpdated(e.target.value))
        }

// Getting data properties-columns for selection
let renderColumns = () => {
    let out = Object.keys(Object.assign({}, ...records))
  return out
}

useEffect(() => {
dispatch(columnsSet(renderColumns()))
}, [])

// Hiding input fields depending on the selected (column) value
let renderInputs = () => {
    if (column !== '' && column !== 'Выбор поля') {
return (<div>
<div className="text-center mt-2 mb-2">
<p><label className="form-label">От</label></p>
<input value={columnValueFrom} onChange={handleValueFrom} title="Введите значение от" className={inputTextColorFrom}/>
</div>
<div className="text-center">
<p><label className="form-label">до</label></p>
<input value={columnValueTo} onChange={handleValueTo} title="Введите значение до" className={inputTextColorTo}/>
</div>
</div>
)
    }
}

// Variables and a condition for hiding the filter block, when changing the tab to a chart
let defaultClassName = 'col-lg-3 col-md-3 col-sm-12 mb-3 '
let setClassName = defaultClassName
if (hidden === 'hidden') {
setClassName = ''
defaultClassName += 'hidden'
setClassName = defaultClassName
} else {
    setClassName = ''
    setClassName = defaultClassName
}

return (
<div className={setClassName}>
<form className="form-control">
<div className="text-center">
<p><label className="form-label">Фильтрация по полям таблицы</label></p>
<select value={column === '' ? 'Выбор поля' : column} onChange={handleChange}
className="form-select" aria-label="Фильтрация по полям таблицы">
<option>Выбор поля</option>
{columns.map((item, index) => {return <option key={index}>{item}</option>})}
</select>
</div>
{renderInputs()}
</form>
</div>
)
}

export default CovidColumnFilter