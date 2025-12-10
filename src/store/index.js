import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/AuthSlice';
import cardsReducer from './slices/CardsSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
  },
})

export default store