import React, { useState } from "react";
import axios from "axios";
import { 
  TextField, Button, Card, CardContent, CardActions, Typography, Grid, Container 
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";

const MeditationRecommendation = () => {
  const [mood, setMood] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleRecommend = async () => {
    try {
      const response = await axios.post("http://localhost:5000/medRecommend", { mood });
      setRecommendations(response.data.updatedPractices);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mt: 4, fontWeight: "bold" }}>
        Meditation Recommendation
      </Typography>

      <TextField
        label="Enter your mood"
        variant="outlined"
        fullWidth
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleRecommend} 
        fullWidth
        sx={{ mt: 2 }}
      >
        Get Recommendation
      </Button>

      {recommendations.length > 0 && (
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {recommendations.map((practice, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" component="h3" fontWeight="bold">
                    {practice.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {practice.description}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" fontWeight="bold" sx={{ mt: 2 }}>
                    Benefits:
                  </Typography>
                  <ul>
                    {practice.benefits.map((benefit, i) => (
                      <li key={i} style={{ color: "#388e3c" }}>{benefit}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="secondary" 
                    href={practice.videoUrl} 
                    target="_blank" 
                    startIcon={<YouTubeIcon />}
                  >
                    Watch Guide
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MeditationRecommendation;
