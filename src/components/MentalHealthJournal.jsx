import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Container } from "@mui/material";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Slider,
  Button,
  Grid,
  Box,
  Paper,
} from "@mui/material";

Chart.register(...registerables);

const Journal = () => {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState(5);
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-entries");
      setJournalEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const addEntry = async () => {
    if (entry.trim() === "") return;
    try {
      await axios.post("http://localhost:5000/add-entry", { text: entry, mood });
      setEntry("");
      fetchEntries();
    } catch (error) {
      console.error("Error saving entry:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" textAlign="center" sx={{ my: 3, fontWeight: "bold", color: "#1976D2" }}>
        📝 Mental Health Journal
      </Typography>

      {/* Journal Entry Input Section */}
      <Card sx={{ p: 3, mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            How are you feeling today?
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Write your thoughts..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Typography variant="body1" sx={{ mb: 1 }}>
            Mood (1 - 10): <strong>{mood}</strong>
          </Typography>

          <Slider
            min={1}
            max={10}
            value={mood}
            onChange={(e, newValue) => setMood(newValue)}
            step={1}
            valueLabelDisplay="auto"
            sx={{ color: "#4CAF50" }}
          />

          <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }} onClick={addEntry}>
            Save Entry
          </Button>
        </CardContent>
      </Card>

      {/* Display Mood Trends & Messages */}
      {journalEntries.length > 0 && (
        <Grid container spacing={3}>
          {/* Mood Trend Chart */}
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📈 Mood Trend Over Time
                </Typography>
                <Line
                  data={{
                    labels: journalEntries.map((entry) => entry.date),
                    datasets: [
                      {
                        label: "Mood Level",
                        data: journalEntries.map((entry) => entry.mood),
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        tension: 0.4,
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Logged Messages with Ratings */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, height: "100%", overflowY: "auto", boxShadow: 3 }}>
              <Typography variant="h6" gutterBottom>
                📝 Logged Entries
              </Typography>

              {journalEntries.map((entry, index) => (
                <Box key={index} sx={{ p: 2, mb: 2, borderRadius: 2, bgcolor: "#F1F8E9", boxShadow: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {entry.text}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Mood: <strong style={{ color: moodColor(entry.mood) }}>{entry.mood}</strong>
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

// Function to color the mood rating
const moodColor = (mood) => {
  if (mood >= 8) return "#4CAF50"; // Green for Happy
  if (mood >= 5) return "#FF9800"; // Orange for Neutral
  return "#F44336"; // Red for Low Mood
};

export default Journal;
