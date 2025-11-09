import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useLocalStorage } from './useLocalStorage';

/**
 * Hook for authentication management
 * @returns {{authState: Object, login: Function, logout: Function, refreshToken: Function, checkAuth: Function}}
 */
export const useAuth = () => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        token: null,
        user: null,
    });
    const { getItem, setItem, removeItem } = useLocalStorage();

    // Check auth status
    const checkAuth = () => {
        const token = getItem('authToken');
        const userStr = getItem('authUser');

        if (token && authService.isTokenValid(token)) {
            try {
                const user = userStr ? JSON.parse(userStr) : null;
                setAuthState({
                    isAuthenticated: true,
                    token,
                    user,
                });
                return true;
            } catch (err) {
                console.error('Error parsing user:', err);
                removeItem('authToken');
                removeItem('authUser');
                return false;
            }
        }
        return false;
    };

    useEffect(() => {
        // Check localStorage on component mount
        checkAuth();
    }, []);

    const login = (username, password) => {
        try {
            const { token, user } = authService.login(username, password);

            // Update state immediately
            setAuthState({
                isAuthenticated: true,
                token,
                user,
            });

            // Save to localStorage
            setItem('authToken', token);
            setItem('authUser', JSON.stringify(user));

            return true;
        } catch (err) {
            console.error('Login error:', err);
            return false;
        }
    };

    const logout = () => {
        setAuthState({
            isAuthenticated: false,
            token: null,
            user: null,
        });
        removeItem('authToken');
        removeItem('authUser');
    };

    const refreshToken = () => {
        if (authState.token) {
            const newToken = authService.refreshToken(authState.token);
            if (newToken) {
                const updatedState = { ...authState, token: newToken };
                setAuthState(updatedState);
                setItem('authToken', newToken);
                return true;
            }
        }
        return false;
    };

    return { authState, login, logout, refreshToken, checkAuth };
};