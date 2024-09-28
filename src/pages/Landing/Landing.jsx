import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { makeStyles } from "@mui/styles";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import PageSlider from "../../components/HomePageSliders";
import Waves from "../../components/HomepageWaves";
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, scrolled }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "transparent",
  // borderBottom: !scrolled ? "1px solid rgba(0, 0, 0, 0.20)" : "none",
  boxShadow: scrolled ? "1px solid rgba(0, 0, 0, 0.20)" : "none",
  ...(open && {
    // borderBottom: "1px solid rgba(0, 0, 0, 0.20)",

    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Landing = () => {
  const classes = useStyles();

  const navigate = (page) => {
    window.location.href = `/${page}`;
  };

  return (
    <Stack sx={{ gap: "10px" }}>
      <Box>
        {" "}
        <AppBar position="fixed" className={`${classes.navbar}`}>
          <Toolbar
            sx={{
              boxShadow: "none",
              paddingLeft: { xs: "0p", md: "30px !important" },
            }}
          >
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
                      onClick={() => {}}
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
                    sx={{
                      borderRadius: "12px",

                      border: "2px solid #2699FF",
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
                        bgcolor: "#2699FF !important",
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
        <Box
          sx={{
            mt: "40px",
            paddingTop: { md: "80px", sm: "5px", xs: "5px" },
            background: "#2699ff",
          }}
        >
          <Container sx={{ padding: "20px 0" }}>
            <Grid container spacing={{ md: 3, sm: 1 }}>
              <Grid
                item
                md={6}
                xs={12}
                sm={12}
                sx={{ padding: "20px", mt: { sm: "20px", md: "0" } }}
              >
                <PageSlider />
              </Grid>
              <Grid item md={6} xs={12} sm={12} sx={{ padding: "10px" }}>
                <Stack
                  sx={{
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    gap: "15px",
                  }}
                >
                  <Typography
                    component={"h1"}
                    sx={{
                      fontSize: "2rem",
                      fontWeight: 600,
                      fontFamily: "DM Sans,sans-serif",
                      color: "white",
                      textAlign: { md: "right", sm: "center" },
                    }}
                  >
                    Welcome
                  </Typography>
                  <Typography
                    component={"h1"}
                    sx={{
                      fontSize: "5rem",
                      fontWeight: 600,
                      fontFamily: "DM Sans,sans-serif",
                      color: "white",
                      textAlign: { md: "right", sm: "center" },
                    }}
                  >
                   VoiceVita
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "1.5rem",
                      fontFamily: "DM Sans,sans-serif",
                      color: "white",
                      textAlign: { md: "right", sm: "center" },
                    }}
                  >
                    Your health is important, and understanding your symptoms
                    should be easy. Our online symptoms checker empowers you to
                    take control of your well-being with just a few clicks.
                  </Typography>
                  <Stack
                    direction={"row"}
                    sx={{
                      justifyContent: {
                        md: "flex-end",
                        sm: "center",
                        xs: "center",
                      },
                    }}
                  ></Stack>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Waves />
      </Box>
      <Button
        variant="contained"
        sx={{
          width: "150px",
          borderRadius: "20px",
          border: "2px solid white",
        }}
        onClick={() => {
          navigate("register");
        }}
      >
        Click here
      </Button>
    </Stack>
  );
};

export default Landing;
