import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ }} component="footer">
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        <Link color="inherit" href="">
          Breast Cancer Detection
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;