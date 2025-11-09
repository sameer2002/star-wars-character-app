import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Button,
    Typography,
    Alert,
    Container,
    useTheme,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/**
 * Error state component
 * @param {Object} props
 * @param {string} props.message - Error message
 * @param {Function} props.onRetry - Retry callback
 */
export const ErrorState = ({ message, onRetry }) => {
    const theme = useTheme();

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '60vh',
                }}
            >
                <Card sx={{ width: '100%', borderRadius: '12px' }}>
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                gap: 2,
                            }}
                        >
                            <ErrorOutlineIcon sx={{ fontSize: 48, color: 'error.main' }} />
                            <Typography
                                variant="h6"
                                component="h3"
                                sx={{
                                    fontWeight: 600,
                                    color: theme.palette.text.primary,
                                }}
                            >
                                Something went wrong
                            </Typography>
                            <Alert severity="error" sx={{ width: '100%' }}>
                                <Typography sx={{ color: 'inherit' }}>{message}</Typography>
                            </Alert>
                            {onRetry && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={onRetry}
                                    fullWidth
                                    sx={{ py: 1.5, borderRadius: '8px', fontWeight: 600 }}
                                >
                                    Try Again
                                </Button>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};