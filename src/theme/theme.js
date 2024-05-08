import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          overflow-y: scroll;
        }
      `,
    },
  },
});

export default theme;