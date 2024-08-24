import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { PlayCircleFilled } from '@mui/icons-material';
// import BloodDonationImg from '../../assets/blood-donation.jpg';
// import ImpactImage from '../../assets/impact.jpg';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          backgroundColor: '#e3f2fd',
          padding: '4rem 2rem',
          textAlign: 'center',
          marginBottom: '3rem',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to Blood Bank
        </Typography>
        <Typography variant="h5" paragraph>
          Your one-stop solution for finding blood donors and donors in need. Join our community to save lives and make a difference!
        </Typography>
        <div style={{ marginBottom: '2rem' }}>
          <Button variant="contained" color="primary" component={Link} to="/register" sx={{ margin: '0 0.5rem', fontSize: '1rem' }}>
            Register as a Donor
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/login" sx={{ margin: '0 0.5rem', fontSize: '1rem' }}>
            Login
          </Button>
        </div>
        <IconButton
          color="primary"
          component={Link}
          to="/about"
          sx={{ fontSize: '2rem', marginTop: '1rem' }}
        >
          <PlayCircleFilled />
        </IconButton>
        <Typography variant="body1" sx={{ marginTop: '1rem' }}>
          Learn more about our mission and vision
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardMedia
              component="img"
              alt="Become a Donor"
              height="140"
              // image={BloodDonationImg}
            />
            <CardContent>
              <Typography variant="h6">Become a Donor</Typography>
              <Typography variant="body2" color="textSecondary">
                Join our network of blood donors and help those in need. It's quick and easy to sign up!
              </Typography>
              <Button variant="outlined" color="primary" component={Link} to="/register" sx={{ marginTop: '1rem' }}>
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <CardMedia
              component="img"
              alt="Find Donors"
              height="140"
              // image={BloodDonationImg}
            />
            <CardContent>
              <Typography variant="h6">Find Blood Donors</Typography>
              <Typography variant="body2" color="textSecondary">
                Search for blood donors based on your location and blood type. Our platform makes it easy to connect.
              </Typography>
              <Button variant="outlined" color="primary" component={Link} to="/find-donors" sx={{ marginTop: '1rem' }}>
                Find Donors
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', margin: '4rem 0' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Our Impact
        </Typography>
        <Typography variant="h6" paragraph>
          Here are some statistics showing the difference we've made together:
        </Typography>
        {/* <img src={ImpactImage} alt="Impact Statistics" style={{ width: '100%', maxWidth: '600px', borderRadius: '8px' }} /> */}
        <Typography variant="body1" sx={{ marginTop: '1rem' }}>
          Our platform has helped save thousands of lives by connecting donors and recipients.
        </Typography>
      </Box>

      <Box sx={{ backgroundColor: '#e3f2fd', padding: '2rem 0', textAlign: 'center', borderRadius: '8px' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1" paragraph>
          Have questions? We've got answers! Check out our FAQs to learn more about blood donation and our services.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/faqs" sx={{ marginTop: '1rem' }}>
          View FAQs
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
