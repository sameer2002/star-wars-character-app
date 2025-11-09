import React from 'react';
import { Box, Grid, Card, CardContent, Skeleton, useTheme } from '@mui/material';

/**
 * Loading skeleton component
 */
export const LoadingState = () => {
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', py: 4 }}>
            <Grid container spacing={3}>
                {[...Array(6)].map((_, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                        <Card sx={{ height: '100%', borderRadius: '12px' }}>
                            <Skeleton variant="rectangular" height={200} />
                            <CardContent>
                                <Skeleton
                                    variant="text"
                                    sx={{ mb: 1, bgcolor: theme.palette.mode === 'dark' ? '#333' : '#e0e0e0' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="80%"
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? '#333' : '#e0e0e0' }}
                                />
                                <Skeleton
                                    variant="text"
                                    width="60%"
                                    sx={{ bgcolor: theme.palette.mode === 'dark' ? '#333' : '#e0e0e0' }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};