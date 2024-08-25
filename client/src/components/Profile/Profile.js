import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
  CircularProgress,
  Paper,
  Box,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { CloudUploadOutlined, EditOutlined } from "@mui/icons-material";
import { login } from "../../state/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().when("user.role", {
      is: "DONOR",
      then: Yup.string().required("Donor Name is required"),
    }),
    lastName: Yup.string().when("user.role", {
      is: "DONOR",
      then: Yup.string().required("Donor Name is required"),
    }),
    hospitalName: Yup.string().when("user.role", {
      is: "HOSPITAL",
      then: Yup.string().required("Hospital Name is required"),
    }),
    phoneNo: Yup.string().required("Required"),
    bloodGroup: Yup.string().when("user.role", {
      is: "DONOR",
      then: Yup.string().required("Required"),
    }),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    district: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zipCode: Yup.string().required("Required"),
    image: Yup.mixed().required("Required"),
  });

  const getCoordinates = (address) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
          )}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
        )
        .then((response) => {
          if (response.data.features.length > 0) {
            const location = response.data.features[0].center;
            const coordinates = {
              latitude: location[1],
              longitude: location[0],
            };
            resolve(coordinates);
          } else {
            reject(new Error("No results found."));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  async function createProfile(values) {
    const address = `${values.city}, ${values.district}, ${values.state}`;
    const coordinates = await getCoordinates(address);

    const formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    formData.append("latitude", coordinates.latitude);
    formData.append("longitude", coordinates.longitude);

    console.log(...formData);

    if (coordinates) {
      try {
        const response = await axios({
          method: "POST",
          url:
            user.role === "DONOR"
              ? `${process.env.REACT_APP_SERVER_URL}/api/v1/user/${user.id}/profile`
              : `${process.env.REACT_APP_SERVER_URL}/api/v1/user/${user.id}/profile/create`,
          data: formData,
        });
        dispatch(login({ user, profile: response.data }));
        navigate("/");
      } catch (error) {
        console.error("Error creating profile:", error);
      }
    } else {
      throw new Error("Error fetching coordinates.");
    }
  }

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Paper
        sx={{
          width: 500,
          padding: 4,
          marginTop: 8,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Complete Your Profile
        </Typography>
        <Formik
          initialValues={{
            hospitalName: "",
            firstName: "",
            lastName: "",
            phoneNo: "",
            bloodGroup: "",
            address: "",
            city: "",
            district: "",
            state: "",
            zipCode: "",
            image: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setIsSubmitting(true);
            await createProfile(values);
            setIsSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            errors,
            touched,
          }) => (
            <Form style={{ width: "100%", marginTop: "1rem" }}>
              {user.role === "HOSPITAL" && (
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="hospitalName"
                  label="Hospital Name"
                  name="hospitalName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.hospitalName}
                  helperText={<ErrorMessage name="hospitalName" />}
                  error={touched.hospitalName && Boolean(errors.hospitalName)}
                />
              )}
              {user.role === "DONOR" && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    helperText={<ErrorMessage name="firstName" />}
                    error={touched.firstName && Boolean(errors.firstName)}
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    helperText={<ErrorMessage name="lastName" />}
                    error={touched.lastName && Boolean(errors.lastName)}
                  />
                </Box>
              )}
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phoneNo"
                label="Phone Number"
                name="phoneNo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNo}
                helperText={<ErrorMessage name="phoneNo" />}
                error={touched.phoneNo && Boolean(errors.phoneNo)}
              />
              {user.role === "DONOR" && (
                <Field
                  as={TextField}
                  select
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="bloodGroup"
                  label="Blood Group"
                  name="bloodGroup"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bloodGroup}
                  helperText={<ErrorMessage name="bloodGroup" />}
                  error={touched.bloodGroup && Boolean(errors.bloodGroup)}
                >
                  <MenuItem value="A_POSITIVE">A+</MenuItem>
                  <MenuItem value="B_POSITIVE">B+</MenuItem>
                  <MenuItem value="O_POSITIVE">O+</MenuItem>
                  <MenuItem value="AB_POSITIVE">AB+</MenuItem>
                  <MenuItem value="A_NEGATIVE">A-</MenuItem>
                  <MenuItem value="B_NEGATIVE">B-</MenuItem>
                  <MenuItem value="O_NEGATIVE">O-</MenuItem>
                  <MenuItem value="AB_NEGATIVE">AB-</MenuItem>
                </Field>
              )}
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                helperText={<ErrorMessage name="address" />}
                error={touched.address && Boolean(errors.address)}
              />
              <Box
                sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
              >
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  helperText={<ErrorMessage name="city" />}
                  error={touched.city && Boolean(errors.city)}
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="district"
                  label="District"
                  name="district"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.district}
                  helperText={<ErrorMessage name="district" />}
                  error={touched.district && Boolean(errors.district)}
                />
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}
              >
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.state}
                  helperText={<ErrorMessage name="state" />}
                  error={touched.state && Boolean(errors.state)}
                />
                <Field
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  name="zipCode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.zipCode}
                  helperText={<ErrorMessage name="zipCode" />}
                  error={touched.zipCode && Boolean(errors.zipCode)}
                />
              </Box>
              <Box>
                <Box
                  gridColumn="span 4"
                  border={
                    Boolean(touched.image) && Boolean(errors.image)
                      ? "1px solid #b71c1c"
                      : "1px solid #b0bec5"
                  }
                  borderRadius="5px"
                  p="1rem"
                  mb={1}
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("image", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed #80d8ff`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.image ? (
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography color="#757575" variant="body2">
                              Add your picture here
                            </Typography>
                            <CloudUploadOutlined sx={{ color: "#757575" }} />
                          </Box>
                        ) : (
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography>{values.image.name}</Typography>
                            <EditOutlined />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <Typography color="error" variant="caption">
                  {Boolean(touched.image) && errors.image}
                </Typography>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} />
                ) : (
                  "Complete Profile"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default Profile;
