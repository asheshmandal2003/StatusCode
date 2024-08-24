import React from 'react';
import { TextField, Button, Typography, Container, Box, MenuItem, CircularProgress } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  phoneNo: Yup.string().required('Required'),
  bloodGroup: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  district: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  latitude: Yup.string().required('Required'),
  longitude: Yup.string().required('Required'),
  dateofBirth: Yup.date().required('Required')
});

const Profile = () => {
  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Complete Your Profile
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            phoneNo: '',
            bloodGroup: '',
            address: '',
            city: '',
            district: '',
            state: '',
            zipCode: '',
            latitude: '',
            longitude: '',
            dateofBirth: ''
          }}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form style={{ width: '100%', marginTop: '1rem' }}>
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
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="latitude"
                label="Latitude"
                name="latitude"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.latitude}
                helperText={<ErrorMessage name="latitude" />}
                error={touched.latitude && Boolean(errors.latitude)}
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="longitude"
                label="Longitude"
                name="longitude"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.longitude}
                helperText={<ErrorMessage name="longitude" />}
                error={touched.longitude && Boolean(errors.longitude)}
              />
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="dateofBirth"
                label="Date of Birth"
                name="dateofBirth"
                type="date"
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dateofBirth}
                helperText={<ErrorMessage name="dateofBirth" />}
                error={touched.dateofBirth && Boolean(errors.dateofBirth)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                <CircularProgress size={24} sx={{ display: 'none' }} />
                Complete Profile
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Profile;
