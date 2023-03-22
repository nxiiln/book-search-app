import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/books'
import queryReducer from './slices/query'
import scrollYReducer from './slices/scrollY'


export const store = configureStore({
  reducer: {
    books: booksReducer,
    query: queryReducer,
    scrollY: scrollYReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
