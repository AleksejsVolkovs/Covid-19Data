import React from "react"
import { useDispatch, useSelector } from 'react-redux'

import { countryUpdated, startDateUpdated, finishDateUpdated, covidDataPerPageUpdated, pageUpdated, totalPagesUpdated, columnUpdated, columnValueFromUpdated, columnValueToUpdated } from './covidDataSlice'

import './style.css'

// A component that returns a button to reset filters by countries and columns, as well as a button to reset the dates picker
let CovidResetButton = () => {
    // Getting values of variables from redux storage
    let { firstDate, lastDate, startDate, finishDate, startPickerDate, finishPickerDate, hidden } = useSelector(state => state.covidData)

    let dispatch = useDispatch()

// Method that resets the filter values ​​by countries and columns and by pages
    let handleReset = () => {
    dispatch(countryUpdated('Все страны'))
    dispatch(covidDataPerPageUpdated(20))
    dispatch(pageUpdated(0)) 
    dispatch(totalPagesUpdated(0))
dispatch(columnUpdated(''))
dispatch(columnValueFromUpdated(''))
        dispatch(columnValueToUpdated(''))
        }

// Method that resets the values ​​of the variables for the date pickers
        let handleDefault = () => {
    dispatch(startDateUpdated([null, null]))
    dispatch(finishDateUpdated([null, null]))
    }

    // Variables and a condition for hiding the button, when changing the tab to a chart
    let defaultClassName = 'row '
let setClassName = defaultClassName
if (hidden === 'hidden') {
      setClassName = ''
      defaultClassName += 'hidden'
      setClassName = defaultClassName
      } else {
          setClassName = ''
          setClassName = defaultClassName
      }
      
    if ((String(startDate).split('/').reverse().join('') !== String(firstDate).split('/').reverse().join('') || String(finishDate).split('/').reverse().join('') !== String(lastDate).split('/').reverse().join('')) && (startDate !== null || finishDate !== null)) {
return (
        <div className={setClassName}>
        <div className="col-lg-6 col-md-6 col-sm-12">
    <input type="button" value="Сбросить фильтры" title="Сбросить фильтры" onClick={handleReset} className="btn btn-primary w-50 m-3 myBtn"/>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12">
    <input type="button" value="Отобразить все данные" title="Отобразить все данные" onClick={handleDefault} className="btn btn-primary w-50 m-3 myBtn"/>
    </div>
    </div>
    )
    } else {
    return (
        <div className={setClassName}>
        <div className="col-lg-6 col-md-6 col-sm-12">
    <input type="button" value="Сбросить фильтры" title="Сбросить фильтры" onClick={handleReset} className=" btn btn-primary w-50 m-3 myBtn"/>
    </div>
    <div className="col-lg-6 col-md-6 col-sm-12">
    </div>
    </div>
    )
}

}

export default CovidResetButton