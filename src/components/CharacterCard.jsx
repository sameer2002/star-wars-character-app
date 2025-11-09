import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Box,
    Stack,
    IconButton,
    Tooltip,
    useTheme,
} from '@mui/material';
import HeightIcon from '@mui/icons-material/Height';
import FitnessIcon from '@mui/icons-material/FitnessCenter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareIcon from '@mui/icons-material/Compare';
import { getSpeciesColor } from '../utils/colorUtils';
import { useFavoritesStore } from '../services/favoritesStore';
import { useComparisonStore } from '../services/comparisonStore';

/**
 * Character card component with favorites and comparison
 */
export const CharacterCard = ({ character, onClick }) => {
    const theme = useTheme();
    const imageId = Math.abs(character.url.split('/').filter(Boolean).pop()?.charCodeAt(0) || 0);
    const speciesColor = getSpeciesColor(character.species[0] || 'human');

    const colorMap = {
        'bg-blue-500': '#1976d2',
        'bg-yellow-500': '#fbc02d',
        'bg-amber-700': '#b8860b',
        'bg-green-500': '#388e3c',
        'bg-orange-600': '#f57c00',
        'bg-green-700': '#1b5e20',
        'bg-red-600': '#c62828',
        'bg-purple-500': '#7b1fa2',
        'bg-indigo-500': '#3949ab',
    };

    const bgColor = colorMap[speciesColor] || '#1976d2';

    // Favorites
    const { addFavorite, removeFavorite, favorites } = useFavoritesStore();
    const isFav = favorites.some((fav) => fav.url === character.url);

    // Comparison
    const { addCharacterToCompare, removeCharacterFromCompare, selectedCharacters } =
        useComparisonStore();
    const isComparing = selectedCharacters.some((char) => char.url === character.url);

    const handleFavorite = (e) => {
        e.stopPropagation();
        if (isFav) {
            removeFavorite(character.url);
        } else {
            addFavorite(character);
        }
    };

    const handleCompare = (e) => {
        e.stopPropagation();
        if (isComparing) {
            removeCharacterFromCompare(character.url);
        } else {
            addCharacterToCompare(character);
        }
    };

    return (
        <Card
            onClick={() => onClick(character)}
            sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
                    transform: 'translateY(-8px)',
                },
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: theme.palette.background.paper,
            }}
        >
            {/* Image with overlay */}
            <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                <CardMedia
                    component="img"
                    height={200}
                    image={`https://picsum.photos/seed/${imageId}/400/300`}
                    alt={character.name}
                    sx={{
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        },
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, ${bgColor}00 0%, ${bgColor}30 100%)`,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                            opacity: 0.1,
                        },
                    }}
                />

                {/* Action Buttons */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        display: 'flex',
                        gap: 1,
                        zIndex: 10,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Favorite Button */}
                    <Tooltip title={isFav ? 'Remove from favorites' : 'Add to favorites'}>
                        <IconButton
                            size="small"
                            onClick={handleFavorite}
                            sx={{
                                bgcolor: isFav ? '#f50057' : '#ffffff',
                                color: isFav ? '#ffffff' : '#000000',
                                '&:hover': {
                                    bgcolor: isFav ? '#d9004a' : '#f5f5f5',
                                },
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            {isFav ? (
                                <FavoriteIcon sx={{ fontSize: 20 }} />
                            ) : (
                                <FavoriteBorderIcon sx={{ fontSize: 20 }} />
                            )}
                        </IconButton>
                    </Tooltip>

                    {/* Compare Button */}
                    <Tooltip title={isComparing ? 'Remove from comparison' : 'Add to comparison'}>
                        <IconButton
                            size="small"
                            onClick={handleCompare}
                            sx={{
                                bgcolor: isComparing ? '#1976d2' : '#ffffff',
                                color: isComparing ? '#ffffff' : '#000000',
                                '&:hover': {
                                    bgcolor: isComparing ? '#1565c0' : '#f5f5f5',
                                },
                                transition: 'all 0.2s ease',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                            }}
                        >
                            <CompareIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* Content */}
            <CardContent sx={{ pb: 2 }}>
                <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        fontSize: '1.1rem',
                        color: theme.palette.text.primary,
                    }}
                >
                    {character.name}
                </Typography>

                {character.species && character.species[0] && (
                    <Box sx={{ mb: 2 }}>
                        <Chip
                            label={character.species[0]}
                            size="small"
                            variant="outlined"
                            sx={{
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                borderColor: theme.palette.mode === 'dark' ? '#666' : '#ddd',
                                color: theme.palette.text.primary,
                            }}
                        />
                    </Box>
                )}

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                        }}
                    >
                        <HeightIcon sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
                        <Typography
                            variant="caption"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: 600,
                            }}
                        >
                            {character.height}m
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                        }}
                    >
                        <FitnessIcon sx={{ fontSize: 18, color: theme.palette.text.secondary }} />
                        <Typography
                            variant="caption"
                            sx={{
                                color: theme.palette.text.secondary,
                                fontWeight: 600,
                            }}
                        >
                            {character.mass}kg
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};