import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Stack,
    Avatar,
    IconButton,
    Badge,
    Tooltip,
    Menu,
    MenuItem,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import StarIcon from '@mui/icons-material/Star';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareIcon from '@mui/icons-material/Compare';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAuth } from '../hooks/useAuth';
import { useFavoritesStore } from '../services/favoritesStore';
import { useComparisonStore } from '../services/comparisonStore';
import { useThemeStore } from '../services/themeStore';

/**
 * Header component with responsive design
 */
export const Header = ({ onLogout, onShowFavorites, onShowComparison }) => {
    const { authState } = useAuth();
    const { favorites } = useFavoritesStore();
    const { selectedCharacters } = useComparisonStore();
    const { theme, toggleTheme } = useThemeStore();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="sticky"
            sx={{
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
        >
            <Toolbar
                sx={{
                    py: { xs: 1, sm: 1.5 },
                    px: { xs: 1, sm: 2 },
                    justifyContent: 'space-between',
                }}
            >
                {/* Logo Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                    <StarIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '1rem', sm: '1.5rem' },
                            letterSpacing: '0.5px',
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        Star Wars
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '0.9rem', sm: 'none' },
                            letterSpacing: '0.5px',
                            display: { xs: 'block', sm: 'none' },
                        }}
                    >
                        SW
                    </Typography>
                </Box>

                {/* Desktop Actions */}
                <Stack
                    direction="row"
                    spacing={{ xs: 0.5, sm: 1 }}
                    alignItems="center"
                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                    {/* Favorites Button */}
                    <Tooltip title="My Favorites">
                        <IconButton
                            color="inherit"
                            onClick={onShowFavorites}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            <Badge badgeContent={favorites.length} color="error">
                                <FavoriteIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    {/* Comparison Button */}
                    <Tooltip title="Compare Characters">
                        <IconButton
                            color="inherit"
                            onClick={onShowComparison}
                            disabled={selectedCharacters.length === 0}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            <Badge badgeContent={selectedCharacters.length} color="warning">
                                <CompareIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    {/* Theme Toggle */}
                    <Tooltip title="Toggle Dark Mode">
                        <IconButton
                            color="inherit"
                            onClick={toggleTheme}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                        </IconButton>
                    </Tooltip>

                    {/* User Avatar */}
                    <Avatar
                        sx={{
                            bgcolor: '#fff',
                            color: '#1976d2',
                            fontWeight: 700,
                            width: 32,
                            height: 32,
                            fontSize: '0.875rem',
                        }}
                    >
                        {authState.user?.username?.[0]?.toUpperCase()}
                    </Avatar>

                    {/* Logout */}
                    <Button
                        color="inherit"
                        onClick={onLogout}
                        startIcon={<LogoutIcon />}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            borderRadius: '8px',
                            px: 2,
                            fontWeight: 600,
                            fontSize: '0.875rem',
                        }}
                    >
                        Logout
                    </Button>
                </Stack>

                {/* Mobile Menu */}
                <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                >
                    {/* Favorites Badge */}
                    <IconButton
                        color="inherit"
                        onClick={onShowFavorites}
                        size="small"
                    >
                        <Badge badgeContent={favorites.length} color="error">
                            <FavoriteIcon />
                        </Badge>
                    </IconButton>

                    {/* Comparison Badge */}
                    <IconButton
                        color="inherit"
                        onClick={onShowComparison}
                        disabled={selectedCharacters.length === 0}
                        size="small"
                    >
                        <Badge badgeContent={selectedCharacters.length} color="warning">
                            <CompareIcon />
                        </Badge>
                    </IconButton>

                    {/* More Menu */}
                    <IconButton
                        color="inherit"
                        onClick={handleMenuOpen}
                        size="small"
                    >
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => { toggleTheme(); handleMenuClose(); }}>
                            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                        </MenuItem>
                        <MenuItem onClick={() => { onLogout(); handleMenuClose(); }}>
                            Logout
                        </MenuItem>
                    </Menu>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};