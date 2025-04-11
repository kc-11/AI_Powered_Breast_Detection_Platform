import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [aboutAnchorEl, setAboutAnchorEl] = useState(null);
  const [screeningAnchorEl, setScreeningAnchorEl] = useState(null);
  const [resourcesAnchorEl, setResourcesAnchorEl] = useState(null);

  const handleMenuOpen = (setter) => (event) => setter(event.currentTarget);
  const handleMenuClose = (setter) => () => setter(null);

  const menuItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'About Breast Cancer',
      subitems: [
        { name: 'Symptoms', path: '/symptoms' },
        { name: 'Stages', path: '/stages' },
        { name: 'Risk Factors', path: '/risk-factors' },
        { name: 'Types', path: '/types' }
      ]
    },
    {
      name: 'Screening',
      subitems: [
        { name: 'Self-Exam Guide', path: '/self-exam' },
        { name: 'Mammograms', path: '/mammograms' },
        { name: 'Clinical Guidelines', path: '/guidelines' }
      ]
    },
    { name: 'Prevention', path: '/prevention' },
    {
      name: 'Resources',
      subitems: [
        { name: 'Support Groups', path: '/support' },
        { name: 'Clinical Trials', path: '/trials' },
        { name: 'Financial Aid', path: '/financial-aid' }
      ]
    },
    { name: 'Detection', path: '/detection' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <AppBar position="sticky" sx={{ 
      bgcolor: 'background.paper', 
      boxShadow: 1,
      borderBottom: '1px solid',
      borderColor: 'divider'
    }}>
      <Toolbar sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <MedicalInformationIcon sx={{ 
            fontSize: 40, 
            color: 'secondary.main', 
            mr: 2 
          }}/>
          <Typography variant="h6" sx={{ 
            fontWeight: 700,
            color: 'text.primary',
            letterSpacing: 1
          }}>
            BREAST<span style={{ color: '#3A7D7F' }}>AI</span>
          </Typography>
        </Box>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
          {menuItems.map((item) => (
            item.subitems ? (
              <Box key={item.name}>
                <Button
                  onClick={handleMenuOpen(
                    item.name === 'About Breast Cancer' ? setAboutAnchorEl :
                    item.name === 'Screening' ? setScreeningAnchorEl :
                    setResourcesAnchorEl
                  )}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    '&:hover': { color: 'secondary.main' }
                  }}
                >
                  {item.name}
                </Button>
                <Menu
                  anchorEl={
                    item.name === 'About Breast Cancer' ? aboutAnchorEl :
                    item.name === 'Screening' ? screeningAnchorEl :
                    resourcesAnchorEl
                  }
                  open={Boolean(
                    item.name === 'About Breast Cancer' ? aboutAnchorEl :
                    item.name === 'Screening' ? screeningAnchorEl :
                    resourcesAnchorEl
                  )}
                  onClose={handleMenuClose(
                    item.name === 'About Breast Cancer' ? setAboutAnchorEl :
                    item.name === 'Screening' ? setScreeningAnchorEl :
                    setResourcesAnchorEl
                  )}
                >
                  {item.subitems.map((subitem) => (
                    <MenuItem 
                      key={subitem.name}
                      component={RouterLink}
                      to={subitem.path}
                      onClick={handleMenuClose(
                        item.name === 'About Breast Cancer' ? setAboutAnchorEl :
                        item.name === 'Screening' ? setScreeningAnchorEl :
                        setResourcesAnchorEl
                      )}
                    >
                      {subitem.name}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Button
                key={item.name}
                component={RouterLink}
                to={item.path}
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  '&:hover': { color: 'secondary.main' }
                }}
              >
                {item.name}
              </Button>
            )
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;