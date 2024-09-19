import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import './About.css';

const About = () => {
  return (
    <Box className="about-container">
      <Container maxWidth="lg">
        <Box sx={{ pt: 8, pb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom align="center" className="title">
            About Breast Cancer
          </Typography>
          <Typography variant="h5" align="center" paragraph className="subtitle">
            Understanding, Prevention, and Early Detection
          </Typography>
        </Box>

        <Box className="section">
          <Typography variant="h4" gutterBottom className="section-title">
            Understanding Breast Cancer
          </Typography>
          <Typography variant="body1" paragraph>
            Breast cancer is a complex disease that occurs when cells in the breast tissue grow and divide uncontrollably. These abnormal cells can form tumors and potentially spread to other parts of the body. Key points to understand:
          </Typography>
          <ul>
            <li>It's the most common cancer in women worldwide, but can also affect men.</li>
            <li>There are several types of breast cancer, classified based on the specific cells affected.</li>
            <li>Risk factors include age, genetic predisposition, hormonal factors, and lifestyle choices.</li>
            <li>Symptoms may include lumps, changes in breast size or shape, skin changes, and nipple discharge.</li>
            <li>Regular screenings and self-exams are crucial for early detection and improved outcomes.</li>
            <li>Genetic testing and understanding your family history can provide valuable insights and guide preventive measures.</li>
          </ul>
        </Box>

        <Box className="section">
          <Typography variant="h4" gutterBottom className="section-title">
            Early Detection and Prevention
          </Typography>
          <Typography variant="body1" paragraph>
            Early detection of breast cancer significantly improves treatment outcomes and survival rates. Here's what you need to know:
          </Typography>
          <ul>
            <li>Mammograms: The most effective screening tool, recommended annually for women over 40.</li>
            <li>Clinical Breast Exams: Regular check-ups with a healthcare provider can help detect changes.</li>
            <li>Self-Exams: Monthly self-examinations help you become familiar with your breast tissue.</li>
            <li>Risk Assessment: Understanding your personal risk factors can guide prevention strategies.</li>
            <li>Lifestyle Choices: Maintaining a healthy weight, regular exercise, and limiting alcohol can reduce risk.</li>
            <li>Our AI Tool: Assists in analyzing mammograms, but should be used in conjunction with professional medical advice.</li>
          </ul>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom className="section-title">
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph className="mission-text">
            We are committed to empowering individuals with knowledge and cutting-edge tools for early breast cancer detection. Our advanced AI technology aims to improve breast cancer awareness and outcomes through timely intervention and personalized care strategies. We strive to make breast health information accessible and to contribute to a future where breast cancer is detected early and treated effectively.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;