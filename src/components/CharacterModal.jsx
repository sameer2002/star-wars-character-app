import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Grid,
    Paper,
    Typography,
    CircularProgress,
    Divider,
    Stack,
    useTheme,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import EventIcon from '@mui/icons-material/Event';
import MovieIcon from '@mui/icons-material/Movie';
import CakeIcon from '@mui/icons-material/Cake';
import { useCharacterDetails } from '../hooks/useCharacters';
import { formatDate } from '../utils/colorUtils';

/**
 * Character details modal
 */
export const CharacterModal = ({ character, onClose, isOpen }) => {
    const theme = useTheme();
    const { homeworld, species, filmsCount, loading } = useCharacterDetails(character);

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
                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    py: 2,
                }}
            >
                {character.name}
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            py: 4,
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <Stack spacing={3}>
                        {/* Basic Stats */}
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        textAlign: 'center',
                                        backgroundColor: theme.palette.mode === 'dark' ? '#2a2f4a' : '#f5f5f5',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                        }}
                                    >
                                        Height
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1976d2',
                                            mt: 0.5,
                                        }}
                                    >
                                        {character.height}m
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        textAlign: 'center',
                                        backgroundColor: theme.palette.mode === 'dark' ? '#2a2f4a' : '#f5f5f5',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                        }}
                                    >
                                        Mass
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1976d2',
                                            mt: 0.5,
                                        }}
                                    >
                                        {character.mass}kg
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        textAlign: 'center',
                                        backgroundColor: theme.palette.mode === 'dark' ? '#2a2f4a' : '#f5f5f5',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <CakeIcon sx={{ fontSize: 20, color: '#1976d2', mb: 0.5 }} />
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            display: 'block',
                                        }}
                                    >
                                        Birth Year
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1976d2',
                                            mt: 0.5,
                                        }}
                                    >
                                        {character.birth_year}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        textAlign: 'center',
                                        backgroundColor: theme.palette.mode === 'dark' ? '#2a2f4a' : '#f5f5f5',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <MovieIcon sx={{ fontSize: 20, color: '#1976d2', mb: 0.5 }} />
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            display: 'block',
                                        }}
                                    >
                                        Films
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1976d2',
                                            mt: 0.5,
                                        }}
                                    >
                                        {filmsCount}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Divider />

                        {/* Date Added */}
                        <Box>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                <EventIcon sx={{ color: '#1976d2' }} />
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 700,
                                        color: theme.palette.text.primary,
                                    }}
                                >
                                    Date Added
                                </Typography>
                            </Stack>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    ml: 4,
                                }}
                            >
                                {formatDate(character.created)}
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Homeworld */}
                        {homeworld && (
                            <Box>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                                    <PublicIcon sx={{ color: '#388e3c' }} />
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 700,
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        Homeworld: {homeworld.name}
                                    </Typography>
                                </Stack>

                                <Grid container spacing={1.5} sx={{ ml: 3 }}>
                                    <Grid item xs={12}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 1.5,
                                                backgroundColor: theme.palette.mode === 'dark' ? '#2a3a2a' : '#e8f5e9',
                                                borderRadius: '8px',
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: theme.palette.mode === 'dark' ? '#90ee90' : '#1b5e20',
                                                    fontWeight: 700,
                                                }}
                                            >
                                                TERRAIN
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: theme.palette.mode === 'dark' ? '#b0e0b0' : '#2e7d32',
                                                    mt: 0.5,
                                                }}
                                            >
                                                {homeworld.terrain}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 1.5,
                                                backgroundColor: theme.palette.mode === 'dark' ? '#2a3a4a' : '#e3f2fd',
                                                borderRadius: '8px',
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: theme.palette.mode === 'dark' ? '#90bff5' : '#0d47a1',
                                                    fontWeight: 700,
                                                }}
                                            >
                                                CLIMATE
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: theme.palette.mode === 'dark' ? '#b0d8ff' : '#1565c0',
                                                    mt: 0.5,
                                                }}
                                            >
                                                {homeworld.climate}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 1.5,
                                                backgroundColor: theme.palette.mode === 'dark' ? '#4a3a2a' : '#fff3e0',
                                                borderRadius: '8px',
                                            }}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: theme.palette.mode === 'dark' ? '#ffb87f' : '#e65100',
                                                    fontWeight: 700,
                                                }}
                                            >
                                                POPULATION
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: theme.palette.mode === 'dark' ? '#ffc9a0' : '#f57c00',
                                                    mt: 0.5,
                                                }}
                                            >
                                                {homeworld.population === 'unknown'
                                                    ? 'Unknown'
                                                    : parseInt(homeworld.population).toLocaleString()}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Stack>
                )}
            </DialogContent>
        </Dialog>
    );
};