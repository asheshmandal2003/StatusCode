import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = (values) => {};

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register / Login
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Please enter your email and password to register or log in.
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form style={{ width: "100%", marginTop: "1rem" }}>
              <Field
                as={TextField}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                helperText={<ErrorMessage name="email" />}
                error={touched.email && Boolean(errors.email)}
              />
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <FormHelperText
                  error={touched.password && Boolean(errors.password)}
                >
                  <ErrorMessage name="password" />
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Register / Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
