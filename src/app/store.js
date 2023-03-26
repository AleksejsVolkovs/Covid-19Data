import { configureStore } from '@reduxjs/toolkit'

import { covidDataReducer } from "../features/covidData/covidDataSlice";
import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    covidData: covidDataReducer, 
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: covidDataReducer,
      },
      serializableCheck: false,
    }),
})