import { Container, Box, Typography, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => (
  <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
    <Container maxWidth="xl">
      <Grid container spacing={6} alignItems="center" sx={{ pt: 15, pb: 15 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            Advanced Breast Cancer Detection
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
            AI-powered early detection system with 98.7% clinical accuracy
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            component={RouterLink} 
            to="/detection"
            sx={{ 
              px: 6,
              py: 2,
              borderRadius: 2,
              bgcolor: 'secondary.main',
              '&:hover': { bgcolor: 'secondary.dark' }
            }}
          >
            Start Analysis
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: 3,
            position: 'relative',
            '&:hover img': { transform: 'scale(1.03)' }
          }}>
            <img 
              src={require('./images/image.jpg')}
              alt="Medical illustration" 
              style={{ 
                width: '100%', 
                height: 'auto',
                transition: 'transform 0.3s ease' 
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

export default Home;
