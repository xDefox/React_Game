import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './AddCardForm.css'; // Можно использовать тот же CSS

const EditCardForm = ({ card, onUpdateCard, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    title: Yup.string()
      .required('Введите название')
      .min(3, 'Минимум 3 символа')
      .max(50, 'Максимум 50 символов'),
    description: Yup.string()
      .required('Введите описание')
      .min(10, 'Минимум 10 символов')
      .max(500, 'Максимум 500 символов'),
    tags: Yup.string(),
    status: Yup.string()
      .oneOf(['active', 'paused', 'archived'], 'Выберите корректный статус')
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    
    const tagsArray = values.tags 
      ? values.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      : [];
    
    const updatedCard = {
      id: card.id,
      title: values.title,
      description: values.description,
      tags: tagsArray,
      status: values.status,
      date: card.date, // Сохраняем оригинальную дату
      author: card.author, // Сохраняем автора
      count: card.count, // Сохраняем счетчик
      isMine: card.isMine // Сохраняем флаг
    };
    
    await onUpdateCard(updatedCard);
    setIsSubmitting(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Редактировать карточку</h3>
          <button className="modal-close" onClick={onCancel}>×</button>
        </div>

        <Formik
          initialValues={{
            title: card.title || '',
            description: card.description || '',
            tags: card.tags ? card.tags.join(', ') : '',
            status: card.status || 'active'
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="card-form">
              <div className="form-group">
                <label htmlFor="title">Название *</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Введите название задачи"
                  className={errors.title && touched.title ? 'error' : ''}
                />
                {errors.title && touched.title && (
                  <div className="error-message">{errors.title}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">Описание *</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows="4"
                  placeholder="Опишите задачу подробнее..."
                  className={errors.description && touched.description ? 'error' : ''}
                />
                {errors.description && touched.description && (
                  <div className="error-message">{errors.description}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="tags">Теги (через запятую)</label>
                <Field
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="React, JavaScript, UI"
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Статус</label>
                <Field as="select" id="status" name="status">
                  <option value="active">Активно</option>
                  <option value="paused">На паузе</option>
                  <option value="archived">Архив</option>
                </Field>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  Отмена
                </button>
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditCardForm;