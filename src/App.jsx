import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Box, Button, Grid } from "@mui/material";
import ChatSupport from "./components/ChatSupport";
import BreathingExercise from "./components/BreathingExercise";
import MentalHealthJournal from "./components/MentalHealthJournal";

const Home = () => (
    <Box
        sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundImage: "url('/618308.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            px: 3,
        }}
    >
        <Box
            sx={{
                p: 4,
                bgcolor: "rgba(0, 0, 0, 0.6)",
                borderRadius: 3,
                boxShadow: 3,
                maxWidth: 600,
            }}
        >
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                Welcome to MindWell 🌿
            </Typography>
            <Typography variant="body1">
                MindWell is your companion for mental health and well-being. This app helps you manage stress, 
                track your mood, and practice guided breathing exercises. Journaling allows you to reflect on 
                your emotions, and our chatbot is here to provide guidance. Let's embark on a journey towards mindfulness together!
            </Typography>
        </Box>
    </Box>
);

const App = () => {
    return (
        <Router>
          
                {/* Navbar */}
                <AppBar position="static" sx={{ bgcolor: "#2E3B55" }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                            🌿 MindWell
                        </Typography>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/myjournal">MyJournal</Button>
                        <Button color="inherit" component={Link} to="/getmeditation">GetMeditation</Button>
                    </Toolbar>
                </AppBar>

                {/* Page Routing */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/myjournal" element={<MentalHealthJournal />} />
                    <Route path="/getmeditation" element={<BreathingExercise />} />
                </Routes>

                {/* Chatbot (Always Visible) */}
                <Box sx={{ mt: 6 }}>
                    <ChatSupport />
                </Box>
       
        </Router>
    );
};

export default App;
