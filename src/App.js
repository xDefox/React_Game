import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import AddCardForm from './components/AddCardForm';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  const [cards, setCards] = useState([
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
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(true); // Показывать форму входа при запуске
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setShowLogin(false);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogin(true);
    localStorage.removeItem('user');
  };

  const handleAddCard = (newCard) => {
    setCards(prev => [...prev, newCard]);
    setShowForm(false);
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту карточку?')) {
      setCards(prev => prev.filter(card => card.id !== cardId));
    }
  };

  const handleEditCard = (cardId) => {
    alert(`Редактирование карточки ID: ${cardId}`);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">⏳</div>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Шапка приложения */}
      <header className="app-header">
        <div className="header-left">
          <h1>Менеджер карточек</h1>
          {user && (
            <span className="user-info">
              {user.username} ({user.role === 'admin' ? 'Админ' : 'Пользователь'})
            </span>
          )}
        </div>
        
        <div className="header-actions">
          {user ? (
            <>
              <button 
                className="btn-add"
                onClick={() => setShowForm(true)}
                disabled={user.role !== 'admin'}
                title={user.role !== 'admin' ? 'Только для администраторов' : ''}
              >
                + Добавить карточку
              </button>
              <button 
                className="btn-logout"
                onClick={handleLogout}
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

      {/* Основной контент */}
      <main className="app-main">
        {user ? (
          <div className="cards-container">
            {cards.map((card, index) => (
              <Card
                key={card.id}
                item={card}
                onDelete={user.role === 'admin' ? handleDeleteCard : null}
                onEdit={handleEditCard}
              />
            ))}
          </div>
        ) : (
          <div className="welcome-message">
            <h2>Добро пожаловать!</h2>
            <p>Для работы с карточками необходимо авторизоваться.</p>
            <button 
              className="btn-login-large"
              onClick={() => setShowLogin(true)}
            >
              Войти в систему
            </button>
          </div>
        )}
      </main>

      {/* Модальные окна */}
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