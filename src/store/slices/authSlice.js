import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Проверяем localStorage при инициализации
const loadFromStorage = () => {
  try {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// Async thunk для авторизации
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // Имитация REST API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username === 'admin' && password === 'admin') {
        return { username, role: 'admin' };
      } else if (username === 'user' && password === 'user') {
        return { username, role: 'user' };
      } else {
        throw new Error('Неверное имя пользователя или пароль');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: loadFromStorage(), // Загружаем из localStorage
    isLoading: false,
    error: null,
    isAuthenticated: !!loadFromStorage() // Проверяем, есть ли пользователь
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('auth_user'); // Удаляем из localStorage
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  // Используем builder для async thunk
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        
        // Сохраняем в localStorage
        localStorage.setItem('auth_user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;