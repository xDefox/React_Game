import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './components/Card';
import AddCardForm from './components/AddCardForm';
import LoginForm from './components/LoginForm';
import { fetchCards, addNewCard, removeCard } from './store/slices/cardsSlice';
import { loginUser, logout } from './store/slices/authSlice';  // ← добавил logout
import './App.css';

function App() {
  const dispatch = useDispatch();
  
  // Берем данные из Redux store
  const { user, isAuthenticated } = useSelector(state => state.auth);  // ← убрал authLoading
  const { items: cards, isLoading: cardsLoading } = useSelector(state => state.cards);
  
  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(!isAuthenticated);

  // useEffect для загрузки данных при монтировании
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCards());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogin = (userData) => {
    dispatch(loginUser(userData));
    setShowLogin(false);
  };

  const handleLogout = () => {
    dispatch(logout());  // ← теперь logout определен
    setShowLogin(true);
  };

  const handleAddCard = (newCard) => {
    dispatch(addNewCard(newCard));
    setShowForm(false);
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту карточку?')) {
      dispatch(removeCard(cardId));
    }
  };

  const handleEditCard = (cardId) => {
    alert(`Редактирование карточки ID: ${cardId}`);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-left">
          <h1>Менеджер карточек</h1>
          {user && (
            <span className="user-info">
              {user.username} ({user.role === 'admin' ? ' Админ' : ' Пользователь'})
            </span>
          )}
        </div>
        
        <div className="header-actions">
          {user ? (
            <>
              <button 
                className="btn-add"
                onClick={() => setShowForm(true)}
                disabled={user.role !== 'admin' || cardsLoading}
                title={user.role !== 'admin' ? 'Только для администраторов' : ''}
              >
                {cardsLoading ? '' : '+'} Добавить карточку
              </button>
              <button 
                className="btn-logout"
                onClick={handleLogout}
                disabled={cardsLoading}
              >
                 Выйти
              </button>
            </>
          ) : (
            <button 
              className="btn-login"
              onClick={() => setShowLogin(true)}
            >
               Войти
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        {user ? (
          <div className="cards-container">
            {cardsLoading ? (
              <div className="loading-message">
                <div className="spinner">⏳</div>
                <p>Загрузка карточек...</p>
              </div>
            ) : (
              cards.map((card, index) => (
                <Card
                  key={card.id}
                  item={card}
                  onDelete={user.role === 'admin' ? handleDeleteCard : null}
                  onEdit={handleEditCard}
                />
              ))
            )}
          </div>
        ) : (
          <div className="welcome-message">
            <h2>Добро пожаловать!</h2>
            <p>Для работы с карточками необходимо авторизоваться.</p>
            <button 
              className="btn-login-large"
              onClick={() => setShowLogin(true)}
            >
              🔑 Войти в систему
            </button>
          </div>
        )}
      </main>

      {showForm && user?.role === 'admin' && (
        <AddCardForm
          onAddCard={handleAddCard}
          onCancel={() => setShowForm(false)}
        />
      )}

      {showLogin && (
        <LoginForm
          onLogin={handleLogin}
          onClose={() => setShowLogin(false)}
        />
      )}
    </div>
  );
}

export default App;