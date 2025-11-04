import { createSlice } from '@reduxjs/toolkit'

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    items: [
      {
        id: '1',
        title: 'Пример задачи',
        description: 'Это пример карточки с описанием задачи или сущности',
        tags: ['React', 'JavaScript'],
        status: 'active',
        date: '2024-01-15'
      },
      {
        id: '2',
        title: 'Вторая задача', 
        description: 'Еще одна карточка для демонстрации',
        tags: ['CSS', 'UI'],
        status: 'paused',
        date: '2024-01-14'
      }
    ],
    isLoading: false,
    error: null
  },
  reducers: {
    addCard: (state, action) => {
      state.items.push(action.payload)
    },
    deleteCard: (state, action) => {
      state.items = state.items.filter(card => card.id !== action.payload)
    },
    updateCard: (state, action) => {
      const index = state.items.findIndex(card => card.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    }
  }
})

export const { addCard, deleteCard, updateCard } = cardsSlice.actions
export default cardsSlice.reducer