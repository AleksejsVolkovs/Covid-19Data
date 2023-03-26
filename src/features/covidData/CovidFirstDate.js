import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { firstDateSet } from './covidDataSlice'

// Component that returns first date from shared data
let CovidFirstDate = () => {
  // Getting general data from redux storage  
  let { records } = useSelector(state => state.covidData)
  const dispatch = useDispatch()

  // Method for getting the first date from the shared data
  let renderFirstDate = () => {
    let out = []
    for (var i = 0, len = records.length; i < len; i++) {
      if (out.indexOf(records[i].dateRep) === -1) {
        out.push(records[i].dateRep);
      }
    }
    return out.sort()[out.length - 1]
  }

  // Setting value of firstDate variable to redux storage
  useEffect(() => {
    dispatch(firstDateSet(renderFirstDate()))
  })

  return renderFirstDate()
}

export default CovidFirstDate;