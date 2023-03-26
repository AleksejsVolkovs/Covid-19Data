import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Object containing variable values
let initialState = {
records: [],
  loading: false,
  countries: [],
  country: 'Все страны',
  firstDate: null,
  lastDate: null,
  startDate: null,
  finishDate: null,
  startPickerDate: null,
  finishPickerDate: null,
  covidDataPerPage: 20,
  page: 0,
  totalPages: 0,
  columns: [],
  column: '',
  columnValueFrom: '',
  columnValueTo: '',
  hidden: '',
  }

// Method for getting data by URL
  export const getCovidData = createAsyncThunk(
  'covidData/getCovidData',
  async (thunkAPI) => {
    const res = await fetch('https://opendata.ecdc.europa.eu/covid19/casedistribution/json/').then(
    (data) => data.json()
  )
  return res.records
})

// Contains Methods for changing or setting values ​​in storage
const covidDataSlice = createSlice({
  name: 'covidData',
  initialState,
  reducers: {
    countriesSet(state, action) {
state.countries = action.payload
},
    countryUpdated(state, action) {
      state.country = action.payload
    },
    firstDateSet(state, action) {
      state.firstDate = action.payload
    },
    lastDateSet(state, action) {
      state.lastDate = action.payload
    },
    startDateUpdated(state, action) {
      let arr = action.payload
      state.startDate = arr[0]
      state.startPickerDate = arr[1]
    },
    finishDateUpdated(state, action) {
      let arr = action.payload
      state.finishDate = arr[0]
      state.finishPickerDate = arr[1]
    },
    covidDataPerPageUpdated(state, action) {
      state.covidDataPerPage = action.payload
    },
    pageUpdated(state, action) {
      state.page = action.payload
    },
    totalPagesUpdated(state, action) {
      state.totalPages = action.payload
    },
    columnsSet(state, action) {
      state.columns = action.payload
    },
    columnUpdated(state, action) {
      state.column = action.payload
    },
    columnValueFromUpdated(state, action) {
      state.columnValueFrom = action.payload
    },
columnValueToUpdated(state, action) {
      state.columnValueTo = action.payload
    },
    hiddenUpdated(state, action) {
      state.hidden = action.payload
    },

  },
    extraReducers: (builder) => {
   builder
    .addCase(getCovidData.pending, (state) => {
      state.loading = true
    })
    .addCase(getCovidData.fulfilled, (state, { payload }) => {
      state.loading = false
      state.records = payload
    })
    .addCase(getCovidData.rejected, (state) => {
      state.loading = false
    })
    }
})

// Export methods for use in the components
export const { countriesSet, countryUpdated, firstDateSet, lastDateSet, startDateUpdated, finishDateUpdated, covidDataPerPageUpdated, pageUpdated, totalPagesUpdated } = covidDataSlice.actions
export const { columnsSet, columnUpdated, columnValueFromUpdated, columnValueToUpdated, hiddenUpdated } = covidDataSlice.actions
export const covidDataReducer = covidDataSlice.reducer
export default covidDataSlice