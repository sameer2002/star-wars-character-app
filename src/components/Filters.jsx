import React from 'react';
import {
    Box,
    Card,
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Filter component with homeworld and films filter
 */
export const Filters = ({
    searchTerm,
    onSearchChange,
    selectedSpecies,
    onSpeciesChange,
    speciesList,
    selectedFilmCount,
    onFilmCountChange,
    selectedHomeworld,
    onHomeworldChange,
    homeworldList,
}) => {
    return (
        <Card
            sx={{
                p: { xs: 2, sm: 3 },
                mb: 3,
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                {/* Search Box */}
                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 0 }}>
                    <TextField
                        fullWidth
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{ mr: 1, color: '#999' }} />,
                        }}
                        variant="outlined"
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                            },
                            '& .MuiOutlinedInput-input': {
                                fontSize: { xs: '0.875rem', sm: '1rem' },
                            },
                        }}
                    />
                </Grid>

                {/* Species Filter */}
                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 0 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            Species
                        </InputLabel>
                        <Select
                            value={selectedSpecies}
                            onChange={(e) => onSpeciesChange(e.target.value)}
                            label="Species"
                            sx={{
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-input': {
                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                },
                            }}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {speciesList.map((species) => (
                                <MenuItem key={species} value={species}>
                                    {species}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Films Filter */}
                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 0 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            Films
                        </InputLabel>
                        <Select
                            value={selectedFilmCount}
                            onChange={(e) => onFilmCountChange(e.target.value)}
                            label="Films"
                            sx={{
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-input': {
                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                },
                            }}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="1">1 Film</MenuItem>
                            <MenuItem value="2">2 Films</MenuItem>
                            <MenuItem value="3">3+ Films</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Homeworld Filter */}
                <Grid item xs={12} sm={6} md={3} sx={{ minWidth: 0 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                            Homeworld
                        </InputLabel>
                        <Select
                            value={selectedHomeworld}
                            onChange={(e) => onHomeworldChange(e.target.value)}
                            label="Homeworld"
                            sx={{
                                borderRadius: '8px',
                                '& .MuiOutlinedInput-input': {
                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                },
                            }}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {homeworldList.map((homeworld) => (
                                <MenuItem key={homeworld} value={homeworld}>
                                    {homeworld}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Card>
    );
};