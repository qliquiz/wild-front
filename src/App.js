import CreateForm from "./Components/CreateForm";
import MainForm from "./Components/MainForm";
//import styles from "./App.module.css";
import "./index.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2684ff', // Изменяем основной цвет
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',

  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainForm />} />
        <Route path="/create" element={<CreateForm />} />
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App;
