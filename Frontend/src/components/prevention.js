import { Container, Box, Typography, Grid, List, ListItem, ListItemText, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Prevention = () => (
  <Container maxWidth="xl" sx={{ py: 8 }}>
    <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
      Prevention Strategies
    </Typography>
    
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom>Lifestyle Factors</Typography>
          <List>
            {['Maintain healthy weight', 'Regular exercise', 'Limit alcohol', 'Breastfeed if possible'].map((item) => (
              <ListItem key={item}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 4, boxShadow: 3 }}>
          <Typography variant="h4" gutterBottom>Medical Prevention</Typography>
          <List>
            {['Regular screenings', 'Genetic testing', 'Preventive medications', 'Risk-reducing surgery'].map((item) => (
              <ListItem key={item}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>
    </Grid>
    
    <Box sx={{ mt: 6, textAlign: 'center' }}>
      <Button 
        variant="contained" 
        component={RouterLink}
        to="/risk-assessment"
        sx={{ px: 6, py: 2, borderRadius: 2 }}
      >
        Take Risk Assessment
      </Button>
    </Box>
  </Container>
);

export default Prevention;
