import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getDoctor, updateDoctor } from "../../../../store/doctorsServices";
import { COZY } from "../../../../theme/spacing";
import validationSchema from "../doctorsValidation";

const EditDoctors = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateDetails, setUpdateDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    specialized: "",
  });

  const formik = useFormik({
    initialValues: { ...updateDetails },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      updateDoctor(id, values)
        .then((response) => {
          resetForm();
          navigate("/admin/doctors");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  useEffect(() => {
    getDoctor(id)
      .then((res) => {
        formik.setFieldValue("email", res.data.data.email);
        formik.setFieldValue("firstName", res.data.data.firstName);
        formik.setFieldValue("lastName", res.data.data.lastName);
        formik.setFieldValue("specialized", res.data.data.specialized);
      })
      .catch(() => {});
  }, []);

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
                Update
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EditDoctors;
