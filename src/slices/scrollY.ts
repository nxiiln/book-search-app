import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState: number = 0

export const scrollYSlice = createSlice({
  name: 'scrollY',
  initialState,
  reducers: {
    setScrollY: (state, action: PayloadAction<number>) => state = action.payload,
  }
})


export const {setScrollY} = scrollYSlice.actions
export default scrollYSlice.reducer
