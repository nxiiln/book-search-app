import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MAX_RESULTS } from '../utils/constants'
import { TStateQuery } from '../types/TStateQuery'


const initialState: TStateQuery = {
  startIndex: MAX_RESULTS,
  baseQuery: '',
}


export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setStartIndex: (state): void => {
      state.startIndex += MAX_RESULTS
    },

    setBaseQuery: (state, action: PayloadAction<string>): void => {
      state.baseQuery = action.payload
    }
  }
})


export const {setStartIndex, setBaseQuery} = querySlice.actions
export default querySlice.reducer
