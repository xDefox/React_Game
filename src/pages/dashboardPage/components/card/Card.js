import React, { useState } from 'react';
import './Card.css';

const Card = ({ item, onDelete, onEdit, canEdit = true }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    title: item.title,
    description: item.description,
    tags: item.tags || [],
    status: item.status || 'active',
    newTag: ''
  });
  
  const isMyCard = item.author === 'admin' || item.isMine;
  
  const handleDoubleClick = () => {
    if (canEdit) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (onEdit) {
      const cleanTags = editedData.tags.filter(tag => tag.trim() !== '');
      onEdit({ 
        ...item, 
        title: editedData.title,
        description: editedData.description,
        tags: cleanTags,
        status: editedData.status
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({
      title: item.title,
      description: item.description,
      tags: item.tags || [],
      status: item.status || 'active',
      newTag: ''
    });
    setIsEditing(false);
  };

  const handleAddTag = () => {
    if (editedData.newTag.trim() !== '') {
      setEditedData({
        ...editedData,
        tags: [...editedData.tags, editedData.newTag.trim()],
        newTag: ''
      });
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setEditedData({
      ...editedData,
      tags: editedData.tags.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.type !== 'textarea') {
      handleAddTag();
    }
  };

  return (
    <div 
      className={`card ${isMyCard ? 'my-card' : ''}`}
      onDoubleClick={handleDoubleClick}
      style={{ cursor: canEdit ? 'pointer' : 'default' }}
    >
      {isEditing ? (
        // РЕЖИМ РЕДАКТИРОВАНИЯ
        <div className="card-edit-mode">
          <input
            type="text"
            value={editedData.title}
            onChange={(e) => setEditedData({...editedData, title: e.target.value})}
            className="edit-input"
            autoFocus
            placeholder="Название"
          />
          
          <textarea
            value={editedData.description}
            onChange={(e) => setEditedData({...editedData, description: e.target.value})}
            className="edit-textarea"
            placeholder="Описание"
          />
          
          {/* РЕДАКТИРОВАНИЕ ТЕГОВ */}
          <div className="tags-edit-section">
            <label>Теги:</label>
            <div className="current-tags">
              {editedData.tags.map((tag, index) => (
                <span key={index} className="tag-edit">
                  {tag}
                  <button 
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="tag-remove"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="add-tag-input">
              <input
                type="text"
                value={editedData.newTag}
                onChange={(e) => setEditedData({...editedData, newTag: e.target.value})}
                onKeyPress={handleKeyPress}
                placeholder="Добавить тег"
              />
              <button type="button" onClick={handleAddTag} className="btn-add-tag">
                +
              </button>
            </div>
          </div>
          
          {/* ВЫБОР СТАТУСА */}
          <div className="status-edit-section">
            <label>Статус:</label>
            <select
              value={editedData.status}
              onChange={(e) => setEditedData({...editedData, status: e.target.value})}
              className="status-select"
            >
              <option value="active">✅ Активно</option>
              <option value="paused">⏸ На паузе</option>
              <option value="archived">📦 Архив</option>
            </select>
          </div>
          
          <div className="edit-actions">
            <button onClick={handleSave} className="btn-save">Сохранить</button>
            <button onClick={handleCancel} className="btn-cancel">Отмена</button>
          </div>
        </div>
      ) : (
        <>
          {isMyCard && (
            <div className="my-card-badge">Моя карточка!</div>
          )}
          
          <div className="card-header">
            <h3 className="card-title">{item.title}</h3>
            
            {onDelete && (
              <div className="card-actions">
                <button 
                  className="btn-delete" 
                  onClick={() => onDelete(item)}
                  title="Удалить"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
          
          <div className="card-content">
            <p className="card-description">{item.description}</p>
            
            {item.tags && item.tags.length > 0 && (
              <div className="card-tags">
                {item.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
            
            {item.date && (
              <div className="card-date">
                📅 {new Date(item.date).toLocaleDateString('ru-RU')}
              </div>
            )}
          </div>
          
          <div className="card-footer">
            <span className={`card-status ${item.status}`}>
              {item.status === 'active' ? '✅ Активно' : 
               item.status === 'archived' ? '📦 Архив' : 
               '⏸ На паузе'}
            </span>
            
            <span className="card-id">ID: {item.id.slice(0, 8)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;