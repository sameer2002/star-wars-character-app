import React, { useState } from 'react';
import {
    Box,
    Card,
    TextField,
    Button,
    Typography,
    Container,
    Alert,
    Stack,
    Paper,
    CircularProgress,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../hooks/useAuth';

/**
 * Login form component
 * @param {Object} props
 * @param {Function} props.onLoginSuccess - Login success callback
 */
export const LoginForm = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!username || !password) {
            setError('Please enter username and password');
            setIsLoading(false);
            return;
        }

        try {
            const result = login(username, password);

            if (result) {
                setUsername('');
                setPassword('');
                if (onLoginSuccess) {
                    onLoginSuccess();
                }
            } else {
                setError('Invalid credentials. Try admin/password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                p: 2,
            }}
        >
            <Container maxWidth="sm">
                <Card
                    sx={{
                        borderRadius: '16px',
                        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.25)',
                        overflow: 'hidden',
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                            color: 'white',
                            p: 4,
                            textAlign: 'center',
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <StarIcon sx={{ fontSize: 48 }} />
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                            Star Wars App
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            May the Force be with you
                        </Typography>
                    </Box>

                    {/* Form */}
                    <Box sx={{ p: 4 }}>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                {/* Username Field */}
                                <TextField
                                    fullWidth
                                    label="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={isLoading}
                                    InputProps={{
                                        startAdornment: <PersonIcon sx={{ mr: 1, color: '#999' }} />,
                                    }}
                                    variant="outlined"
                                    placeholder="admin"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                        },
                                    }}
                                />

                                {/* Password Field */}
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    InputProps={{
                                        startAdornment: <LockIcon sx={{ mr: 1, color: '#999' }} />,
                                    }}
                                    variant="outlined"
                                    placeholder="password"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                        },
                                    }}
                                />

                                {/* Error Message */}
                                {error && (
                                    <Alert severity="error" sx={{ borderRadius: '8px' }}>
                                        {error}
                                    </Alert>
                                )}

                                {/* Login Button */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={isLoading}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: '8px',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                                        },
                                        '&:disabled': {
                                            opacity: 0.6,
                                        },
                                        textTransform: 'none',
                                    }}
                                >
                                    {isLoading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        'Login'
                                    )}
                                </Button>
                            </Stack>
                        </form>

                        {/* Demo Credentials */}
                        <Paper
                            elevation={0}
                            sx={{
                                mt: 4,
                                p: 2.5,
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                textAlign: 'center',
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                                Demo Credentials
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                <strong>Username:</strong> admin
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                <strong>Password:</strong> password
                            </Typography>
                        </Paper>
                    </Box>
                </Card>
            </Container>
        </Box>
    );
};