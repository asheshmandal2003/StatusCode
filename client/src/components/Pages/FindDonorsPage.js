import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import MapComponent from "../Specific/MapComponent";

const sampleDonors = [
  {
    id: 1,
    name: "John Doe",
    bloodType: "A+",
    location: "New York",
    image: "/default-avatar.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    bloodType: "B-",
    location: "Los Angeles",
    image: "/default-avatar.png",
  },
  {
    id: 3,
    name: "Emily Johnson",
    bloodType: "O+",
    location: "Chicago",
    image: "/default-avatar.png",
  },
];

const FindDonorsPage = () => {
  const [bloodType, setBloodType] = useState(() => "O_POSITIVE");

  const handleChange = (event) => {
    setBloodType(event.target.value);
  };
  const [donors, setDonors] = useState(sampleDonors);
  const [filteredDonors, setFilteredDonors] = useState(sampleDonors);

  useEffect(() => {
    axios
      .get("/api/donors")
      .then((response) => {
        setDonors(response.data);
        setFilteredDonors(response.data);
      })
      .catch((error) => console.error("Error fetching donor data:", error));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <MapComponent />

      <Divider sx={{ my: 8 }} />

      <Typography variant="h2" align="center" gutterBottom>
        Find Blood Donors
      </Typography>

      <Box
        sx={{
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <FormControl sx={{ width: 450 }}>
          <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bloodType}
            label="Blood Group"
            onChange={handleChange}
          >
            <MenuItem value={"O_POSITIVE"}>O+</MenuItem>
            <MenuItem value={"O_NEGATIVE"}>O-</MenuItem>
            <MenuItem value={"A_POSITIVE"}>A+</MenuItem>
            <MenuItem value={"A_NEGATIVE"}>A-</MenuItem>
            <MenuItem value={"B_POSITIVE"}>B+</MenuItem>
            <MenuItem value={"B_NEGATIVE"}>B-</MenuItem>
            <MenuItem value={"AB_POSITIVE"}>AB+</MenuItem>
            <MenuItem value={"AB_NEGATIVE"}>AB-</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" startIcon={<SearchIcon />}>
          Search
        </Button>
      </Box>
      <Grid container spacing={4}>
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <Grid item xs={12} sm={6} md={4} key={donor.id}>
              <Card
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  alt={donor.name}
                  height="140"
                  image={donor.image}
                />
                <CardContent>
                  <Typography variant="h5">{donor.name}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Blood Type: {donor.bloodType}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Location: {donor.location}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Contact
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" color="textSecondary">
              No donors found matching your criteria.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default FindDonorsPage;
