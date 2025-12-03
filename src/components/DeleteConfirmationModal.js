import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';

const DeleteConfirmationModal = ({ open, onClose, onConfirm, cardTitle }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="delete-dialog-title" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningIcon color="warning" />
        Подтверждение удаления
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Вы уверены, что хотите удалить карточку 
          <strong> "{cardTitle || 'эту карточку'}"</strong>?
          <br />
          <span style={{ color: '#d32f2f', fontSize: '14px', marginTop: '8px', display: 'block' }}>
            Это действие нельзя отменить.
          </span>
        </DialogContentText>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ minWidth: '100px' }}
        >
          Отмена
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="error"
          sx={{ minWidth: '100px' }}
          autoFocus
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;