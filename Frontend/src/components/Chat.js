import React from "react";
import { Container, Paper, Box, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const sendMessage = () => {
  console.log("Message sent!");
};

const Chat = () => (
  <Container maxWidth="md" sx={{ py: 10 }}>
    <Paper sx={{ borderRadius: 4, overflow: "hidden", boxShadow: 3 }}>
      <Box
        sx={{
          bgcolor: "primary.main",
          p: 4,
          color: "white",
        }}
      >
        <Typography variant="h5">Medical Assistant</Typography>
        <Typography variant="body2">
          Certified breast health information
        </Typography>
      </Box>

      <Box
        sx={{
          height: "60vh",
          p: 3,
          bgcolor: "background.default",
          overflowY: "auto",
        }}
      >
        {/* Chat messages */}
      </Box>

      <Box sx={{ p: 3, borderTop: "1px solid", borderColor: "divider" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Ask about symptoms, prevention, or treatments..."
          InputProps={{
            endAdornment: (
              <IconButton color="primary" onClick={sendMessage}>
                <SendIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
    </Paper>
  </Container>
);

export default Chat;
