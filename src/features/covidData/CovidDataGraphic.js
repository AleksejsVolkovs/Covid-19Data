import Chart from "chart.js/auto"
import { CategoryScale } from "chart.js"
import React from 'react'
import { Line } from "react-chartjs-2"
import { useSelector } from 'react-redux'

import './style.css'

Chart.register(CategoryScale);

// component that returns a data chart
function CovidDataGraphic() {
  // Getting variables values from redux store  
  const { records, country, firstDate, lastDate, startDate, finishDate } = useSelector(state => state.covidData)
// Declaration of arrays for subsequent setting of values ​​for the chart
  let dates = []
let cases = []
let deaths = []    
// Variables for data filtering
let sDate = startDate == null ? String(firstDate).split('/').reverse().join('') : String(startDate).split('/').reverse().join('')
    let fDate = finishDate == null ? String(lastDate).split('/').reverse().join('') : String(finishDate).split('/').reverse().join('')
  let code
  if (country !== 'Все страны') {
    code = (c => c.countriesAndTerritories === country &&
      c.dateRep.split('/').reverse().join('') >= sDate &&
c.dateRep.split('/').reverse().join('') <= fDate);
records.filter(code)
  .reverse().map(item => {
    dates.push(item.dateRep)
    cases.push(item.cases)
    deaths.push(item.deaths)
  })
     } else { 
       // if all countries are selected in the filter
  // Getting unique dates from general data
       let out = []
 for (let i=0, len=records.length; i<len; i++) {
       if (out.indexOf(records[i].dateRep) === -1 && records[i].dateRep.split('/').reverse().join('') >= sDate && records[i].dateRep.split('/').reverse().join('') <= fDate) {
out.push(records[i].dateRep)
       }
      }
                 let arr = out.sort((a, b) => a.split('/').reverse().join('') < b.split('/').reverse().join('') ? -1 : 0)
// Setting variable dates value and setting variables cases and deaths array length with zero values
dates = arr 
cases = new Array(arr.length).fill(0)
            deaths = new Array(arr.length).fill(0)
            // Loops for setting values of cases and deaths variables
            for (let i = 0; i < arr.length; i++) {
records.filter(c => c.dateRep === arr[i])
 .map(item => {
   cases[i] += item.cases
   deaths[i] += item.deaths
  })
                 }
                 
}
  
// Chart creation using chart package and  dates, cases, deaths variables values
const chartData = {
    labels: dates,
data: dates,
datasets: [
{
  label: "Случаи ",
  data: cases,
backgroundColor: [
"rgba(75,192,192,1)",
"#ecf0f1",
"#50AF95",
"#f3ba2f",
"#2a71d0"
],
borderColor: "yellow",
borderWidth: 2
},

{
label: "Смерти",
data: deaths,
backgroundColor: [
"rgba(75,192,192,1)",
"#ecf0f1",
"#50AF95",
"#f3ba2f",
"#2a71d0"
],
borderColor: "red",
borderWidth: 2
}

]
}

return (
<div className="chart-container bgBlack">
  <Line
    data={chartData}
    options={{
      plugins: {
        title: {
          display: true,
          text: "Случаи и смерти COVID-19"
        },
        legend: {
          display: false
        }
      }
    }}
  />
</div>
)
}

export default CovidDataGraphic