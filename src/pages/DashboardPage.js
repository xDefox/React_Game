import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchCards } from '../store/slices/cardsSlice';
import Card from '../components/Card';
import AddCardForm from '../components/AddCardForm';
import { logout } from '../store/slices/authSlice';
import './DashboardPage.css';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { items: cards, isLoading } = useSelector(state => state.cards);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'my', 'active', 'archived'

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCards());
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAddCard = (newCard) => {
    // Здесь будет Redux-действие для добавления
    console.log('Add card:', newCard);
    setShowForm(false);
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Удалить карточку?')) {
      console.log('Delete card:', cardId);
    }
  };

  const handleEditCard = (cardId) => {
    console.log('Edit card:', cardId);
  };

  // Фильтрация карточек
  const filteredCards = cards.filter(card => {
    if (filter === 'my') return card.author === user.username;
    if (filter === 'active') return card.status === 'active';
    if (filter === 'archived') return card.status === 'archived';
    return true;
  });

  return (
    <div className="dashboard-page">
      <header className="app-header">
        <div className="header-left">
          <h1> Менеджер карточек</h1>
          <span className="user-info">
            {user.username} ({user.role === 'admin' ? 'Админ' : 'Пользователь'})
          </span>
        </div>
        
        <div className="header-actions">
          <button 
            className="btn-add"
            onClick={() => setShowForm(true)}
            disabled={user.role !== 'admin'}
          >
            + Добавить карточку
          </button>
          <button className="btn-logout" onClick={handleLogout}>
             Выйти
          </button>
        </div>
      </header>

      {/* Панель фильтров */}
      <div className="filter-panel">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Все карточки
          </button>
          <button 
            className={`filter-btn ${filter === 'my' ? 'active' : ''}`}
            onClick={() => setFilter('my')}
          >
            Мои карточки
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Активные
          </button>
          <button 
            className={`filter-btn ${filter === 'archived' ? 'active' : ''}`}
            onClick={() => setFilter('archived')}
          >
            Архив
          </button>
        </div>
      </div>

      <main className="dashboard-main">
        {isLoading ? (
          <div className="loading-message">
            <div className="spinner">⏳</div>
            <p>Загрузка карточек...</p>
          </div>
        ) : (
          <div className="cards-container">
            {filteredCards.map((card) => (
              <Card
                key={card.id}
                item={card}
                onDelete={user.role === 'admin' ? handleDeleteCard : null}
                onEdit={handleEditCard}
              />
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <AddCardForm
          onAddCard={handleAddCard}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default DashboardPage;