import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Use 'light' or 'dark' mode
    primary: {
      main: '#646cff', // Customize primary color
    },
    secondary: {
      main: '#535bf2', // Customize secondary color
    },
    background: {
      default: '#242424', // Match your CSS background
      paper: '#333333',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)', // Match your CSS text color
    },
  },
  typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '3.2rem',
      lineHeight: 1.1,
    },
  },
});

export default theme;