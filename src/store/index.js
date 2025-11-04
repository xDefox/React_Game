import { configureStore } from '@reduxjs/toolkit'

// Временный reducer (заглушка)
const tempReducer = (state = {}) => state;

const store = configureStore({
  reducer: {
    temp: tempReducer, // временный reducer чтобы не было ошибок
  },
})

export default store