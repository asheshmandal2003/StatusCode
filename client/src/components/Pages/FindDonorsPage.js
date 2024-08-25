import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import MapComponent from "../Specific/MapComponent";
import { useSelector } from "react-redux";
import DonorCard from "../common/DonorCard";

const FindDonorsPage = () => {
  const [bloodType, setBloodType] = useState(() => "O_POSITIVE");
  const [donors, setDonors] = useState([]);
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);

  const handleChange = (event) => {
    setBloodType(event.target.value);
  };

  async function fetchDonors() {
    if (!profile) {
      return;
    }
    const formdata = new FormData();
    formdata.append("latitude", profile.latitude);
    formdata.append("longitude", profile.longitude);
    formdata.append("state", profile.address.state);
    formdata.append("bloodGroup", bloodType);
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/api/v1/user/${user.id}/profiles?reqDistance=10`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response.data);
        setDonors(response.data ? response.data : []);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
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
        <Button
          variant="contained"
          color="error"
          startIcon={<SearchIcon />}
          onClick={fetchDonors}
        >
          Search
        </Button>
      </Box>
      <MapComponent donors={donors} />

      <Divider sx={{ my: 8 }} />
      <Stack rowGap={3}>
        {donors && donors.map((donor) => <DonorCard donor={donor} />)}
      </Stack>
    </Container>
  );
};

export default FindDonorsPage;
