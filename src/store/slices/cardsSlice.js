import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 1. Создаем async thunk для загрузки карточек
export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (_, { rejectWithValue }) => {
    try {
      // Имитация REST API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // В реальном приложении здесь был бы fetch/axios
      const mockCards = [
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
      ];
      
      return mockCards;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке карточек');
    }
  }
);

// 2. Создаем async thunk для добавления карточки
export const addNewCard = createAsyncThunk(
  'cards/addNewCard',
  async (cardData, { rejectWithValue }) => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCard = {
        ...cardData,
        id: Date.now().toString(),
        date: new Date().toISOString()
      };
      
      return newCard;
    } catch (error) {
      return rejectWithValue('Ошибка при добавлении карточки');
    }
  }
);

// 3. Создаем async thunk для удаления карточки
export const removeCard = createAsyncThunk(
  'cards/removeCard',
  async (cardId, { rejectWithValue }) => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 300));
      return cardId;
    } catch (error) {
      return rejectWithValue('Ошибка при удалении карточки');
    }
  }
);

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    items: [],
    isLoading: false,
    error: null
  },
  reducers: {
    // Оставляем синхронные actions для простых операций
    clearError: (state) => {
      state.error = null;
    }
  },
  // 4. Используем builder для обработки async thunks
  extraReducers: (builder) => {
    builder
      // Обработка fetchCards
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Обработка addNewCard
      .addCase(addNewCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addNewCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Обработка removeCard
      .addCase(removeCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(card => card.id !== action.payload);
      })
      .addCase(removeCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = cardsSlice.actions;
export default cardsSlice.reducer;