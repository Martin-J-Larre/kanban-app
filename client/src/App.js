import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseLine from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home } from './pages/Home';
import { Board } from './pages/Board';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';

function App() {
  const theme = createTheme({
    palette: { mode: 'dark' }
  })
  return (
    <ThemeProvider>
      <CssBaseLine />
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/board' element={<Board />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
