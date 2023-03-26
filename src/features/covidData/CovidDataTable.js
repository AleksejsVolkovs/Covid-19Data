import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { totalPagesUpdated } from './covidDataSlice'

import './style.css'

// Component that returns a data table
let CovidDataTable = () => {
  // Declaring states for sorting
  let [sortDirection, setSortDirection] = useState('↓')
  let [sortKey, setSortKey] = useState('countriesAndTerritories')
  // Getting general data from redux storage
  const { records } = useSelector(state => state.covidData)
  const dispatch = useDispatch()

  // Changing the direction arrow after clicking the sort button
  let handleKey = (key) => {
    let direction = '↓';
    if (sortKey === key && sortDirection === '↓') {
      direction = '↑';
    }
    setSortKey(key)
    setSortDirection(direction)
  }

  // Getting variables values from redux storage
  let { country, firstDate, lastDate, startDate, finishDate } = useSelector(state => state.covidData)
  let { column, columnValueFrom, columnValueTo } = useSelector(state => state.covidData)

  // Setting dates variables for filtering and sorting data
  let sDate = startDate == null ? String(firstDate).split('/').reverse().join('') : String(startDate).split('/').reverse().join('')
  let fDate = finishDate == null ? String(lastDate).split('/').reverse().join('') : String(finishDate).split('/').reverse().join('')

  // Method for data filtering conditions depending on the received values
  let filterData = () => {
    let filterCode;
    if (country !== 'Все страны') {
      if (column === 'dateRep') {
        filterCode = ((c) =>
          c.countriesAndTerritories === country &&
          c.dateRep.split('/').reverse().join('') >= String(columnValueFrom).split('/').reverse().join('') &&
          c.dateRep.split('/').reverse().join('') <= String(columnValueTo).split('/').reverse().join('')
        )
      } else if (column === 'day' || column === 'month' || column === 'year' || column === 'cases' || column === 'deaths' || column === 'popData2019' || column === 'Cumulative_number_for_14_days_of_COVID-19_cases_per_100000') {
        filterCode = ((c) =>
          c.countriesAndTerritories === country &&
          c[column] >= columnValueFrom &&
          c[column] <= columnValueTo &&
          c.dateRep.split('/').reverse().join('') >= sDate &&
          c.dateRep.split('/').reverse().join('') <= fDate
        )
      } else if (column === 'geoId' || column === 'countryterritoryCode') {
        filterCode = ((c) =>
          c.countriesAndTerritories === country &&
          c[column] >= columnValueFrom &&
          c[column] <= columnValueTo &&
          c.dateRep.split('/').reverse().join('') >= sDate &&
          c.dateRep.split('/').reverse().join('') <= fDate
        )
      } else if (column === 'countriesAndTerritories' || column === 'continentExp') {
        filterCode = ((c) =>
          c.countriesAndTerritories === country &&
          c[column].toLowerCase() >= columnValueFrom.toLowerCase() &&
          c[column].toLowerCase() <= columnValueTo.toLowerCase() &&
          c.dateRep.split('/').reverse().join('') >= sDate &&
          c.dateRep.split('/').reverse().join('') <= fDate
        )
      } else {
        filterCode = ((c) =>
          c.countriesAndTerritories === country &&
          c.dateRep.split('/').reverse().join('') >= sDate &&
          c.dateRep.split('/').reverse().join('') <= fDate
        )
      }
    } else {
      if (column === 'dateRep') {
        filterCode = ((c) =>
          c.dateRep.split('/').reverse().join('') >= String(columnValueFrom).split('/').reverse().join('') &&
          c.dateRep.split('/').reverse().join('') <= String(columnValueTo).split('/').reverse().join('')
        )
      } else if (column === 'day' || column === 'month' || column === 'year' || column === 'cases' || column === 'deaths' || column === 'popData2019' || column === 'Cumulative_number_for_14_days_of_COVID-19_cases_per_100000') {
        filterCode = ((c) =>
          c[column] >= columnValueFrom &&
          c[column] <= columnValueTo &&
          c.dateRep.split('/').reverse().join('') >= sDate &&
          c.dateRep.split('/').reverse().join('') <= fDate
        )
      } else if (column === 'countriesAndTerritories' || column === 'continentExp') {
        filterCode = ((c) =>
          c[column].toLowerCase() >= columnValueFrom.toLowerCase() &&
          c[column].toLowerCase() <= columnValueTo.toLowerCase() &&
          c.dateRep.split('/').reverse().join('') >= sDate &&
          c.dateRep.split('/').reverse().join('') <= fDate
        )

      } else if (column === 'geoId' || column === 'countryterritoryCode') {
        filterCode = ((c) =>
          c[column] >= columnValueFrom &&
          c[column] <= columnValueTo &&
          c.dateRep.split('/').reverse().join('') >= sDate &&
          c.dateRep.split('/').reverse().join('') <= fDate
        )
      } else {
        filterCode = ((c) =>
          c.dateRep.split('/').reverse().join('') >= sDate &&
          c.dateRep.split('/').reverse().join('') <= fDate
        )
      }
    }
    return filterCode;
  }

  // Method for sorting data depending on the received values
  let sortData = () => {
    let key = sortKey
    let direction = sortDirection
    return ((a, b) => {
      if (key === 'dateRep' && a.dateRep.split('/').reverse().join('') < b.dateRep.split('/').reverse().join('') && direction === '↓') { return -1; }
      if (key === 'dateRep' && a.dateRep.split('/').reverse().join('') > b.dateRep.split('/').reverse().join('') && direction === '↑') { return -1; }
      if (key === 'countriesAndTerritories' && a.countriesAndTerritories.toLowerCase() < b.countriesAndTerritories.toLowerCase() && direction === '↓') { return -1; }
      if (key === 'countriesAndTerritories' && a.countriesAndTerritories.toLowerCase() > b.countriesAndTerritories.toLowerCase() && direction === '↑') { return -1; }
      if (key === 'cases' && a.cases < b.cases && direction === '↓') { return -1; }
      if (key === 'cases' && a.cases > b.cases && direction === '↑') { return -1; }
      if (key === 'deaths' && a.deaths < b.deaths && direction === '↓') { return -1; }
      if (key === 'deaths' && a.deaths > b.deaths && direction === '↑') { return -1; }
    })
  }

  // Setting the values ​​of variables for outputting data to the table
  let cases = 0
  let deaths = 0
  let casesPeriodArr = []
  let deathsPeriodArr = []
  let sumCases = 0
  let sumDeaths = 0
  for (let i = 0; i < records.length; i++) {
    if (country === 'Все страны') {
      cases += records[i].cases
      deaths += records[i].deaths
      if (records[i].dateRep.split('/').reverse().join('') >= sDate && records[i].dateRep.split('/').reverse().join('') <= fDate) {
        casesPeriodArr.push(records[i].cases);
        deathsPeriodArr.push(records[i].deaths);
        sumCases += records[i].cases;
        sumDeaths += records[i].deaths;
      }
    } else if (country !== 'Все страны' && records[i].countriesAndTerritories === country) {
      cases += records[i].cases
      deaths += records[i].deaths
      if (records[i].dateRep.split('/').reverse().join('') >= sDate && records[i].dateRep.split('/').reverse().join('') <= fDate) {
        casesPeriodArr.push(records[i].cases);
        deathsPeriodArr.push(records[i].deaths);
        sumCases += records[i].cases;
        sumDeaths += records[i].deaths;
      }
    }

  }
  let allCases = (cases / 1000).toFixed(2);
  let allDeaths = (deaths / 1000).toFixed(2);
  let averageCasesDay = (sumCases / casesPeriodArr.length).toFixed(2);
  let averageDeathsDay = (sumDeaths / deathsPeriodArr.length).toFixed(2);
  let maxCasesDay = Math.max.apply(null, casesPeriodArr);
  let maxDeathsDay = Math.max.apply(null, deathsPeriodArr);

  // Getting values of variables for data paginate
  let { page, covidDataPerPage } = useSelector(state => state.covidData)
  let numberOfRecordsVistited = page * covidDataPerPage

  // Method that uses filtering and sorting methods and returning data array, for later rendering
  let recData = () => {
    let arr = records
      .filter(filterData())
      .sort(sortData())
    return arr
  }

  // Setting the value of the variable that is used to set the number of rows that display data in the table - uses paginater
  useEffect(() => {
    dispatch(totalPagesUpdated(Math.ceil(recData().reverse().length / covidDataPerPage)))
  })

  /* Method for data drawing to table rows. 
  if no data, return string -  data not found*/
  let renderData = () => {
    if (recData().reverse().length > 0) {
      return recData()
        .slice(numberOfRecordsVistited, numberOfRecordsVistited + covidDataPerPage)
        .map((item, index) => {
          return (<tr key={index}>
            {/*<td>{item.dateRep}</td>*/}
            <td>{item.countriesAndTerritories}</td>
            <td>{item.cases}</td>
            <td>{item.deaths}</td>
            <td>{cases}</td>
            <td>{deaths}</td>
            <td>{allCases}</td>
            <td>{allDeaths}</td>
            <td>{averageCasesDay} | {averageDeathsDay}</td>
            <td>{maxCasesDay} | {maxDeathsDay}</td>
          </tr>)
        })
    } else {
      return (<tr className="text-center"><td colSpan="8">Ничего не найдено</td></tr>)
    }
  }

  return (
    <div className="table-responsive">
      <table className="text-center">
        <thead>
          <tr>
            {/*<th>Дата
<button type="button"  
onClick={() => handleKey('dateRep')}>
{sortKey === 'dateRep' ? sortDirection : '↔'}</button></th>*/}
            <th>Страна
              <button type="button"
                onClick={() => handleKey('countriesAndTerritories')}>
                {sortKey === 'countriesAndTerritories' ? sortDirection : '↔'}</button></th>
            <th>Количество случаев
              <button type="button"
                onClick={() => handleKey('cases')}>
                {sortKey === 'cases' ? sortDirection : '↔'}</button></th>
            <th>Количество смертей
              <button type="button"
                onClick={() => handleKey('deaths')}>
                {sortKey === 'deaths' ? sortDirection : '↔'}</button></th>
            <th>Количество случаев всего</th>
            <th>Количество смертей всего</th>
            <th>Количество случаев на 1000 жителей</th>
            <th>Количество смертей на 1000 жителей</th>
            <th>Среднее количество заболеваний и смертей в день</th>
            <th>Максимальное количество заболеваний и смертей в день</th>
          </tr>
        </thead>
        <tbody>
          {renderData()}
        </tbody>
      </table>
    </div>
  )
}
export const { gData } = CovidDataTable
export default CovidDataTable