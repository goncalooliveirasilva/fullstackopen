import { createSlice } from "@reduxjs/toolkit"

// const filterReducer = (state = 'ALL', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterChange = (filter) => {
//   return {
//     type: 'SET_FILTER',
//     payload: filter
//   }
// }

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'ALL',
  reducers: {
    changeFilter(state, action) {
      return action.payload
    }
  }
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer