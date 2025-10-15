import React, { useState } from 'react';
import './AddCardForm.css';

const AddCardForm = ({ onAddCard, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    status: 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Пожалуйста, введите заголовок');
      return;
    }

    const newCard = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      status: formData.status,
      date: new Date().toISOString()
    };

    onAddCard(newCard);
    setFormData({
      title: '',
      description: '',
      tags: '',
      status: 'active'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>Добавить новую карточку</h2>
        
        <form onSubmit={handleSubmit} className="card-form">
          <div className="form-group">
            <label htmlFor="title">Заголовок *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Введите заголовок..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Введите описание..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Теги (через запятую)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="React, JavaScript, CSS..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Статус</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Активно</option>
              <option value="paused">На паузе</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">
              Отмена
            </button>
            <button type="submit" className="btn-submit">
              Добавить карточку
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardForm;