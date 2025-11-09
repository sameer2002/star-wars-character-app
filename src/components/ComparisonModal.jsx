import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CompareIcon from '@mui/icons-material/Compare';
import DeleteIcon from '@mui/icons-material/Delete';
import CakeIcon from '@mui/icons-material/Cake';
import FitnessIcon from '@mui/icons-material/FitnessCenter';
import HeightIcon from '@mui/icons-material/Height';
import TransgenderIcon from '@mui/icons-material/Wc';
import MovieIcon from '@mui/icons-material/Movie';
import { useComparisonStore } from '../services/comparisonStore';

/**
 * Character comparison modal with table view
 */
export const ComparisonModal = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const { selectedCharacters, removeCharacterFromCompare, clearComparison } =
    useComparisonStore();

  if (!isOpen || selectedCharacters.length === 0) return null;

  const attributes = [
    { label: 'Height', key: 'height', icon: <HeightIcon fontSize="small" />, unit: 'm' },
    { label: 'Mass', key: 'mass', icon: <FitnessIcon fontSize="small" />, unit: 'kg' },
    { label: 'Birth Year', key: 'birth_year', icon: <CakeIcon fontSize="small" />, unit: '' },
    { label: 'Gender', key: 'gender', icon: <TransgenderIcon fontSize="small" />, unit: '' },
    { label: 'Films', key: 'films', icon: <MovieIcon fontSize="small" />, unit: '', custom: true },
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          fontSize: { xs: '1.1rem', sm: '1.3rem' },
          py: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CompareIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
          <span>Character Comparison</span>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, px: { xs: 1.5, sm: 3 } }}>
        {/* Table View */}
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: '12px',
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'hidden',
            mb: 3,
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#2a2f4a' : '#f5f5f5',
                  '& th': {
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    py: 2,
                  },
                }}
              >
                <TableCell>Attribute</TableCell>
                {selectedCharacters.map((char, idx) => (
                  <TableCell key={idx} align="center" sx={{ minWidth: { xs: 100, sm: 150 } }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.text.primary,
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                          mb: 1,
                        }}
                      >
                        {char.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => removeCharacterFromCompare(char.url)}
                        sx={{
                          color: '#f50057',
                          p: 0.5,
                          '&:hover': { backgroundColor: 'rgba(245, 0, 87, 0.1)' },
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {attributes.map((attr, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    '&:nth-of-type(odd)': {
                      backgroundColor: theme.palette.mode === 'dark' ? '#0a0e27' : '#fafafa',
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' ? '#1a1f3a' : '#f5f5f5',
                    },
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  {/* Attribute Label */}
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      py: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box sx={{ color: '#1976d2', display: 'flex', alignItems: 'center' }}>
                      {attr.icon}
                    </Box>
                    {attr.label}
                  </TableCell>

                  {/* Character Values */}
                  {selectedCharacters.map((char, charIdx) => (
                    <TableCell
                      key={charIdx}
                      align="center"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: { xs: '0.8rem', sm: '0.95rem' },
                        fontWeight: 500,
                        py: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.text.primary,
                          fontWeight: 600,
                          fontSize: { xs: '0.85rem', sm: '1rem' },
                        }}
                      >
                        {attr.custom
                          ? char[attr.key].length
                          : `${char[attr.key]}${attr.unit}`}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Card View - Mobile */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Grid container spacing={2}>
            {selectedCharacters.map((character) => (
              <Grid item xs={12} key={character.url}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    border: `2px solid #1976d2`,
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        fontSize: '1rem',
                      }}
                    >
                      {character.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => removeCharacterFromCompare(character.url)}
                      sx={{ color: '#f50057' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Grid container spacing={1}>
                    {attributes.map((attr, idx) => (
                      <Grid item xs={6} key={idx}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 1.5,
                            backgroundColor: theme.palette.mode === 'dark' ? '#2a2f4a' : '#f5f5f5',
                            borderRadius: '8px',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                            <Box sx={{ color: '#1976d2', display: 'flex', alignItems: 'center' }}>
                              {attr.icon}
                            </Box>
                            <Typography
                              variant="caption"
                              sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: 600,
                                fontSize: '0.7rem',
                              }}
                            >
                              {attr.label}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.text.primary,
                              fontSize: '0.9rem',
                            }}
                          >
                            {attr.custom
                              ? character[attr.key].length
                              : `${character[attr.key]}${attr.unit}`}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Action Buttons */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mt: 4, mb: 2 }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={clearComparison}
            fullWidth
            startIcon={<DeleteIcon />}
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              py: 1,
              fontWeight: 600,
            }}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            fullWidth
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              py: 1,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            }}
          >
            Close
          </Button>
        </Stack>

        {/* Info Text */}
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            display: 'block',
            textAlign: 'center',
            mt: 2,
          }}
        >
          Click the delete icon to remove a character from comparison
        </Typography>
      </DialogContent>
    </Dialog>
  );
};