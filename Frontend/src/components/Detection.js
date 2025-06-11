import { useState } from "react";
import { Container, Paper, Box, Typography, Button, Alert } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Detection = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select an image file.");
      return;
    }
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
      "https://breastguardian-eggmc5fzfmdzbgbf.centralindia-01.azurewebsites.net/predict",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

      navigate("/result", { state: { result: response.data.result } });
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while processing the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Paper
        elevation={0}
        sx={{
          p: 6,
          borderRadius: 4,
          bgcolor: "background.paper",
          boxShadow: 3,
        }}
      >
        <Box textAlign="center" mb={6}>
          <CloudUploadIcon sx={{ fontSize: 80, color: "secondary.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Upload Mammogram Scan
          </Typography>
          <Typography color="text.secondary">
            Supported formats: DICOM, PNG, JPG (Max 10MB)
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box
          sx={{
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: 3,
            p: 6,
            textAlign: "center",
            transition: "all 0.3s",
            "&:hover": { borderColor: "secondary.main" },
          }}
        >
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              component="span"
              size="large"
              startIcon={<UploadFileIcon />}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
                "&:hover": { borderWidth: 2 },
              }}
            >
              Choose File
            </Button>
          </label>
          {file && (
            <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
              Selected: {file.name}
            </Typography>
          )}
        </Box>

        <Box textAlign="center" mt={6}>
          <Button
            variant="contained"
            size="large"
            disabled={loading}
            onClick={handleSubmit}
            sx={{
              px: 8,
              py: 1.5,
              bgcolor: "secondary.main",
              "&:hover": { bgcolor: "secondary.dark" },
            }}
          >
            {loading ? "Analyzing..." : "Analyze Image"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Detection;
