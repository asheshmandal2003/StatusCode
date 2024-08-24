// src/components/Home/HomePage.js
import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';
import { Link } from 'react-router-dom';
// import BloodDonationImg from '../../assets/blood-donation.jpg';
// import ImpactImage from '../../assets/impact.jpg'; 

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          padding: '2rem 0',
          textAlign: 'center',
          marginBottom: '2rem',
          borderRadius: '8px',
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Blood Bank
        </Typography>
        <Typography variant="h5" paragraph>
          Your one-stop solution for finding blood donors and donors in need. Join our community to save lives and make a difference!
        </Typography>
        <div style={{ marginBottom: '2rem' }}>
          <Button variant="contained" color="primary" component={Link} to="/register" style={{ margin: '0 0.5rem' }}>
            Register as a Donor
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/login" style={{ margin: '0 0.5rem' }}>
            Login
          </Button>
        </div>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              alt="Blood Donation"
              height="140"
            //   image={BloodDonationImg} 
            />
            <CardContent>
              <Typography variant="h6">Become a Donor</Typography>
              <Typography variant="body2" color="textSecondary">
                Join our network of blood donors and help those in need. It's quick and easy to sign up!
              </Typography>
              <Button variant="outlined" color="primary" component={Link} to="/register" style={{ marginTop: '1rem' }}>
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              alt="Find Donors"
              height="140"
            //   image={BloodDonationImg}
            />
            <CardContent>
              <Typography variant="h6">Find Blood Donors</Typography>
              <Typography variant="body2" color="textSecondary">
                Search for blood donors based on your location and blood type. Our platform makes it easy to connect.
              </Typography>
              <Button variant="outlined" color="primary" component={Link} to="/find-donors" style={{ marginTop: '1rem' }}>
                Find Donors
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', margin: '4rem 0' }}>
        <Typography variant="h4" gutterBottom>
          Our Impact
        </Typography>
        <Typography variant="h6" paragraph>
          Here are some statistics showing the difference we've made together:
        </Typography>
        {/* <img src={ImpactImage} alt="Impact Statistics" style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }} /> */}
      </Box>

      <Box sx={{ backgroundColor: '#f5f5f5', padding: '2rem 0', textAlign: 'center', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1" paragraph>
          Have questions? We've got answers! Check out our FAQs to learn more about blood donation and our services.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/faqs">
          View FAQs
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
