import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TStateBooks } from '../types/TStateBooks'


const initialState: TStateBooks = {
  totalItems: 0,
  items: [{
    id: '',
    volumeInfo: {
      title: '',
      authors: [],
      description: '',
      categories: [],
    }
  }],
  loadingStatus: 'ok',
}


export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (query: string) => {
    const response = await fetch(query)
    const books = await response.json()
    if (!response.ok) throw new Error()
    return books
  }
)


export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearState: (state) => state = initialState,
  },

  extraReducers: (builder): void => {
    builder
      .addCase(fetchBooks.pending, (state): void => {
        state.loadingStatus = 'loading'
      })

      .addCase(fetchBooks.fulfilled, (state, action): void => {
        if (state.totalItems === 0) {
          state.totalItems = action.payload.totalItems
          state.items = action.payload.items
        } else {
          state.items.push(...action.payload.items)
        }
        state.loadingStatus = 'ok'
      })

      .addCase(fetchBooks.rejected, (state): void => {
        state.loadingStatus = 'error'
      })
  }
})


export const { clearState } = booksSlice.actions
export default booksSlice.reducer
