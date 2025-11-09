const FAKE_USER = { username: 'admin', password: 'password' };
const TOKEN_EXPIRY = 3600000; // 1 hour

export const authService = {
    /**
     * Login user with credentials
     * @param {string} username
     * @param {string} password
     * @returns {{token: string, user: {username: string}}}
     */
    login(username, password) {
        if (username === FAKE_USER.username && password === FAKE_USER.password) {
            const token = btoa(JSON.stringify({ username, exp: Date.now() + TOKEN_EXPIRY }));
            return { token, user: { username } };
        }
        throw new Error('Invalid credentials');
    },

    /**
     * Logout user
     * @returns {{token: null, user: null}}
     */
    logout() {
        return { token: null, user: null };
    },

    /**
     * Refresh token
     * @param {string} token - Current token
     * @returns {string|null}
     */
    refreshToken(token) {
        try {
            const decoded = JSON.parse(atob(token));
            if (Date.now() > decoded.exp) {
                return null;
            }
            const newToken = btoa(JSON.stringify({ ...decoded, exp: Date.now() + TOKEN_EXPIRY }));
            return newToken;
        } catch {
            return null;
        }
    },

    /**
     * Check if token is valid
     * @param {string} token - Token to validate
     * @returns {boolean}
     */
    isTokenValid(token) {
        try {
            const decoded = JSON.parse(atob(token));
            return Date.now() <= decoded.exp;
        } catch {
            return false;
        }
    },
};