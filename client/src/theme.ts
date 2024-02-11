import { createContext } from 'react';

import { PaletteMode } from '@mui/material';
import { grey, orange } from '@mui/material/colors';
export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});
export const getDesignTokens = (mode: PaletteMode) => ({
    typography: {
        fontFamily: 'Poppins',
    },
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                  // Light Mode
                  primary: grey,
                  secondary: {
                      main: '#000000',
                      light: '#333333',
                      dark: '#000000',
                      contrastText: '#ffffff',
                  },
                  background: {
                      default: '#fff',
                      paper: '#fff',
                  },
                  divider: grey[900],
                  text: {
                      primary: grey[900],
                      secondary: grey[800],
                  },
              }
            : {
                  // Dark Mode
                  primary: grey,
                  secondary: orange,
                  background: {
                      default: '#121212',
                      paper: '#1f1f1f',
                  },
                  text: {
                      primary: '#ffffff',
                      secondary: grey[400],
                  },
              }),
    },
    components: {
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: mode === 'light' ? grey[800] : grey[400],
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-root': {
                        outline: 'none',
                        border: 'none',
                    },
                    '& .MuiInputBase-root:before': {
                        outline: 'none',
                    },
                    '& .MuiInputBase-root:after': {
                        outline: 'none',
                    },
                    '& .MuiInputBase-input': {
                        outline: 'none',
                        border: 'none',
                    },
                },
            },
        },
    },
});
