import { configureStore } from '@reduxjs/toolkit'

import { employeesReducer } from './employeesSlice'
import { tasksReducer } from './tasksSlice';

const store = configureStore({
  reducer: {
    // Define a top-level state field
    employees: employeesReducer,
    tasks: tasksReducer,
  }
})

export default store;