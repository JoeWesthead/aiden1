import { createTheme, alpha } from '@mui/material';

const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    primary: {
      main: '#7C3AED',
      light: mode === 'light' ? '#9D5FF3' : '#9D5FF3',
      dark: mode === 'light' ? '#6025C9' : '#6025C9',
      contrastText: '#fff',
    },
    secondary: {
      main: '#14B8A6',
      light: mode === 'light' ? '#40C9BA' : '#40C9BA',
      dark: mode === 'light' ? '#0E8A7D' : '#0E8A7D',
      contrastText: '#fff',
    },
    background: {
      default: mode === 'light' ? '#F5F5F5' : '#121212',
      paper: mode === 'light' ? '#fff' : '#1E1E1E',
    },
    text: {
      primary: mode === 'light' ? '#111827' : '#F9FAFB',
      secondary: mode === 'light' ? '#6B7280' : '#9CA3AF',
    },
    action: {
      active: mode === 'light' ? '#6B7280' : '#9CA3AF',
      hover: mode === 'light' ? '#F3F4F6' : alpha('#fff', 0.08),
      selected: mode === 'light' ? '#E5E7EB' : alpha('#fff', 0.16),
      disabled: mode === 'light' ? '#D1D5DB' : '#4B5563',
      disabledBackground: mode === 'light' ? '#F3F4F6' : alpha('#fff', 0.12),
    },
    success: {
      main: mode === 'light' ? '#22C55E' : '#34D399',
      light: mode === 'light' ? '#86EFAC' : '#6EE7B7',
      dark: mode === 'light' ? '#15803D' : '#059669',
      contrastText: mode === 'light' ? '#fff' : '#000',
    },
    warning: {
      main: mode === 'light' ? '#F59E0B' : '#FBBF24',
      light: mode === 'light' ? '#FCD34D' : '#FDE68A',
      dark: mode === 'light' ? '#B45309' : '#D97706',
      contrastText: mode === 'light' ? '#000' : '#000',
    },
    error: {
      main: mode === 'light' ? '#DC2626' : '#EF4444',
      light: mode === 'light' ? '#FCA5A5' : '#FCA5A5',
      dark: mode === 'light' ? '#991B1B' : '#B91C1C',
      contrastText: '#fff',
    },
    divider: mode === 'light' ? '#E5E7EB' : alpha('#fff', 0.12),
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.2s ease, color 0.2s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          transition: 'all 0.2s ease',
        },
        sizeSmall: {
          padding: '6px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
        filled: {
          backgroundColor: mode === 'dark' ? alpha('#fff', 0.1) : undefined,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 6,
            transition: 'background-color 0.2s ease',
            backgroundColor: mode === 'dark' ? alpha('#fff', 0.05) : undefined,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
          borderBottom: `1px solid ${mode === 'light' ? '#E5E7EB' : alpha('#fff', 0.12)}`,
        },
        head: {
          fontWeight: 600,
          backgroundColor: mode === 'light' ? '#F9FAFB' : alpha('#fff', 0.05),
          color: mode === 'light' ? '#374151' : '#E5E7EB',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            borderBottom: 0,
          },
          '&:hover': {
            backgroundColor: mode === 'light' ? alpha('#000', 0.02) : alpha('#fff', 0.02),
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#E5E7EB' : alpha('#fff', 0.12),
          color: mode === 'light' ? '#374151' : '#E5E7EB',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          transition: 'background-color 0.2s ease',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          transition: 'background-color 0.2s ease',
          borderRight: `1px solid ${mode === 'light' ? '#E5E7EB' : alpha('#fff', 0.12)}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: mode === 'light' ? '#E5E7EB' : alpha('#fff', 0.12),
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.2s ease',
          '&.Mui-selected': {
            backgroundColor: mode === 'light' ? alpha('#7C3AED', 0.08) : alpha('#7C3AED', 0.16),
            '&:hover': {
              backgroundColor: mode === 'light' ? alpha('#7C3AED', 0.12) : alpha('#7C3AED', 0.24),
            },
          },
        },
      },
    },
  },
});

export const createAppTheme = (mode: 'light' | 'dark') => {
  return createTheme(getDesignTokens(mode));
};

export default createAppTheme;