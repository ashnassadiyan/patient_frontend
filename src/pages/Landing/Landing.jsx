import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: "#ffff !important",
    transition: "background-color 0.3s ease",
    boxShadow: "none",
    // borderBottom: "1px solid rgba(0, 0, 0, 0.20)",
  },
  navbarScrolled: {
    backgroundColor: "#ffff", // White background when scrolled
    boxShadow: "none", // Add a subtle shadow
  },
}));

const Landing = () => {
  const classes = useStyles();

  const navigate = (page) => {
    window.location.href = `/${page}`;
  };

  return (
    <div>
      <AppBar
        position="fixed"
        // sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.20)" }}
        className={`${classes.navbar}`}
      >
        <Toolbar sx={{ paddingLeft: { xs: "0p", md: "30px !important" } }}>
          <div
            style={{
              minHeight: { xs: "500px", sm: "500px" },
              width: "100%",
              height: "80px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Container>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: {
                    md: "space-between",
                    sm: "space-between",
                    xs: "space-between",
                  },
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Stack
                  direction={"row"}
                  sx={{ gap: "20px", alignItems: "center" }}
                >
                  <img
                    src="https://cdn.vectorstock.com/i/2000v/12/98/heart-in-hand-logo-health-charity-icon-or-symbol-vector-31561298.avif"
                    alt="google_logo"
                    style={{ width: "50px", height: "35px" }}
                  />
                  <Button
                    id="home-button"
                    onClick={() => {
                      // navigate("/");
                      // handleButtonClick("home-button");
                    }}
                    sx={{
                      fontSize: "16px",
                      color: "#3E3E3E",
                      fontWeight: 600,
                      textTransform: "capitalize",
                      borderBottom: "4px solid #2699FF",
                    }}
                  >
                    Home
                  </Button>
                </Stack>

                <Box
                  // className="navSignupToggle"
                  sx={{
                    borderRadius: "12px",

                    border: "2px solid #1EBD53",
                    ml: "20px",
                  }}
                >
                  <Button
                    variant="text"
                    sx={{
                      p: "2px 10px",
                      borderTopRightRadius: "12px",
                      color: "#0F0F0F",
                      fontSize: "17px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      whiteSpace: "nowrap",
                      textTransform: "capitalize",
                    }}
                    onClick={() => {
                      navigate("login");
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      p: "3px 10px",
                      color: "#EDEDED",
                      fontSize: "17px",
                      fontStyle: "normal",
                      fontWeight: 400,
                      whiteSpace: "nowrap",
                      bgcolor: "#1EBD53 !important",
                      textTransform: "capitalize",
                      // borderRadius: "12px",
                    }}
                    onClick={() => {
                      navigate("register");
                    }}
                  >
                    Register
                  </Button>
                </Box>
              </Stack>
            </Container>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Landing;
