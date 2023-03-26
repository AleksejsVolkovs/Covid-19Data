import React from "react"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux'

import { startDateUpdated } from './covidDataSlice'

// Component that returning an start date picker
let CovidStartDate = () =>{
  const dispatch = useDispatch()

    // Method that sets the date in needs format and writing to the redux storage startDate variable  
  let handleChange = (date) => {
function addZero(num) {
      if (num >= 0 && num <= 9) {
return '0' + num;
      } else {
return num;
      }
}
dispatch(startDateUpdated([String(
      addZero(date.getDate()) + '/' + 
addZero(date.getMonth() + 1) + '/' +
addZero(date.getFullYear())),
    date]))
}

// Getting values of variables from redux storage
let { firstDate, lastDate, startPickerDate, finishPickerDate, hidden } = useSelector(state => state.covidData)
// Setting to needs dates format for future data display
let f = String(firstDate).split('/')
let fDate = new Date(f[1]+'-'+ f[0]+'-'+f[2])
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
      <p><label className="form-label">От</label></p>
                  <DatePicker
                                    selected={startPickerDate == null ? new Date(f[2], f[1]-1, f[0]).getTime() : startPickerDate}
                  onChange={ handleChange}
                            minDate={fDate}
    maxDate={finishPickerDate == null ?  lDate : finishPickerDate}
              name="startPickerDate"
              dateFormat="dd/MM/yyyy"
          />
          </div>
          </form>
          </div>
      )
  }
  
export default CovidStartDate;