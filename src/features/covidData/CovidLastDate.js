import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { lastDateSet } from './covidDataSlice'

// Component that returns first date from general data
let CovidLastDate = () => {
  // Getting general data from redux storage    
  let { records } = useSelector(state => state.covidData)
  const dispatch = useDispatch()

  // Method for getting the last date from the shared data
  let renderLastDate = () => {
    let out = []
    for (var i = 0, len = records.length; i < len; i++) {
      if (out.indexOf(records[i].dateRep) === -1) {
        out.push(records[i].dateRep);
      }
    }
    return out[0]
  }

  // Setting the value of the lastDate variable to the redux store
  useEffect(() => {
    dispatch(lastDateSet(renderLastDate()))
  })

  return renderLastDate()
}

export default CovidLastDate;