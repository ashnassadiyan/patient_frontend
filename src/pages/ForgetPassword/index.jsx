import {
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLocation } from "react-router-dom";
import http from "../../http/http";
import { useDispatch } from "react-redux";
import { openAlert } from "../../store/slices/alertSlice";
import { ERROR, SUCCESS } from "../../components/CustomAlerts/constants";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const emails = query.get("email");

  const [otp, setOtp] = useState("");
  const isMobile = useMediaQuery("(max-width:599px)");
  const [vaidPassword, serValidaPassword] = useState(false);
  const [vaidEmail, setValidEmail] = useState(false);
  const [email, setEmai] = useState("");
  const [eyesClosed, setEyesClosed] = useState(true);
  const [password, setPassword] = useState("");

  console.log(vaidEmail, "vaidEmail");

  useEffect(() => {
    setEmai(emails);
  }, []);

  const updateNewDetails = async () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{5,}$/;

    if (!passwordRegex.test(password)) {
      dispatch(
        openAlert({
          status: ERROR,
          message:
            "Password must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
        })
      );
      return; // Stop further execution if the password is invalid
    }

    http
      .put("auth/update_password", { email: email, password, otp })
      .then((res) => {
        dispatch(
          openAlert({
            status: SUCCESS,
            message: "Password updated , please login agian",
          })
        );
        setTimeout(() => {
          window.location = `/login`;
        }, 5000);
      })
      .catch(() => {
        dispatch(
          openAlert({
            status: ERROR,
            message: "Detailes do not match",
          })
        );
      });
  };

  return (
    <div>
      <Container>
        <Grid container>
          <Grid item md={6} sm={12} xs={12}>
            <img
              alt="google_logo"
              className="landingImages"
              src="/images/forgotpassword.png"
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                gap: "30px",
              }}
            >
              <Stack sx={{ gap: "20px" }}>
                <TextField
                  label="Email"
                  placeholder="Email"
                  value={email}
                  disabled
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

                <Typography
                  sx={{ fontSize: { xs: "14px", md: "24px" }, fontWeight: 500 }}
                  mb={4}
                >
                  Enter the code below
                </Typography>

                <OtpInput
                  onChange={setOtp}
                  value={otp}
                  numInputs={4}
                  className="otpinput"
                  inputStyle={{
                    width: isMobile ? "2.5rem" : "3rem",
                    height: isMobile ? "2.5rem" : "3rem",
                    background: "transparent",
                    border: "2px solid #2699FF",
                    margin: "0 10px",
                    fontSize: "2rem",
                    borderRadius: "12px",
                  }}
                  isInputNum={true}
                  renderInput={(props) => <input {...props} />}
                />

                <Button
                  variant="contained"
                  disabled={!password || !otp}
                  onClick={() => updateNewDetails()}
                >
                  Update
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ForgetPassword;
