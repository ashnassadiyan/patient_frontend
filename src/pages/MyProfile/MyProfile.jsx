import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Checkbox from "@mui/material/Checkbox";
import { fetchDetails, updateProfile } from "../../store/patientServices";
import { useDispatch } from "react-redux";
import {
  openAlert,
  startLoading,
  stopLoading,
} from "../../store/slices/alertSlice";
import { ERROR, SUCCESS } from "../../components/CustomAlerts/constants";
import DoneIcon from "@mui/icons-material/Done";
import { formatDateToYYYYMMDD } from "../../helpers/helper";

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

const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem("osc-user"));
  const dispatch = useDispatch();
  const [prfileDetails] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    password: "",
    confirmPassword: "",
    dateOfBirth: formatDateToYYYYMMDD(user.dateOfBirth),
    gender: user.gender,
  });

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    password: Yup.string()
      .nullable()
      .test("password-required", "Password is required", function (value) {
        const { confirmPassword } = this.parent;
        return !confirmPassword || (confirmPassword && value);
      }),
    confirmPassword: Yup.string()
      .nullable()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .test(
        "confirmPassword-required",
        "Confirm Password is required",
        function (value) {
          const { password } = this.parent;
          return !password || (password && value);
        }
      ),
    dateOfBirth: Yup.date().required("Date of birth is required"),
  });

  const handleSubmit = async (values, {}) => {
    dispatch(startLoading());
    updateProfile(user.id, values)
      .then(() => {
        fetchDetails();
        dispatch(stopLoading());
        dispatch(
          openAlert({
            message: "Updated successfully",
            status: SUCCESS,
          })
        );
      })
      .catch(() => {
        dispatch(stopLoading());
        openAlert({
          message: "something went wrong",
          status: ERROR,
        });
      });
  };

  return (
    <Card sx={{ borderRadius: "12px", boxShadow: "none" }}>
      <Typography sx={{ m: "10px 0", fontSize: "24px", fontWeight: 600 }}>
        My Profile
      </Typography>
      <CardContent>
        <Grid container>
          <Grid item md={6}>
            <img
              alt="google_logo"
              className="instrunction"
              src="/images/profile.jpg"
            />
          </Grid>
          <Grid item md={6}>
            <Formik
              initialValues={prfileDetails}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              validateOnBlur={true}
              validateOnChange={false}
            >
              {({ isSubmitting, errors, touched }) => (
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
                            error={
                              touched.firstName && Boolean(errors.firstName)
                            }
                            helperText={touched.firstName && errors.firstName}
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
                            error={touched.lastName && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
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
                              id="dateOfBirth"
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
                      <Grid container columnSpacing={2} rowSpacing={4}>
                        <Grid item md={6} xs={12}>
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
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Field
                            as={StyledInput}
                            placeholder="Confirm Password"
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
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
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="outlined"
                        sx={{ color: "black", bgcolor: "white" }}
                        endIcon={<DoneIcon />}
                      >
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MyProfile;
