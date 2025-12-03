import React from 'react';
import './Card.css';

const Card = ({ item, onDelete, onEdit, canEdit = true }) => {
  const isMyCard = item.author === 'admin' || item.isMine;
  
  return (
    <div className={`card ${isMyCard ? 'my-card' : ''}`}>
      {isMyCard && (
        <div className="my-card-badge">Моя карточка!</div>
      )}
      
      <div className="card-header">
        <h3 className="card-title">{item.title}</h3>
        
        {(onDelete || onEdit) && canEdit && (
          <div className="card-actions">
            {onEdit && (
              <button 
                className="btn-edit" 
                onClick={() => onEdit(item)}
                title="Редактировать"
              >
                ✏️
              </button>
            )}
            {onDelete && (
              <button 
                className="btn-delete" 
                onClick={() => onDelete(item)}
                title="Удалить"
              >
                🗑️
              </button>
            )}
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
        
        {item.count !== undefined && (
          <div className="card-count">
            {item.count}
          </div>
        )}
        
        <span className="card-id">ID: {item.id.slice(0, 8)}</span>
      </div>
    </div>
  );
};

export default Card;