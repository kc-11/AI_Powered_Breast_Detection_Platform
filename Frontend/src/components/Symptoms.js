import React from 'react';
import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './Symptoms.css';

const Symptoms = () => {
  const symptoms = [
    'A breast lump or thickening that feels different from the surrounding tissue',
    'Change in the size, shape or appearance of a breast',
    'Changes to the skin over the breast, such as dimpling',
    'A newly inverted nipple',
    'Peeling, scaling, crusting or flaking of the pigmented area of skin surrounding the nipple (areola) or breast skin',
    'Redness or pitting of the skin over your breast, like the skin of an orange',
  ];

  return (
    <Box className="symptoms-container">
      <Container maxWidth="md">
        <Paper elevation={3} className="content-paper">
          <Typography variant="h3" component="h1" gutterBottom className="title">
            Symptoms of Breast Cancer
          </Typography>
          <Typography variant="body1" paragraph className="subtitle">
            Signs and symptoms of breast cancer may include:
          </Typography>
          <List>
            {symptoms.map((symptom, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FiberManualRecordIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={symptom} className="symptom-text" />
              </ListItem>
            ))}
          </List>
          <Typography variant="body1" paragraph className="footer-text">
            If you notice any changes in your breast, it's important to consult with your doctor promptly.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Symptoms;