import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchCards, addNewCard, removeCard, updateCard } from '../../store/slices/CardsSlice.js';
import Card from './components/card/Card.js';
import AddCardForm from './components/addCardForm/AddCardForm.js';
import DeleteConfirmationModal from '../../components/modal/deleteModal/DeleteConfirmationModal';
import './DashboardPage.css'

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { items: cards, isLoading } = useSelector(state => state.cards);
  
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingCard, setDeletingCard] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCards());
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleAddCard = (newCard) => {
    dispatch(addNewCard({
      ...newCard,
      author: user.username,
      status: 'active',
      count: 0,
      isMine: true
    }));
  };

  const handleDeleteClick = (card) => {
    setDeletingCard(card);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deletingCard) {
      dispatch(removeCard(deletingCard.id));
      setShowDeleteModal(false);
      setDeletingCard(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeletingCard(null);
  };

  const handleUpdateCard = (updatedCard) => {
    dispatch(updateCard(updatedCard));
  };

  const filteredCards = cards.filter(card => {
    if (filter === 'my') return card.author === user.username || card.isMine;
    if (filter === 'active') return card.status === 'active';
    if (filter === 'archived') return card.status === 'archived';
    return true;
  });

  return (
    <div className="dashboard-page">
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

        {user.role === 'admin' && (
          <button 
            className="btn-add-card"
            onClick={() => setShowForm(true)}
          >
            + Добавить карточку
          </button>
        )}
      </div>

      {/* ФОРМА ДОБАВЛЕНИЯ КАРТОЧКИ */}
      {showForm && (
        <AddCardForm
          onAddCard={(newCard) => {
            handleAddCard(newCard);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

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
                onDelete={user.role === 'admin' ? () => handleDeleteClick(card) : null}
                onEdit={handleUpdateCard}
                canEdit={user.role === 'admin' || card.author === user.username}
              />
            ))}
          </div>
        )}
      </main>

      {/* МОДАЛКА ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ */}
      <DeleteConfirmationModal
        open={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        cardTitle={deletingCard?.title}
      />
    </div>
  );
};

export default DashboardPage;