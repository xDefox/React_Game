import React, { useState } from 'react';
import Card from './components/Card';
import AddCardForm from './components/AddCardForm';
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
    // Здесь можно реализовать редактирование
    alert(`Редактирование карточки ID: ${cardId}`);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Менеджер карточек</h1>
        <button 
          className="btn-add"
          onClick={() => setShowForm(true)}
        >
          + Добавить карточку
        </button>
      </header>

      <main className="app-main">
        <div className="cards-container">
          {cards.map(card => (
            <Card
              key={card.id}
              item={card}
              onDelete={handleDeleteCard}
              onEdit={handleEditCard}
            />
          ))}
        </div>
      </main>

      {showForm && (
        <AddCardForm
          onAddCard={handleAddCard}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;