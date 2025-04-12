import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { common } from '@mui/material/colors';

type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
  mode: ThemeMode;
  toggleColorMode: () => void;
}

const ThemeModeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
};

const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'light' || stored === 'dark') {
      setMode(stored as ThemeMode);
    } else {
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const nextMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', nextMode);
      return nextMode;
    });
  };

  const theme: Theme = useMemo(() => {
    const baseColors = {
      primary: {
        main: '#343434',
        contrastText: '#d7b586',
      },
      secondary: {
        main: '#d7b586',
        contrastText: '#343434',
      },
    };

    const textColors = {
      primary: '#343434',
      secondary: '#d7b586',
    };

    return createTheme({
      palette: {
        mode,
        background: {
          default: mode === 'dark' ? '#20232a' : '#f8f8ff',
          paper: mode === 'dark' ? '#2a2d35' : common.white,
        },
        primary: baseColors.primary,
        secondary: baseColors.secondary,
        text: {
          primary: mode === 'dark' ? '#f4f4f4' : textColors.primary,
          secondary: mode === 'dark' ? '#d7b586' : textColors.secondary,
        },
      },
      components: {
        MuiContainer: {
          styleOverrides: {
            root: {
              height: '100%',
            },
            maxWidthLg: {
              '@media (min-width: 1280px)': {
                maxWidth: '1300px',
              },
            },
          },
        },
        MuiCssBaseline: {
          styleOverrides: {
            html: { height: '100%' },
            body: {
              background: mode === 'dark' ? '#20232a' : '#f4f6f8',
              height: '100%',
              minHeight: '100%',
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
