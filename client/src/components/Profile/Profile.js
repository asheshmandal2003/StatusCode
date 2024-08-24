import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    bloodGroup: "",
    address: "",
    city: "",
    district: "",
    state: "",
    zipCode: "",
    latitude: "",
    longitude: "",
    dateofBirth: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`);
        if (response.data) {
          setProfileData(response.data);
        }
      } catch (err) {
        setError("Failed to load profile data.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/profile`, profileData);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save profile data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          Complete Your Profile
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: "1rem" }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phoneNo"
            label="Phone Number"
            name="phoneNo"
            value={profileData.phoneNo}
            onChange={handleChange}
          />
          <TextField
            select
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="bloodGroup"
            label="Blood Group"
            name="bloodGroup"
            value={profileData.bloodGroup}
            onChange={handleSelectChange}
          >
            <MenuItem value="A_POSITIVE">A+</MenuItem>
            <MenuItem value="B_POSITIVE">B+</MenuItem>
            <MenuItem value="O_POSITIVE">O+</MenuItem>
            <MenuItem value="AB_POSITIVE">AB+</MenuItem>
            <MenuItem value="A_NEGATIVE">A-</MenuItem>
            <MenuItem value="B_NEGATIVE">B-</MenuItem>
            <MenuItem value="O_NEGATIVE">O-</MenuItem>
            <MenuItem value="AB_NEGATIVE">AB-</MenuItem>
          </TextField>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="address"
            label="Address"
            name="address"
            value={profileData.address}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="city"
            label="City"
            name="city"
            value={profileData.city}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="district"
            label="District"
            name="district"
            value={profileData.district}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="state"
            label="State"
            name="state"
            value={profileData.state}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="zipCode"
            label="Zip Code"
            name="zipCode"
            value={profileData.zipCode}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="latitude"
            label="Latitude"
            name="latitude"
            value={profileData.latitude}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="longitude"
            label="Longitude"
            name="longitude"
            value={profileData.longitude}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="dateofBirth"
            label="Date of Birth"
            name="dateofBirth"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={profileData.dateofBirth}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            {loading ? <CircularProgress size={24} /> : "Complete Profile"}
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </Box>
    </Container>
  );
};

export default Profile;
