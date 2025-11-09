import React, { useState, useMemo } from 'react';
import { Box, Grid, Typography, Paper, useTheme } from '@mui/material';
import { CharacterCard } from './CharacterCard';
import { CharacterModal } from './CharacterModal';
import { Filters } from './Filters';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

/**
 * Character list with filters
 */
export const CharacterList = ({ characters }) => {
    const theme = useTheme();
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecies, setSelectedSpecies] = useState('');
    const [selectedFilmCount, setSelectedFilmCount] = useState('');
    const [selectedHomeworld, setSelectedHomeworld] = useState('');

    // Get unique species
    const speciesList = useMemo(() => {
        const species = new Set();
        characters.forEach((char) => {
            if (char.species[0]) species.add(char.species[0]);
        });
        return Array.from(species).sort();
    }, [characters]);

    // Get unique homeworlds
    const homeworldList = useMemo(() => {
        const homeworlds = new Set();
        characters.forEach((char) => {
            homeworlds.add(char.homeworld);
        });
        return Array.from(homeworlds).sort();
    }, [characters]);

    // Filter characters
    const filteredCharacters = useMemo(() => {
        return characters.filter((char) => {
            const matchesSearch = char.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSpecies = !selectedSpecies || char.species[0] === selectedSpecies;
            const matchesHomeworld = !selectedHomeworld || char.homeworld === selectedHomeworld;

            let matchesFilms = true;
            if (selectedFilmCount === '1') {
                matchesFilms = char.films.length === 1;
            } else if (selectedFilmCount === '2') {
                matchesFilms = char.films.length === 2;
            } else if (selectedFilmCount === '3') {
                matchesFilms = char.films.length >= 3;
            }

            return matchesSearch && matchesSpecies && matchesHomeworld && matchesFilms;
        });
    }, [characters, searchTerm, selectedSpecies, selectedFilmCount, selectedHomeworld]);

    return (
        <Box>
            <Filters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedSpecies={selectedSpecies}
                onSpeciesChange={setSelectedSpecies}
                speciesList={speciesList}
                selectedFilmCount={selectedFilmCount}
                onFilmCountChange={setSelectedFilmCount}
                selectedHomeworld={selectedHomeworld}
                onHomeworldChange={setSelectedHomeworld}
                homeworldList={homeworldList}
            />

            {filteredCharacters.length === 0 ? (
                <Paper
                    elevation={0}
                    sx={{
                        textAlign: 'center',
                        py: 8,
                        backgroundColor: theme.palette.mode === 'dark' ? '#2a2f4a' : '#f9f9f9',
                        borderRadius: '12px',
                        border: `2px dashed ${theme.palette.divider}`,
                    }}
                >
                    <FolderOpenIcon
                        sx={{
                            fontSize: 64,
                            color: theme.palette.text.secondary,
                            opacity: 0.5,
                            mb: 2,
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.text.secondary,
                            fontWeight: 500,
                            mb: 1,
                        }}
                    >
                        No characters found
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Try adjusting your filters
                    </Typography>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {filteredCharacters.map((character) => (
                        <Grid item xs={12} sm={6} md={4} key={character.url}>
                            <CharacterCard
                                character={character}
                                onClick={setSelectedCharacter}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {selectedCharacter && (
                <CharacterModal
                    character={selectedCharacter}
                    isOpen={!!selectedCharacter}
                    onClose={() => setSelectedCharacter(null)}
                />
            )}
        </Box>
    );
};