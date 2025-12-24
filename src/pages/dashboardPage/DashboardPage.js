import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  SectionBox,
  PageContainer,
  FilterButton,
  AddButton,
} from '../../theme';
import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Button, 
} from '@mui/material';
import { fetchCards, addNewCard, removeCard, updateCard } from '../../store/slices/CardsSlice.js';
import Card from './components/card/Card.js';
import AddCardForm from './components/addCardForm/AddCardForm.js';
import DeleteConfirmationModal from '../../components/modal/deleteModal/DeleteConfirmationModal';

import { useTheme } from '../../theme/themeContext/ThemeContext'; 

const DashboardPage = () => {
  const { mode, toggleTheme } = useTheme();
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

  const MuiStandardButton = () => {
  const { toggleTheme, mode } = useTheme();

  return (
    <Box sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        Стандартные MUI маркеры (без ручной настройки цветов):
      </Typography>
      
      //кнопка с темой из коробки
      <Button 
        variant="contained" 
        color="primary" 
        onClick={toggleTheme}
        sx={{
          bgcolor: 'secondary.main', 
          color: 'secondary.contrastText',
          '&:hover': {
            bgcolor: 'secondary.dark',
          },
          border: '1px solid',
          borderColor: 'divider' 
        }}
      >
         Демонстрация темы (сейчас: {mode})
      </Button>
    </Box>
  );
};

  const filteredCards = cards.filter(card => {
    if (filter === 'my') return card.author === user.username || card.isMine;
    if (filter === 'active') return card.status === 'active';
    if (filter === 'archived') return card.status === 'archived';
    return true;
  });

  const filterButtons = [
    { key: 'all', label: 'Все карточки' },
    { key: 'my', label: 'Мои карточки' },
    { key: 'active', label: 'Активные' },
    { key: 'archived', label: 'Архив' },
  ];

  return (
    <PageContainer>
      <SectionBox>
        {/* Панель фильтров */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
          p: 2,
          borderRadius: 2,
          backgroundColor: 'background.default',
          border: 1,
          borderColor: 'divider'
        }}>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            color="primary"   // Чистый MUI: цвет берется из палитры автоматически
            onClick={toggleTheme}
          >
            Тема: {mode === 'light' ? 'Светлая' : 'Темная'}
          </Button>
        </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {filterButtons.map((btn) => (
              <FilterButton
                key={btn.key}
                active={filter === btn.key}
                onClick={() => setFilter(btn.key)}
                size="small"
              >
                {btn.label}
              </FilterButton>
            ))}
          </Box>

          {user.role === 'admin' && (
            <AddButton
              onClick={() => setShowForm(true)}
              size="medium"
            >
              + Добавить карточку
            </AddButton>
          )}
        </Box>

        {/* Форма добавления карточки */}
        {showForm && (
          <AddCardForm
            onAddCard={(newCard) => {
              handleAddCard(newCard);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Карточки */}
        {isLoading ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '300px',
            color: 'text.secondary'
          }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6">Загрузка карточек...</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
                  <Card
                    item={card}
                    onDelete={user.role === 'admin' ? () => handleDeleteClick(card) : null}
                    onEdit={handleUpdateCard}
                    canEdit={user.role === 'admin' || card.author === user.username}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 8,
                  color: 'text.secondary'
                }}>
                  <Typography variant="h6" gutterBottom>
                    Карточек не найдено
                  </Typography>
                  <Typography variant="body2">
                    {filter === 'my' 
                      ? 'У вас нет своих карточек'
                      : filter === 'active'
                      ? 'Нет активных карточек'
                      : filter === 'archived'
                      ? 'Нет карточек в архиве'
                      : 'Карточек пока нет'}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        )}

        {/* Статистика */}
        {!isLoading && filteredCards.length > 0 && (
          <Box sx={{ 
            mt: 4, 
            p: 2, 
            borderRadius: 2,
            backgroundColor: 'background.default',
            border: 1,
            borderColor: 'divider'
          }}>
            <Typography variant="body2" color="text.secondary">
              Показано: {filteredCards.length} из {cards.length} карточек
            </Typography>
          </Box>
        )}
      </SectionBox>

      {/* Модалка подтверждения удаления */}
      <DeleteConfirmationModal
        open={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        cardTitle={deletingCard?.title}
      />
    </PageContainer>
  );
};

export default DashboardPage;