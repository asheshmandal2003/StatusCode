import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent, CardMedia, CardActions, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { debounce } from 'lodash';

const sampleDonors = [
  { id: 1, name: 'John Doe', bloodType: 'A+', location: 'New York', image: '/default-avatar.png' },
  { id: 2, name: 'Jane Smith', bloodType: 'B-', location: 'Los Angeles', image: '/default-avatar.png' },
  { id: 3, name: 'Emily Johnson', bloodType: 'O+', location: 'Chicago', image: '/default-avatar.png' },
];

const FindDonorsPage = () => {
  const [searchParams, setSearchParams] = useState({ name: '', bloodType: '', location: '' });
  const [donors, setDonors] = useState(sampleDonors);
  const [filteredDonors, setFilteredDonors] = useState(sampleDonors);

  useEffect(() => {
    axios.get('/api/donors')
      .then(response => {
        setDonors(response.data);
        setFilteredDonors(response.data);
      })
      .catch(error => console.error('Error fetching donor data:', error));
  }, []);

  useEffect(() => {
    const debounceFilter = debounce(() => {
      setFilteredDonors(
        donors.filter(donor =>
          (searchParams.name ? donor.name.toLowerCase().includes(searchParams.name.toLowerCase()) : true) &&
          (searchParams.bloodType ? donor.bloodType === searchParams.bloodType : true) &&
          (searchParams.location ? donor.location.toLowerCase().includes(searchParams.location.toLowerCase()) : true)
        )
      );
    }, 300);

    debounceFilter();
    return () => debounceFilter.cancel();
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
      <Box sx={{ marginBottom: '2rem', textAlign: 'center' }}>
        <TextField
          label="Name"
          name="name"
          value={searchParams.name}
          onChange={handleSearchChange}
          sx={{ marginRight: '1rem', minWidth: '150px' }}
        />
        <TextField
          label="Blood Type"
          name="bloodType"
          value={searchParams.bloodType}
          onChange={handleSearchChange}
          sx={{ marginRight: '1rem', minWidth: '100px' }}
        />
        <TextField
          label="Location"
          name="location"
          value={searchParams.location}
          onChange={handleSearchChange}
          sx={{ marginRight: '1rem', minWidth: '150px' }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>
      <Grid container spacing={4}>
        {filteredDonors.length > 0 ? filteredDonors.map((donor) => (
          <Grid item xs={12} sm={6} md={4} key={donor.id}>
            <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
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
        )) : (
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
