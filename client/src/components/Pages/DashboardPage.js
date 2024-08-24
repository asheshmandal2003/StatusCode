import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ActivityIcon from '@mui/icons-material/Timeline';

const Dashboard = () => {
  const profile = {
    firstName: 'John',
    lastName: 'Doe',
    avatar_url: 'https://via.placeholder.com/80',
    phoneNo: '123-456-7890',
    address: {
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345'
    },
    bloodGroup: 'O+',
    dateofBirth: '1990-01-01'
  };

  const user = {
    email: 'john.doe@example.com'
  };

  const activities = [
    { title: 'Activity 1', description: 'Description of activity 1' },
    { title: 'Activity 2', description: 'Description of activity 2' }
  ];

  const notifications = [
    { title: 'Notification 1', message: 'Message of notification 1' },
    { title: 'Notification 2', message: 'Message of notification 2' }
  ];

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ marginTop: 8, marginBottom: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Welcome, {profile.firstName}!
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                avatar={<Avatar alt={profile.firstName} src={profile.avatar_url} sx={{ width: 80, height: 80 }} />}
                title={`${profile.firstName} ${profile.lastName}`}
                subheader={user.email}
                action={
                  <Tooltip title="Edit Profile">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                }
              />
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Phone:</strong> {profile.phoneNo}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Address:</strong> {profile.address?.address || 'N/A'}, {profile.address?.city || 'N/A'}, {profile.address?.state || 'N/A'}, {profile.address?.zipCode || 'N/A'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Blood Group:</strong> {profile.bloodGroup}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Date of Birth:</strong> {profile.dateofBirth ? new Date(profile.dateofBirth).toLocaleDateString() : 'N/A'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                title="Recent Activities"
                avatar={<ActivityIcon color="action" />}
              />
              <CardContent>
                <List>
                  {activities.length ? activities.map((activity, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={activity.title} secondary={activity.description} />
                    </ListItem>
                  )) : <Typography>No recent activities</Typography>}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                title="Notifications"
                avatar={<NotificationsIcon color="action" />}
              />
              <CardContent>
                <List>
                  {notifications.length ? notifications.map((notification, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={notification.title} secondary={notification.message} />
                    </ListItem>
                  )) : <Typography>No notifications</Typography>}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary">
            Edit Profile
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
