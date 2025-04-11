import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 10 }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 6, borderRadius: 4, bgcolor: 'background.paper' }}>
          <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            About Breast Cancer
          </Typography>
          <Typography variant="h5" align="center" paragraph sx={{ color: 'text.secondary', mb: 4 }}>
            Understanding, Prevention, and Early Detection
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
                Understanding Breast Cancer
              </Typography>
              <Typography variant="body1" paragraph>
                Breast cancer is a complex disease caused by uncontrolled cell growth in the breast tissue. It can form tumors and spread to other parts of the body. Key points include:
              </Typography>
              <ul>
                <li>Most common cancer in women, but also affects men.</li>
                <li>Multiple types based on affected cells.</li>
                <li>Risk factors include genetics, hormones, and lifestyle choices.</li>
                <li>Symptoms: lumps, shape changes, skin discoloration, and discharge.</li>
                <li>Early detection through screenings significantly improves outcomes.</li>
              </ul>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: 3,
                  '&:hover img': { transform: 'scale(1.03)' },
                }}
              >
                <img
                  src={require('./images/j.png')}
                  alt="Breast Cancer Awareness"
                  style={{ width: '100%', transition: 'transform 0.3s ease' }}
                />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
              Early Detection & Prevention
            </Typography>
            <Typography variant="body1" paragraph>
              Early detection improves survival rates. Key strategies include:
            </Typography>
            <ul>
              <li>Annual mammograms for women over 40.</li>
              <li>Regular clinical exams with a healthcare provider.</li>
              <li>Self-examinations to detect changes early.</li>
              <li>Risk assessment based on family history.</li>
              <li>Healthy lifestyle: balanced diet, exercise, and limited alcohol intake.</li>
            </ul>
          </Box>

          <Box sx={{ mt: 6 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              We empower individuals with knowledge and AI-driven tools for early breast cancer detection. Our goal is to enhance breast health awareness and enable timely interventions for better patient outcomes.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
