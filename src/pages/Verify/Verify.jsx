import { useState } from "react";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import OtpInput from "react-otp-input";
import { verifyOtp } from "../../store/patientServices";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const isMobile = useMediaQuery("(max-width:599px)");
  const navigate = useNavigate();

  const handleVerify = () => {
    const user = JSON.parse(localStorage.getItem("osc-user"));
    const id = user.id;

    verifyOtp(id, otp)
      .then((res) => {
        if (user.userType === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/patient/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Stack
      sx={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
      direction={{ md: "row", xs: "column" }}
    >
      <Box
        sx={{
          bgcolor: "#FFF",
          flexBasis: { xs: "100%", md: "50%" },
          px: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            my: "20px",
            gap: "16px",
            maxWidth: "453px",
            alignItems: "flex-start",
            p: "20px",
          }}
        >
          <Box>
            <image
              src={"https://d8cele0fjkppb.cloudfront.net/sitepics/logo.png"}
              alt="Recroot Mobile Logo"
              height={35}
              width={160}
              style={{ height: "35px", width: "160px" }}
            />
          </Box>
          <Box sx={{ paddingTop: "20%" }}>
            <Typography
              sx={{
                fontSize: { xs: "24px", md: "40px" },
                fontWeight: 700,
                color: "#575757",
              }}
              mb={2}
            >
              Verify your Email
            </Typography>
            <Typography
              sx={{ fontSize: { xs: "14px", md: "24px" }, fontWeight: 500 }}
              mb={4}
            >
              To verify the Email Address, Enter the code below
            </Typography>
            <OtpInput
              onChange={setOtp}
              value={otp}
              numInputs={4}
              className="otpinput"
              inputStyle={{
                width: isMobile ? "2.5rem" : "4rem",
                height: isMobile ? "2.5rem" : "4rem",
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
              sx={{
                width: "172px",
                fontSize: "18px",
                bgcolor: "#073742 !important",
                textTransform: "capitalize",
                marginTop: "48px",
                marginBottom: "24px",
              }}
              onClick={() => handleVerify()}
            >
              Verify
            </Button>

            <Typography
              sx={{ fontSize: { xs: "14px", md: "20px" }, fontWeight: 500 }}
            >
              Make sure to review your spam folder if OTP is not found ,
              <span
                style={{ color: "#2699FF", fontWeight: "bold" }}
                // onClick={sendCode}
              >
                Click here
              </span>{" "}
            </Typography>
          </Box>
        </Stack>
      </Box>
      <Stack
        sx={{ justifyContent: { xs: "center" } }}
        flexBasis={{ xs: "100%", md: "50%" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <img
            src="/images/verify.jpg"
            alt="Illustration"
            style={{ height: "100%", width: "100%" }}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Verify;
