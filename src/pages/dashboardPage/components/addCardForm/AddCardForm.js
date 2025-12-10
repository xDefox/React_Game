import React, { useState, useEffect } from 'react';
import './AddCardForm.css';

const AddCardForm = ({ onAddCard, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    status: 'active'
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    document.body.classList.add('form-open');
    return () => {
      document.body.classList.remove('form-open');
    };
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'title':
        if (!value.trim()) return 'Заголовок обязателен';
        if (value.length < 3) return 'Минимум 3 символа';
        if (value.length > 50) return 'Максимум 50 символов';
        return '';
      
      case 'description':
        if (value.length > 500) return 'Максимум 500 символов';
        return '';
      
      case 'tags':
        if (value) {
          const tagsArray = value.split(',').map(tag => tag.trim());
          if (tagsArray.length > 5) return 'Максимум 5 тегов';
          const invalidTags = tagsArray.filter(tag => tag.length > 20);
          if (invalidTags.length > 0) return 'Тег не более 20 символов';
        }
        return '';
      
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      const newCard = {
        id: Date.now().toString(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        tags: formData.tags 
          ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
          : [],
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
      setErrors({});
      setTouched({});
    } else {
      setErrors(formErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const isFormValid = () => {
    return Object.keys(validateForm()).length === 0;
  };

  return (
    <>
      <div className="form-overlay" onClick={onCancel} />
      <div className="form-container">
        <h2>Добавить новую карточку</h2>
        
        <form onSubmit={handleSubmit} className="card-form" noValidate>
          <div className="form-group">
            <label htmlFor="title" className="required">
              Заголовок
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Введите заголовок карточки..."
              className={`form-input ${errors.title && touched.title ? 'error' : ''}`}
              required
            />
            {errors.title && touched.title && (
              <div className="error-message">{errors.title}</div>
            )}
            <div className="character-count">
              {formData.title.length}/50 символов
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Описание
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Введите описание задачи или сущности..."
              rows="4"
              className={`form-textarea ${errors.description && touched.description ? 'error' : ''}`}
            />
            {errors.description && touched.description && (
              <div className="error-message">{errors.description}</div>
            )}
            <div className="character-count">
              {formData.description.length}/500 символов
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">
              Теги (через запятую)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="React, JavaScript, CSS, UI, Design"
              className={`form-input ${errors.tags && touched.tags ? 'error' : ''}`}
            />
            {errors.tags && touched.tags && (
              <div className="error-message">{errors.tags}</div>
            )}
            <div className="form-hint">
              Можно указать до 5 тегов через запятую
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">
              Статус
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="active">Активно</option>
              <option value="paused">На паузе</option>
              <option value="completed">Завершено</option>
            </select>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onCancel} 
              className="btn-cancel"
            >
              Отмена
            </button>
            <button 
              type="submit" 
              className={`btn-submit ${!isFormValid() ? 'disabled' : ''}`}
              disabled={!isFormValid()}
            >
              {isFormValid() ? 'Сохранить карточку' : 'Исправьте ошибки'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCardForm;