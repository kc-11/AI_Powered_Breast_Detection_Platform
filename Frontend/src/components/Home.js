import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Login from './Login';
import { AuthContext } from '../AuthContext';
import './Home.css';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      setShowLogin(true);
    }
  }, [isAuthenticated]);

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <Box className="home-container">
      <Container maxWidth="lg">
        <Box className="content-box">
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Breast Cancer Detection
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Early detection saves lives. Learn about breast cancer, its symptoms, and how to detect it.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', flexDirection: 'row' }}>
            <Button variant="contained" color="primary" component={RouterLink} to="/detection" sx={{ mr: 2 }}>
              Start Detection
            </Button>
            <Button variant="outlined" color="primary" component={RouterLink} to="/about">
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>
      <Login open={showLogin} onClose={handleCloseLogin} />
    </Box>
  );
};

export default Home;