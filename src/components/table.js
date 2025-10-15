import React from 'react';
import './Card.css';

const Card = ({ item, onDelete, onEdit }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{item.title}</h3>
        <div className="card-actions">
          <button 
            className="btn-edit" 
            onClick={() => onEdit(item.id)}
            title="Редактировать"
          >
          </button>
          <button 
            className="btn-delete" 
            onClick={() => onDelete(item.id)}
            title="Удалить"
          >
              </button>
        </div>
      </div>
      
      <div className="card-content">
        <p className="card-description">{item.description}</p>
        
        {item.tags && (
          <div className="card-tags">
            {item.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}
        
        {item.date && (
          <div className="card-date">
             {new Date(item.date).toLocaleDateString()}
          </div>
        )}
      </div>
      
      <div className="card-footer">
        <span className={`card-status ${item.status}`}>
          {item.status === 'active' ? ' Активно' : '⏸На паузе'}
        </span>
        <span className="card-id">ID: {item.id}</span>
      </div>
    </div>
  );
};

export default Card;