import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/system";
import {
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { registerService } from "../../store/patientServices";
import { useDispatch } from "react-redux";
import { ERROR, SUCCESS } from "../../components/CustomAlerts/constants";
import { openAlert } from "../../store/slices/alertSlice";

const Illustration = styled("div")({
  textAlign: "center",
  borderRadius: "20px",
  height: "555px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const FormContainer = styled(Paper)({});

const StyledInput = styled(TextField)({
  "&.MuiFormHelperText-root": {
    fontSize: "12px",
    width: "100% !important",
  },
  "&.MuiInputBase-input-MuiOutlinedInput-input ": {
    fontSize: "20px",
  },
  "&:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px white inset", // Adjust the color as needed
  },
});

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
});

const Register = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "male",
    userType: "patient",
  };
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    registerPatient(values);
    setSubmitting(false);
  };

  const registerPatient = async (values) => {
    await registerService(values)
      .then((response) => {
        dispatch(
          openAlert({
            status: SUCCESS,
            message: "Registered successfully",
          })
        );
        localStorage.setItem("osc-user", JSON.stringify(response.data.patient));
        localStorage.setItem("osc-token", JSON.stringify(response.data.token));
        window.location.href = "/verify";
      })
      .catch((error) => {
        dispatch(
          openAlert({
            status: ERROR,
            message: error?.response?.data?.detail || "something went wrong",
          })
        );
      });
  };

  return (
    <Container
      sx={{
        margin: "",
        backgroundColor: "#FFF !important",
        height: "100%",
        paddingTop: "20px",
      }}
    >
      <Grid container spacing={6} sx={{ padding: "24px" }} maxWidth="lg">
        <Grid
          item
          xs={0}
          sm={0}
          md={5}
          lg={6}
          sx={{
            borderRadius: "24px",
            backgroundColor: "#EBFAFE",
            height: { lg: "fit-content" },
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <Illustration>
            <img
              src="https://cdn.vectorstock.com/i/2000v/52/06/digital-health-flat-vector-4275206.avif"
              alt="Illustration"
              style={{ height: "414px", width: "396px" }}
            />
          </Illustration>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          pt={0}
          sx={{ paddingTop: "9px !important" }}
        >
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Grid item xs={12} sm={12} md={12} lg={11}>
              <FormContainer
                elevation={0}
                sx={{
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "#FFF",
                }}
              >
                <Stack
                  direction={"row"}
                  gap={"16px"}
                  flexWrap={"wrap"}
                  justifyContent={"center"}
                  sx={{ marginBottom: "12px" }}
                >
                  <Typography
                    sx={{
                      alignSelf: "flex-end",
                      fontSize: "30px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "normal",
                      color: "#000",
                    }}
                  >
                    Welcome to
                  </Typography>

                  <img
                    src="https://cdn.vectorstock.com/i/2000v/12/98/heart-in-hand-logo-health-charity-icon-or-symbol-vector-31561298.avif"
                    alt="google_logo"
                    style={{ width: "50px", height: "35px" }}
                  />
                </Stack>
                <Typography
                  sx={{
                    color: "#C7C7C7",
                    "& a": {
                      color: "#263238",
                    },
                    textAlign: "center",
                    marginBottom: "12px",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                  }}
                >
                  Already have an account? <Link to={"/login"}>Log in</Link>
                </Typography>

                <Divider sx={{ color: "#989898", marginBottom: "28px" }} />

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, errors }) => (
                    <Form>
                      <Grid container rowSpacing={3.5}>
                        <Grid item xs={12}>
                          <Grid container columnSpacing={2} rowSpacing={4}>
                            <Grid item xs={12} sm={12} md={6}>
                              <Field
                                as={StyledInput}
                                autoFocus
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                placeholder="Enter First Name"
                                {...(errors.firstName && {
                                  error: true,
                                  helperText: errors?.firstName?.message,
                                })}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <Field
                                as={StyledInput}
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                placeholder="Enter Last Name"
                                error={isSubmitting}
                                {...(errors.lastName && {
                                  error: true,
                                  helperText: errors?.lastName?.message,
                                })}
                              />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Grid container columnSpacing={2} rowSpacing={4}>
                            <Grid item xs={12} sm={12} md={6}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Gender
                                </InputLabel>
                                <Field
                                  as={Select}
                                  labelId="age-select-label"
                                  id="age-select"
                                  name="gender"
                                  label="Gender"
                                >
                                  <MenuItem value={"male"}>Male</MenuItem>
                                  <MenuItem value={"female"}>Female</MenuItem>
                                </Field>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <FormControl fullWidth>
                                <Field
                                  as={StyledInput}
                                  required
                                  fullWidth
                                  id=""
                                  name="dateOfBirth"
                                  autoComplete="family-name"
                                  placeholder="Date of Birth"
                                  type="date"
                                  {...(errors.dateOfBirth && {
                                    error: true,
                                    helperText: errors?.dateOfBirth?.message,
                                  })}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Field
                            as={StyledInput}
                            autoComplete="given-name"
                            sx={{ width: "100%" }}
                            id="email"
                            label={"Email Address"}
                            name="email"
                            placeholder="Work Email Address"
                            type="email"
                            inputStyle={{ marginTop: 10 }}
                            required
                            {...(errors.email && {
                              error: true,
                              helperText: errors?.email?.message,
                            })}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={StyledInput}
                            label={"Create Password"}
                            placeholder="Create Password"
                            type="password"
                            name="password"
                            sx={{
                              width: "100%",
                              fontSize: "18px",
                              fontWeight: "400",
                            }}
                            {...(errors.password && {
                              error: true,
                              helperText: errors?.password?.message,
                            })}
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={StyledInput}
                            placeholder="Confirm Password"
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            required
                            sx={{
                              width: "100%",
                              fontSize: "18px",
                              fontWeight: "400",
                            }}
                            {...(errors.confirmPassword && {
                              error: true,
                              helperText: errors?.confirmPassword?.message,
                            })}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Field as={Checkbox} name="newsLetters" />}
                            label={
                              <span
                                style={{
                                  lineHeight: "20px",
                                  display: "inline-block",
                                  color: "#7D7D7D",
                                  fontSize: "12px",
                                }}
                              >
                                I agree with terms and conditions
                              </span>
                            }
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                              fontSize: "18px",
                              bgcolor: "#073742 !important",
                              textTransform: "capitalize",
                              marginTop: "12px",
                              minWidth: "200px",
                            }}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Register"}
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </FormContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
