import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

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

  const hasError = (field) => {
    return errors[field] && touched[field];
  };

  const getHelperText = (field) => {
    return hasError(field) ? errors[field] : '';
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1300,
        }}
        onClick={onCancel}
      />
      <Dialog 
        open 
        onClose={onCancel}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
          }
        }}
        BackdropProps={{
          style: { backgroundColor: 'transparent' }
        }}
      >
        <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}>
          Добавить новую карточку
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3 }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Заголовок */}
            <TextField
              autoFocus
              margin="normal"
              name="title"
              label="Заголовок *"
              type="text"
              fullWidth
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              error={hasError('title')}
              helperText={getHelperText('title')}
              required
              sx={{ mb: 2 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              {formData.title.length}/50 символов
            </Typography>

            {/* Описание */}
            <TextField
              margin="normal"
              name="description"
              label="Описание"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={hasError('description')}
              helperText={getHelperText('description')}
              sx={{ mb: 2 }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              {formData.description.length}/500 символов
            </Typography>

            {/* Теги */}
            <TextField
              margin="normal"
              name="tags"
              label="Теги (через запятую)"
              type="text"
              fullWidth
              value={formData.tags}
              onChange={handleChange}
              onBlur={handleBlur}
              error={hasError('tags')}
              helperText={getHelperText('tags') || 'Можно указать до 5 тегов через запятую'}
              sx={{ mb: 2 }}
            />

            {/* Статус */}
            <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
              <InputLabel>Статус</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                label="Статус"
              >
                <MenuItem value="active">Активно</MenuItem>
                <MenuItem value="paused">На паузе</MenuItem>
                <MenuItem value="archived">Завершено</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, borderTop: 1, borderColor: 'divider', pt: 2 }}>
          <Button 
            onClick={onCancel} 
            variant="outlined"
          >
            Отмена
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!isFormValid()}
          >
            {isFormValid() ? 'Сохранить карточку' : 'Исправьте ошибки'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCardForm;