import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper, Divider, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import AnalysisIcon from '@mui/icons-material/Assessment';
import WarningIcon from '@mui/icons-material/Warning';
import ReplayIcon from '@mui/icons-material/Replay';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ShareIcon from '@mui/icons-material/Share';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Import your background image
import backgroundImage from './images/About.png'; // Adjust the path as needed

const BackgroundContainer = styled(Box)({
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px 0',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
  boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& > svg': {
    marginRight: theme.spacing(2),
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
}));

const Result = () => {
  const location = useLocation();
  const result = location.state?.result || 'No result available';

  return (
    <BackgroundContainer>
      <Container maxWidth="md">
        <StyledPaper elevation={3}>
          <IconWrapper>
            <AnalysisIcon />
            <Typography variant="h4" component="h1">
              Analysis Result
            </Typography>
          </IconWrapper>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
            {result}
          </Typography>
          <Box sx={{ mt: 4, mb: 3, display: 'flex', alignItems: 'center' }}>
            <WarningIcon color="warning" sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              This is an AI-based prediction and should not be considered a medical diagnosis. 
              Please consult with a healthcare professional for proper evaluation and advice.
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                fullWidth
                variant="contained" 
                color="primary" 
                component={RouterLink} 
                to="/detection"
                startIcon={<ReplayIcon />}
                size="large"
              >
                New Analysis
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                fullWidth
                variant="outlined" 
                color="primary" 
                startIcon={<SaveAltIcon />}
                size="large"
              >
                Save Result
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                fullWidth
                variant="outlined" 
                color="primary" 
                startIcon={<ShareIcon />}
                size="large"
              >
                Share Result
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button 
                fullWidth
                variant="outlined" 
                color="primary" 
                startIcon={<HelpOutlineIcon />}
                size="large"
              >
                Get Help
              </Button>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </BackgroundContainer>
  );
};

export default Result;