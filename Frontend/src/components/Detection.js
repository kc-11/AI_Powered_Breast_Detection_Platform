import React, { useState } from 'react';
import { Container, Typography, Box, Button, CircularProgress, Alert, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Detection.css';

const Detection = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select an image file.');
      return;
    }

    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/result', { state: { result: response.data.result } });
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="detection-container">
      <Container maxWidth="md">
        <Paper elevation={3} className="content-paper">
          <Typography variant="h3" component="h1" gutterBottom className="title">
            Breast Cancer Detection
          </Typography>
          <Typography variant="body1" paragraph className="description">
            Upload a mammogram image for analysis. Our AI-powered system will process the image and provide a prediction.
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" className="upload-button">
                Upload Image
              </Button>
            </label>
            {file && <Typography sx={{ mt: 2 }} className="file-name">{file.name}</Typography>}
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!file || loading}
                className="analyze-button"
              >
                {loading ? <CircularProgress size={24} /> : 'Analyze Image'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Detection;