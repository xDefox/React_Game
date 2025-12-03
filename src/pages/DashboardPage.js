import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchCards } from '../store/slices/cardsSlice';
import Card from '../components/Card';
import AddCardForm from '../components/AddCardForm';
import { addNewCard, removeCard } from '../store/slices/cardsSlice';
import { logout } from '../store/slices/authSlice';
import './DashboardPage.css';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { items: cards, isLoading } = useSelector(state => state.cards);
  const [showForm, setShowForm] = React.useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCards());
    }
  }, [isAuthenticated, dispatch]);

  // Если не авторизован - редирект на логин
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAddCard = (newCard) => {
    dispatch(addNewCard(newCard)); 
    setShowForm(false);
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Удалить карточку?')) {
      dispatch(removeCard(cardId)); 
    }
  };

  return (
    <div className="dashboard-page">
      <header className="app-header">
        <div className="header-left">
          <h1> Менеджер карточек</h1>
          <span className="user-info">
            {user.username} ({user.role === 'admin' ? ' Админ' : ' Пользователь'})
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

      <main className="dashboard-main">
        {isLoading ? (
          <div className="loading-message">
            <div className="spinner">⏳</div>
            <p>Загрузка карточек...</p>
          </div>
        ) : (
          <div className="cards-container">
            {cards.map((card, index) => (
              <Card
                key={card.id}
                item={card}
                onDelete={user.role === 'admin' ? handleDeleteCard : null}
                onEdit={() => console.log('Edit:', card.id)}
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