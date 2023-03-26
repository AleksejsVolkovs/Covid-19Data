import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from 'react-redux'

import { pageUpdated } from './covidDataSlice'

// Component that returning paginater
let CovidPaginate = () => {
// Getting the values ​​of variables from the redux store
  let { totalPages, hidden } = useSelector(state => state.covidData)

  const dispatch = useDispatch()

// Method that updating value of variable in redux storage
  let handleChangePage = ({ selected }) => {
dispatch(pageUpdated(selected))
  }

  // Variables and a condition for hiding the paginater block, when changing the tab to a chart
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
<div className="col-lg-12 col-md-12 col-sm-12">
<ReactPaginate
  previousLabel={"Previous"}
  nextLabel={"Next"}
  pageCount={totalPages}
  onPageChange={handleChangePage}
  containerClassName={"navigationButtons"}
  previousLinkClassName={"previousButton"}
  nextLinkClassName={"nextButton"}
  disabledClassName={"navigationDisabled"}
  activeClassName={"navigationActive"}
/>
  </div>
  </div>
  )
}

export default CovidPaginate
