import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { loginService } from "../../store/patientServices";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import {
  openAlert,
  startLoading,
  stopLoading,
} from "../../store/slices/alertSlice";
import { ERROR, SUCCESS } from "../../components/CustomAlerts/constants";
import http from "../../http/http";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const state = useSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [eyesClosed, setEyesClosed] = useState(true);
  const [loginScreen, setLoginScreen] = useState(true);
  const [validEmail, setValidaEmail] = useState(false);
  const [email, setEmail] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(startLoading());
      loginService(values)
        .then((response) => {
          dispatch(stopLoading());
          dispatch(
            openAlert({
              status: SUCCESS,
              message: "success",
            })
          );

          localStorage.setItem("osc-user", JSON.stringify(response.data.data));
          localStorage.setItem(
            "osc-token",
            JSON.stringify(response.data.token)
          );

          if (!response.data.data.verify) {
            window.location.href = "/verify";
            return;
          }

          if (response.data.data.userType === "admin") {
            window.location.href = "/admin/dashboard";
          } else {
            window.location.href = "/patient/dashboard";
          }
        })
        .catch((error) => {
          dispatch(stopLoading());
          console.log(error.response.data.detail, "error");
          dispatch(
            openAlert({
              status: ERROR,
              message: error?.response?.data.detail || "something went wrong",
            })
          );
        });
    },
  });

  const onChange = (e) => {
    console.log(e.target.value, "-e-");
    setEmail(e.target.value);
  };

  const sendValidInput = async () => {
    dispatch(startLoading());
    await http
      .post("auth/send_forget", { email })
      .then(() => {
        dispatch(stopLoading());
        dispatch(
          openAlert({
            status: SUCCESS,
            message: "Please check your email",
          })
        );

        setTimeout(() => {
          window.location = `/forgotpassword?email=${email}`;
        }, 5000);
      })
      .catch((error) => {
        dispatch(stopLoading());
        console.log(error, "error");
        dispatch(
          openAlert({
            status: ERROR,
            message: "Please check your email",
          })
        );
      });
  };

  useEffect(() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(email)) {
      setValidaEmail(true);
    } else {
      setValidaEmail(false);
    }
  }, [email]);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            boxShadow: "2px 6px 53px 0px rgba(0,0,0,0.37)",
            borderRadius: "20px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {loginScreen ? "Sign in" : "Forgot Password"}
          </Typography>
          {loginScreen ? (
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                type={eyesClosed ? "password" : "text"}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setEyesClosed(!eyesClosed)}>
                      {eyesClosed ? (
                        <RemoveRedEyeIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  ),
                }}
              />

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
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  {loginScreen ? (
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => {
                        setLoginScreen(false);
                      }}
                    >
                      Forgot password ?
                    </Link>
                  ) : (
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => {
                        setLoginScreen(true);
                      }}
                    >
                      Remember password ?
                    </Link>
                  )}
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => navigate("/register")}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={onChange}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  fontSize: "18px",
                  bgcolor: validEmail
                    ? "#073742 !important"
                    : "gray !important",
                  textTransform: "capitalize",
                  marginTop: "12px",
                  minWidth: "200px",
                }}
                disabled={!validEmail}
                onClick={() => sendValidInput()}
              >
                Send OTP
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => {
                      setLoginScreen(true);
                    }}
                  >
                    Remember password ?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Login;
