import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const FindDonorsPage = () => {
  const [searchParams, setSearchParams] = useState({ name: '', bloodType: '', location: '' });
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);

  useEffect(() => {
    axios.get('/api/donors')
      .then(response => {
        setDonors(response.data);
        setFilteredDonors(response.data);
      })
      .catch(error => console.error('Error fetching donor data:', error));
  }, []);

  useEffect(() => {
    setFilteredDonors(
      donors.filter(donor =>
        (searchParams.name ? donor.name.toLowerCase().includes(searchParams.name.toLowerCase()) : true) &&
        (searchParams.bloodType ? donor.bloodType === searchParams.bloodType : true) &&
        (searchParams.location ? donor.location.toLowerCase().includes(searchParams.location.toLowerCase()) : true)
      )
    );
  }, [searchParams, donors]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevParams => ({ ...prevParams, [name]: value }));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" align="center" gutterBottom>
        Find Blood Donors
      </Typography>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <TextField
          label="Name"
          name="name"
          value={searchParams.name}
          onChange={handleSearchChange}
          style={{ marginRight: '1rem' }}
        />
        <TextField
          label="Blood Type"
          name="bloodType"
          value={searchParams.bloodType}
          onChange={handleSearchChange}
          style={{ marginRight: '1rem' }}
        />
        <TextField
          label="Location"
          name="location"
          value={searchParams.location}
          onChange={handleSearchChange}
          style={{ marginRight: '1rem' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFilteredDonors(donors)}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </div>
      <Grid container spacing={4}>
        {filteredDonors.map((donor) => (
          <Grid item xs={12} sm={6} md={4} key={donor.id}>
            <Card>
              <CardMedia
                component="img"
                alt={donor.name}
                height="140"
                image={donor.image || '/default-avatar.png'}
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
        ))}
      </Grid>
    </Container>
  );
};

export default FindDonorsPage;
