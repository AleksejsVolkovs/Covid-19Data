import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './App.css';

import { getCovidData, hiddenUpdated } from './features/covidData/covidDataSlice'
import CovidCountriesFilter from './features/covidData/CovidCountriesFilter'
import CovidColumnFilter from './features/covidData/CovidColumnFilter'
import CovidFirstDate from  './features/covidData/CovidFirstDate'
import CovidLastDate from './features/covidData/CovidLastDate'
import CovidStartDate from './features/covidData/CovidStartDate'
import CovidFinishDate from './features/covidData/CovidFinishDate'
import CovidDataTable from './features/covidData/CovidDataTable'
import CovidDataGraphic from './features/covidData/CovidDataGraphic'
import CovidPaginate from './features/covidData/CovidPaginate'
import CovidResetButton from './features/covidData/CovidResetButton'
import CovidPagesNumberSelect from './features/covidData/CovidPagesNumberSelect'

// The main component that holds all the other components together
function App() {
  // State for to hiding filters, date pickers, buttons, paginate , when change tab to chart
  let [hidden, setHidden] = useState('')
const dispatch = useDispatch()
  
// Calling the method that sets the general data to the redux  storage variable
  useEffect(() => {
    dispatch(getCovidData())
    }, [])
    
// Getting value of variable from redux storage
    const { loading } = useSelector((state) => state.covidData)
if (loading) return <p>Loading...</p>

// Method that sets the value of a variable in redux storage when switching to the chart tab
let handleHidden = () => {
  dispatch(hiddenUpdated('hidden'))
}

// Method that sets the value of a variable in redux storage when switching to the table tab
let handleUnhidden = () => {
  dispatch(hiddenUpdated(''))
}

return (
    <div className="App container">
      <header className="app-header row">
      <p className="text-center">От <CovidFirstDate/> до <CovidLastDate/> </p>
      </header>
      <div className="row">
      <CovidCountriesFilter/>
<CovidColumnFilter/>
<CovidStartDate/>
      <CovidFinishDate/>
</div>
      <CovidResetButton/>
<main className="container">
<Tabs>
    <TabList>
<Tab onClick={handleUnhidden}>Таблица данных</Tab>
<Tab onClick={handleHidden}>График данных</Tab>
</TabList>
            <TabPanel>
        <CovidDataTable/>
        </TabPanel>
        <TabPanel>
            <CovidDataGraphic/>
            </TabPanel>
        </Tabs>
        <CovidPagesNumberSelect/>
<CovidPaginate/>
</main>
    </div>
  )
}

export default App;
