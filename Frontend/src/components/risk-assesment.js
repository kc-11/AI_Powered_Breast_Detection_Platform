import { useState } from 'react';
import { Container, Box, Typography, Stepper, Step, StepLabel, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const steps = ['Family History', 'Lifestyle Factors', 'Medical History'];

const RiskAssessment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleAnswer = (question, value) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" gutterBottom>
              Has any first-degree relative been diagnosed with breast cancer?
            </Typography>
            <RadioGroup value={answers.q1} onChange={(e) => handleAnswer('q1', e.target.value)}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
              <FormControlLabel value="unsure" control={<Radio />} label="Not Sure" />
            </RadioGroup>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" gutterBottom>
              Do you drink more than 1 alcoholic beverage per day?
            </Typography>
            <RadioGroup value={answers.q2} onChange={(e) => handleAnswer('q2', e.target.value)}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </Box>
        );
      case 2:
        return (
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" gutterBottom>
              Have you ever had radiation therapy to the chest?
            </Typography>
            <RadioGroup value={answers.q3} onChange={(e) => handleAnswer('q3', e.target.value)}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {getStepContent(activeStep)}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={activeStep === steps.length - 1 ? () => console.log('Submit', answers) : handleNext}>
          {activeStep === steps.length - 1 ? 'Get Results' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
};

export default RiskAssessment;