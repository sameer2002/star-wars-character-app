/**
 * Material-UI theme configuration for light and dark modes
 */
export const getTheme = (theme) => {
  const isDark = theme === 'dark';

  return {
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: isDark ? '#0a0e27' : '#f5f5f5',
        paper: isDark ? '#1a1f3a' : '#ffffff',
      },
      text: {
        primary: isDark ? '#ffffff' : '#1a1a1a',
        secondary: isDark ? '#b0b0b0' : '#666666',
      },
      divider: isDark ? '#333333' : '#e0e0e0',
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      body1: {
        color: isDark ? '#ffffff' : '#1a1a1a',
      },
      body2: {
        color: isDark ? '#b0b0b0' : '#666666',
      },
      h6: {
        color: isDark ? '#ffffff' : '#1a1a1a',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#1a1f3a' : '#ffffff',
            color: isDark ? '#ffffff' : '#1a1a1a',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#1a1f3a' : '#ffffff',
            color: isDark ? '#ffffff' : '#1a1a1a',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              color: isDark ? '#ffffff' : '#1a1a1a',
              '& fieldset': {
                borderColor: isDark ? '#444444' : '#d0d0d0',
              },
              '&:hover fieldset': {
                borderColor: isDark ? '#666666' : '#b0b0b0',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
              },
            },
            '& .MuiOutlinedInput-input': {
              color: isDark ? '#ffffff' : '#1a1a1a',
              '&::placeholder': {
                color: isDark ? '#888888' : '#999999',
                opacity: 1,
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            color: isDark ? '#ffffff' : '#1a1a1a',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: isDark ? '#b0b0b0' : '#666666',
            '&.Mui-focused': {
              color: '#1976d2',
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: isDark ? '#ffffff' : '#1a1a1a',
            backgroundColor: isDark ? '#1a1f3a' : '#ffffff',
            '&:hover': {
              backgroundColor: isDark ? '#2a2f4a' : '#f5f5f5',
            },
            '&.Mui-selected': {
              backgroundColor: isDark ? '#2a3f6a' : '#e3f2fd',
              '&:hover': {
                backgroundColor: isDark ? '#2a3f6a' : '#e3f2fd',
              },
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? '#1a1f3a' : '#ffffff',
            color: isDark ? '#ffffff' : '#1a1a1a',
          },
        },
      },
    },
  };
};