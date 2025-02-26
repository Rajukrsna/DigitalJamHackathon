import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ChatSupport from "./components/ChatSupport";
import BreathingExercise from "./components/BreathingExercise";
import MentalHealthJournal from "./components/MentalHealthJournal";

const App = () => {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" textAlign="center" sx={{ my: 3, fontWeight: "bold" }}>
                🧘 Mental Health & Wellbeing
            </Typography>

            {/* Breathing Exercise Section */}
            <Box sx={{ mb: 4 }}>
                <BreathingExercise />
            </Box>

            {/* Mental Health Journal Section */}
            <Box sx={{ mb: 4 }}>
                <MentalHealthJournal />
            </Box>

            {/* Chatbot Section */}
            <Box sx={{ mb: 4 }}>
                <ChatSupport />
            </Box>
        </Container>
    );
};

export default App;
