import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  IconButton,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFavoritesStore } from '../services/favoritesStore';

/**
 * Favorites modal to view bookmarked characters
 */
export const FavoritesModal = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const { favorites, removeFavorite, clearFavorites } = useFavoritesStore();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #f50057 0%, #c51162 100%)',
          color: 'white',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          fontSize: { xs: '1.1rem', sm: '1.3rem' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FavoriteIcon />
          <span>Favorites ({favorites.length})</span>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, px: { xs: 1.5, sm: 3 } }}>
        {favorites.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <FavoriteIcon
              sx={{
                fontSize: { xs: 40, sm: 48 },
                color: theme.palette.text.secondary,
                opacity: 0.5,
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
            >
              No favorites yet
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              Add characters to your favorites
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
              {favorites.map((character) => (
                <Grid item xs={12} key={character.url}>
                  <Card sx={{ borderRadius: '12px' }}>
                    <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: 1,
                        }}
                      >
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              color: theme.palette.text.primary,
                              mb: 1,
                              fontSize: { xs: '0.95rem', sm: '1.1rem' },
                              wordBreak: 'break-word',
                            }}
                          >
                            {character.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary,
                              mb: 0.5,
                              fontSize: { xs: '0.8rem', sm: '0.875rem' },
                            }}
                          >
                            Height: {character.height}m
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: theme.palette.text.secondary,
                              fontSize: { xs: '0.8rem', sm: '0.875rem' },
                            }}
                          >
                            Mass: {character.mass}kg
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={() => removeFavorite(character.url)}
                          sx={{ color: '#f50057', flexShrink: 0 }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={clearFavorites}
                fullWidth
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                Clear All
              </Button>
              <Button
                variant="contained"
                onClick={onClose}
                fullWidth
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                Close
              </Button>
            </Stack>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};