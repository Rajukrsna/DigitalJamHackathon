import React, { useState } from "react";
import axios from "axios";
import { IconButton, TextField, Button, Typography, Paper, Box, Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const ChatSupport = () => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            const response = await axios.post("http://localhost:5000/chat", { message });
            setChat([...chat, { user: message, bot: response.data.botResponse }]);
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <Fab 
                color="primary" 
                aria-label="chat" 
                onClick={() => setIsChatOpen(!isChatOpen)} 
                sx={{ 
                    position: "fixed", 
                    bottom: 20, 
                    right: 20 
                }}
            >
                {isChatOpen ? <CloseIcon /> : <ChatIcon />}
            </Fab>

            {/* Chat Window */}
            {isChatOpen && (
                <Paper 
                    elevation={3} 
                    sx={{ 
                        position: "fixed", 
                        bottom: 80, 
                        right: 20, 
                        width: 300, 
                        p: 2, 
                        borderRadius: 2, 
                        backgroundColor: "#f4f4f4"
                    }}
                >
                    <Typography variant="h6" textAlign="center">🧘 Mental Health Chat</Typography>

                    <Box 
                        sx={{ 
                            height: 250, 
                            overflowY: "auto", 
                            p: 1, 
                            backgroundColor: "white", 
                            borderRadius: 1, 
                            border: "1px solid #ddd", 
                            mb: 2 
                        }}
                    >
                        {chat.map((c, i) => (
                            <Box key={i} sx={{ mb: 1 }}>
                                <Typography variant="body1"><strong>You:</strong> {c.user}</Typography>
                                <Typography variant="body2" color="textSecondary"><strong>Bot:</strong> {c.bot}</Typography>
                            </Box>
                        ))}
                    </Box>

                    <TextField
                        fullWidth
                        label="Type a message..."
                        variant="outlined"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        sx={{ mb: 1 }}
                    />
                    <Button variant="contained" color="primary" onClick={sendMessage} fullWidth>
                        Send
                    </Button>
                </Paper>
            )}
        </>
    );
};

export default ChatSupport;
