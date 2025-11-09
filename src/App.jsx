import { useState, useEffect } from 'react';
import { Box, Container, Button, createTheme, ThemeProvider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import { CharacterList } from './components/CharacterList';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { FavoritesModal } from './components/FavoritesModal';
import { ComparisonModal } from './components/ComparisonModal';
import { useAuth } from './hooks/useAuth';
import { useCharacters } from './hooks/useCharacters';
import { useThemeStore } from './services/themeStore';
import { getTheme } from './utils/themeConfig';
import './App.css';

function App() {
    const { authState, logout } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const { characters, loading, error, nextPage, prevPage } = useCharacters(currentPage);
    const { theme } = useThemeStore();

    const [showFavorites, setShowFavorites] = useState(false);
    const [showComparison, setShowComparison] = useState(false);

    // Create theme
    const muiTheme = createTheme(getTheme(theme));

    useEffect(() => {
        const token = authState.token;
        if (token) {
            const refreshInterval = setInterval(() => {
                // Token refresh
            }, 30000);

            return () => clearInterval(refreshInterval);
        }
    }, [authState.token]);

    const handleLoginSuccess = () => {
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    const handleLogout = () => {
        logout();
        setCurrentPage(1);
        setTimeout(() => {
            window.location.reload();
        }, 300);
    };

    if (!authState.isAuthenticated) {
        return <LoginForm onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <ThemeProvider theme={muiTheme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    bgcolor: 'background.default',
                    color: 'text.primary',
                }}
            >
                <Header
                    onLogout={handleLogout}
                    onShowFavorites={() => setShowFavorites(true)}
                    onShowComparison={() => setShowComparison(true)}
                />

                <Box component="main" sx={{ flex: 1, py: { xs: 2, sm: 4 } }}>
                    <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
                        {loading ? (
                            <LoadingState />
                        ) : error ? (
                            <ErrorState message={error} onRetry={() => setCurrentPage(1)} />
                        ) : (
                            <>
                                <CharacterList characters={characters} />

                                {/* Pagination */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: { xs: 1, sm: 2 },
                                        mt: { xs: 4, sm: 6 },
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={!prevPage}
                                        startIcon={<ChevronLeftIcon />}
                                        sx={{
                                            borderRadius: '8px',
                                            fontWeight: 600,
                                            fontSize: { xs: '0.8rem', sm: '1rem' },
                                            px: { xs: 1.5, sm: 2 },
                                        }}
                                    >
                                        Prev
                                    </Button>

                                    <Box
                                        sx={{
                                            px: 2,
                                            fontWeight: 700,
                                            minWidth: { xs: 50, sm: 60 },
                                            textAlign: 'center',
                                            fontSize: { xs: '0.9rem', sm: '1rem' },
                                        }}
                                    >
                                        Page {currentPage}
                                    </Box>

                                    <Button
                                        variant="outlined"
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={!nextPage}
                                        endIcon={<ChevronRightIcon />}
                                        sx={{
                                            borderRadius: '8px',
                                            fontWeight: 600,
                                            fontSize: { xs: '0.8rem', sm: '1rem' },
                                            px: { xs: 1.5, sm: 2 },
                                        }}
                                    >
                                        Next
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Container>
                </Box>

                {/* Modals */}
                <FavoritesModal isOpen={showFavorites} onClose={() => setShowFavorites(false)} />
                <ComparisonModal isOpen={showComparison} onClose={() => setShowComparison(false)} />
            </Box>
        </ThemeProvider>
    );
}

export default App;