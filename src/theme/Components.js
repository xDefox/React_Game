// src/theme/components.js
import { styled } from '@mui/material/styles';
import {
  Button,
  Card,
  Paper,
  Box,
  Container,
  Typography,
} from '@mui/material';

export const GradientButton = styled(Button)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)'
    : 'linear-gradient(45deg, #90caf9 30%, #21CBF3 90%)',
  color: 'white',
  '&:hover': {
    background: theme.palette.mode === 'light'
      ? 'linear-gradient(45deg, #1565c0 30%, #1E88E5 90%)'
      : 'linear-gradient(45deg, #42a5f5 30%, #1E88E5 90%)',
  },
}));

export const HoverCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

export const GlassPaper = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    ? 'rgba(255, 255, 255, 0.9)'
    : 'rgba(30, 30, 30, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
}));

export const SectionBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(3),
}));

export const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  minHeight: 'calc(100vh - 200px)',
}));

export const GradientTypography = styled(Typography)(({ theme }) => ({
  background: theme.palette.mode === 'light'
    ? 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)'
    : 'linear-gradient(45deg, #90caf9 30%, #21CBF3 90%)',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

// Добавляем недостающие экспорты
export const FilterButton = styled(Button)(({ theme, active }) => ({
  borderRadius: '20px',
  textTransform: 'none',
  fontWeight: 500,
  borderColor: active ? theme.palette.primary.main : theme.palette.divider,
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  color: active ? 'white' : theme.palette.text.secondary,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: active ? theme.palette.primary.dark : 'transparent',
    color: active ? 'white' : theme.palette.primary.main,
  },
}));

export const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s',
}));