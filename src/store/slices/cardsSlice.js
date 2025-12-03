import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const loadCardsFromStorage = () => {
  try {
    const cards = localStorage.getItem('cards');
    return cards ? JSON.parse(cards) : [];
  } catch {
    return [];
  }
};

// Функция для сохранения карточек в localStorage
const saveCardsToStorage = (cards) => {
  localStorage.setItem('cards', JSON.stringify(cards));
};

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      

      const storedCards = loadCardsFromStorage();
      if (storedCards.length > 0) {
        return storedCards;
      }

      const mockCards = [
        {
          id: '1',
          title: 'Пример задачи',
          description: 'Это пример карточки с описанием задачи или сущности',
          tags: ['React', 'JavaScript'],
          status: 'active',
          date: '2024-01-15',
          author: 'admin',
          isMine: true,
          count: 19
        },
        {
          id: '2',
          title: 'Вторая задача', 
          description: 'Еще одна карточка для демонстрации',
          tags: ['CSS', 'UI'],
          status: 'paused',
          date: '2024-01-14',
          author: 'user',
          isMine: false,
          count: 5
        }
      ];
      

      saveCardsToStorage(mockCards);
      
      return mockCards;
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке карточек');
    }
  }
);

export const addNewCard = createAsyncThunk(
  'cards/addNewCard',
  async (cardData, { rejectWithValue, getState }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newCard = {
        ...cardData,
        id: Date.now().toString(),
        date: new Date().toISOString()
      };
      

      const currentCards = getState().cards.items;
      const updatedCards = [...currentCards, newCard];
      saveCardsToStorage(updatedCards);
      
      return newCard;
    } catch (error) {
      return rejectWithValue('Ошибка при добавлении карточки');
    }
  }
);

export const removeCard = createAsyncThunk(
  'cards/removeCard',
  async (cardId, { rejectWithValue, getState }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Обновляем localStorage
      const currentCards = getState().cards.items;
      const updatedCards = currentCards.filter(card => card.id !== cardId);
      saveCardsToStorage(updatedCards);
      
      return cardId;
    } catch (error) {
      return rejectWithValue('Ошибка при удалении карточки');
    }
  }
);

export const updateCard = createAsyncThunk(
  'cards/updateCard',
  async ({ id, ...updates }, { rejectWithValue, getState }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const currentCards = getState().cards.items;
      const updatedCards = currentCards.map(card =>
        card.id === id ? { ...card, ...updates } : card
      );
      
      saveCardsToStorage(updatedCards);
      
      return { id, ...updates };
    } catch (error) {
      return rejectWithValue('Ошибка при обновлении карточки');
    }
  }
);

//загрузка отображения карточки
const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    items: loadCardsFromStorage(), 
    isLoading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
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
      
      .addCase(addNewCard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        // localStorage уже обновлен в thunk
      })
      .addCase(addNewCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
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
      })
      
      // Обработка updateCard
      .addCase(updateCard.fulfilled, (state, action) => {
        const index = state.items.findIndex(card => card.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...action.payload };
        }
      });
  }
});

export const { clearError } = cardsSlice.actions;
export default cardsSlice.reducer;