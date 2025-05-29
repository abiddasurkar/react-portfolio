import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, CssBaseline, createTheme, ThemeProvider, Box } from '@mui/material';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';

function App() {
  // State to track current theme mode, 'light' by default
  const [mode, setMode] = useState('light');

  // Dynamically create theme object based on mode
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: { main: '#1976d2' },
            secondary: { main: '#f6a560' },
            background: { default: '#f4f6f8', paper: '#fff' },
            text: { primary: '#1e1e1e', secondary: '#555' }
          }
        : {
            primary: { main: '#90caf9' },
            secondary: { main: '#f6a560' },
            background: { default: '#121212', paper: '#1e1e1e' },
            text: { primary: '#eee', secondary: '#bbb' }
          }
      )
    },
    typography: {
      fontFamily: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
    },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Box used for page background and padding */}
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Router>
          <Header mode={mode} setMode={setMode} />
          <Container
            maxWidth="lg"
            sx={{
              mt: 4,
              mb: 6,
              flexGrow: 1,
              minHeight: '75vh',
              transition: 'color 0.3s ease',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              {/* Add 404 handler or extra routes here */}
            </Routes>
          </Container>
          <Footer />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;