import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { createDoctor, getDoctors } from "../../../../store/doctorsServices";
import { COZY } from "../../../../theme/spacing";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ERROR, SUCCESS } from "../../../../components/CustomAlerts/constants";
import { openAlert } from "../../../../store/slices/alertSlice";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstName: Yup.string().required("firstName is required"),
  lastName: Yup.string().required("PasslastNameword is required"),
  specialized: Yup.string().required("specialized is required"),
});

const AddDoctors = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      specialized: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values, "values");

      createDoctor(values)
        .then((response) => {
          resetForm();
          dispatch(
            openAlert({
              status: SUCCESS,
              message: "Doctor added successfully",
            })
          );
          // navigate("/admin/doctors");
        })
        .catch((error) => {
          console.log(error?.response?.data?.detail, "message");
          dispatch(
            openAlert({
              status: ERROR,
              message: error?.response?.data?.detail || "something went wrong",
            })
          );
        });
    },
  });

  return (
    <div>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{
          mt: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Grid container spacing={1} sx={{ width: { md: "50%", sm: "100%" } }}>
          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              id="password"
              autoComplete="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              id="password"
              autoComplete="current-password"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="specialized"
              label="Specialized"
              id="password"
              value={formik.values.specialized}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.specialized && Boolean(formik.errors.specialized)
              }
              helperText={
                formik.touched.specialized && formik.errors.specialized
              }
            />
          </Grid>
          <Grid item md={12}>
            <Stack
              direction={"row"}
              sx={{ justifyContent: "center", alignItems: "center", gap: COZY }}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  fontSize: "18px",
                  bgcolor: "#073742 !important",
                  textTransform: "capitalize",
                  marginTop: "12px",
                  minWidth: "200px",
                }}
                onClick={() => navigate("/admin/doctors")}
              >
                Back
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  fontSize: "18px",
                  bgcolor: "#073742 !important",
                  textTransform: "capitalize",
                  marginTop: "12px",
                  minWidth: "200px",
                }}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AddDoctors;
