import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, TextField, Button, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('/chat', { message: input });
      setMessages([...newMessages, { text: response.data.reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="chat-container">
      <Container maxWidth="md">
        <Paper elevation={3} className="chat-paper">
          <Typography variant="h3" component="h1" gutterBottom className="chat-title">
            Chat with Our AI Assistant
          </Typography>
          <Paper elevation={3} className="messages-paper">
            <List>
              {messages.map((message, index) => (
                <ListItem key={index} sx={{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <Paper elevation={1} className={`message-bubble ${message.sender}`}>
                    <ListItemText primary={message.text} />
                  </Paper>
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Paper>
          <Box sx={{ display: 'flex', mt: 2 }}>
            <TextField
              id="chatbox-input"
              fullWidth
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message here..."
              disabled={loading}
              className="chat-input"
            />
            <Button 
              variant="contained" 
              color="primary" 
              endIcon={loading ? <CircularProgress size={24} /> : <SendIcon />} 
              onClick={sendMessage} 
              sx={{ ml: 1 }}
              disabled={loading}
              className="send-button"
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Chat;