import { createSlice } from '@reduxjs/toolkit'
import { subDays, addDays, format, parseISO } from 'date-fns'

const initialState = {
  lastDate: format(new Date(), 'yyyy-MM-dd'),
  lastClient: '',
  lastTask: '',
}

const sessionSlice = createSlice({
  name: 'sesson',
  initialState,
  reducers: {
    setLastDate: (state, action) => {
      state.lastDate = action.payload
    },
    previousDate: (state) => {
      state.lastDate = format(
        subDays(parseISO(state.lastDate), 1),
        'yyyy-MM-dd'
      )
    },
    nextDate: (state) => {
      state.lastDate = format(
        addDays(parseISO(state.lastDate), 1),
        'yyyy-MM-dd'
      )
    },
    setLastClient: (state, action) => {
      state.lastClient = action.payload
    },
    setLastTask: (state, action) => {
      state.lastTask = action.payload
    },
  },
})

export const {
  setLastDate,
  previousDate,
  nextDate,
  setLastClient,
  setLastTask,
} = sessionSlice.actions
export default sessionSlice.reducer
