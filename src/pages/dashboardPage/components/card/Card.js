import React, { useState } from 'react';
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

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

  const getStatusChip = (status) => {
    switch(status) {
      case 'active':
        return <Chip label="✅ Активно" color="success" size="small" />;
      case 'archived':
        return <Chip label="📦 Архив" color="error" size="small" />;
      case 'paused':
      case 'на паузе':
        return <Chip label="⏸ На паузе" color="warning" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <MuiCard 
      elevation={2}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: 4,
        },
        cursor: canEdit ? 'pointer' : 'default',
        position: 'relative',
        border: isMyCard ? '2px solid' : 'none',
        borderColor: isMyCard ? 'primary.main' : 'transparent',
      }}
      onDoubleClick={handleDoubleClick}
    >
      {/* Бейдж "Моя карточка" */}
      {isMyCard && !isEditing && (
        <Chip 
          label="Моя карточка!" 
          size="small"
          color="primary"
          sx={{ 
            position: 'absolute', 
            top: -10, 
            right: 10,
            fontSize: '0.7rem'
          }}
        />
      )}

      <CardContent sx={{ flexGrow: 1, p: 2, pt: isMyCard ? 3 : 2 }}>
        {isEditing ? (
          // РЕЖИМ РЕДАКТИРОВАНИЯ
          <Box>
            {/* Заголовок */}
            <TextField
              fullWidth
              value={editedData.title}
              onChange={(e) => setEditedData({...editedData, title: e.target.value})}
              label="Заголовок"
              size="small"
              sx={{ mb: 2 }}
              autoFocus
            />
            
            {/* Описание */}
            <TextField
              fullWidth
              multiline
              rows={3}
              value={editedData.description}
              onChange={(e) => setEditedData({...editedData, description: e.target.value})}
              label="Описание"
              size="small"
              sx={{ mb: 2 }}
            />
            
            {/* Редактирование тегов */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                Теги:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                {editedData.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    onDelete={() => handleRemoveTag(index)}
                    deleteIcon={<CloseIcon />}
                  />
                ))}
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  value={editedData.newTag}
                  onChange={(e) => setEditedData({...editedData, newTag: e.target.value})}
                  onKeyPress={handleKeyPress}
                  label="Добавить тег"
                  sx={{ flexGrow: 1 }}
                />
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={handleAddTag}
                  startIcon={<AddIcon />}
                >
                  Добавить
                </Button>
              </Box>
            </Box>
            
            {/* Выбор статуса */}
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel>Статус</InputLabel>
              <Select
                value={editedData.status}
                onChange={(e) => setEditedData({...editedData, status: e.target.value})}
                label="Статус"
              >
                <MenuItem value="active">✅ Активно</MenuItem>
                <MenuItem value="paused">⏸ На паузе</MenuItem>
                <MenuItem value="archived">📦 Архив</MenuItem>
              </Select>
            </FormControl>
            
            {/* Кнопки действий */}
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                size="small" 
                onClick={handleSave}
                startIcon={<SaveIcon />}
              >
                Сохранить
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={handleCancel}
                startIcon={<CancelIcon />}
              >
                Отмена
              </Button>
            </Box>
          </Box>
        ) : (
          // РЕЖИМ ПРОСМОТРА
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Заголовок и кнопки */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flexGrow: 1 }}>
                {item.title}
              </Typography>
              
              {onDelete && (
                <IconButton 
                  size="small" 
                  onClick={() => onDelete(item)}
                  color="error"
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            
            {/* Описание */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
              {item.description}
            </Typography>
            
            {/* Теги */}
            {item.tags && item.tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {item.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" />
                ))}
              </Box>
            )}
            
            {/* Футер */}
            <Box sx={{ mt: 'auto', pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                {getStatusChip(item.status)}
                {item.date && (
                  <Typography variant="caption" color="text.secondary">
                    📅 {new Date(item.date).toLocaleDateString('ru-RU')}
                  </Typography>
                )}
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  Автор: {item.author || 'неизвестен'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ID: {item.id?.slice(0, 8) || 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </MuiCard>
  );
};

export default Card;