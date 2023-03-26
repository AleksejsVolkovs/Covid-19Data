import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { covidDataPerPageUpdated } from './covidDataSlice'

// Component returning combobox, where can selecting how many entries to display per page
let CovidPagesNumberSelect = () => {
    const dispatch = useDispatch()

    // Update variable value in redux storage 
    let handleChange = (e) => {
        dispatch(covidDataPerPageUpdated(e.target.value))
    }

    // Getting values from redux storage
    let { covidDataPerPage, hidden } = useSelector(state => state.covidData)

    // Variables and a condition for hiding the filter block, when changing the tab to a chart
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

    return (
        <div className={setClassName}>
            <div className="col-lg-3 col-md-4 col-sm-6 mt-3 mb-3">
                <form className="form-control w-75">
                    <div className="text-center">
                        <p><label className="form-label">Количество записей на странице</label></p>
                        <select value={covidDataPerPage === 20 ? 20 : covidDataPerPage} onChange={handleChange}
                            className="form-select" aria-label="Количество записей на странице">
                            <option>5</option>
                            <option>10</option>
                            <option>15</option>
                            <option>20</option>
                            <option>25</option>
                            <option>30</option>
                            <option>35</option>
                            <option>40</option>
                            <option>45</option>
                            <option>50</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CovidPagesNumberSelect