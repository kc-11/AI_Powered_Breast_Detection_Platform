import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Symptoms from './components/Symptoms';
import Detection from './components/Detection';
import Result from './components/Result';
import Chat from './components/Chat';
import theme from './theme';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/detection" element={<Detection />} />
            <Route path="/result" element={<Result />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;