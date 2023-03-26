import React from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux'

import { finishDateUpdated } from './covidDataSlice'

// Component that returns an end date picker
let CovidFinishDate = () =>{
  const dispatch = useDispatch()

  // Method that sets the date in needs format and writing to the redux storage finishDate variable
  let handleChange = (date) => {
      function addZero(num) {
      if (num >= 0 && num <= 9) {
return '0' + num;
      } else {
return num;
      }
}
dispatch(finishDateUpdated([String(
      addZero(date.getDate()) + '/' + 
addZero(date.getMonth() + 1) + '/' +
addZero(date.getFullYear())),
date]))
}

// Getting values of variables from redux storage
let { firstDate, lastDate, startPickerDate, finishPickerDate, hidden } = useSelector(state => state.covidData)
// Setting to needs dates format for future data display
let f = String(firstDate).split('/')
let fDate = new Date(f[1]+'-'+f[0]+'-'+f[2])
let l = String(lastDate).split('/')
let lDate = new Date(l[1]+'-'+l[0]+'-'+l[2])

// Variables and a condition for hiding the date picker block, when changing the tab to a chart
let defaultClassName = 'col-lg-3 col-md-6 col-sm-12 mb-3 '
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
<p><label className="form-label">До</label></p>
<DatePicker
                  selected={finishPickerDate == null ? new Date(l[2], l[1]-1, l[0]).getTime() : finishPickerDate}
                            onChange={ handleChange}
                            minDate={startPickerDate == null ? fDate : startPickerDate}
    maxDate={lDate}
              name="finishPickerDate"
              dateFormat="dd/MM/yyyy"
          />
          </div>
          </form>
          </div>
      );
  }
  
export default CovidFinishDate;