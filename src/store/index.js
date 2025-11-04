import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import cardsReducer from './slices/cardsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
  },
})

export default store