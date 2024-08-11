import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import { Button, Stack, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { verifyToken } from "../store/patientServices";

import { makeStyles } from "@mui/styles";

const drawerWidth = 240;
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

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const patientPages = [
  { url: "/patient/dashboard", page: "Dashboard" },
  { url: "/patient/myappoinments", page: "My Appointments" },
  { url: "/patient/diagnosereports", page: "Diagnosed Reports" },
  { url: "/patient/myprofile", page: "My Profile" },
];

const PatientLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const lastIndex = path.lastIndexOf("/");
  console.log(path, "textAfterLastSlash");
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const getIcons = (page, url) => {
    console.log(url, "url");
    if (page === "Dashboard")
      return <HomeIcon sx={{ color: url === path ? "#03a9f4 " : "black" }} />;
    if (page === "Diagnosed Reports")
      return (
        <CoPresentIcon sx={{ color: url === path ? "#03a9f4 " : "black" }} />
      );
    if (page === "My Appointments")
      return (
        <BedroomParentIcon
          sx={{ color: url === path ? "#03a9f4 " : "black" }}
        />
      );
    if (page === "My Profile")
      return (
        <AccountBoxIcon sx={{ color: url === path ? "#03a9f4 " : "black" }} />
      );
  };
  const logout = () => {
    localStorage.removeItem("osc-token");
    localStorage.removeItem("osc-user");
    window.location.href = "/login";
  };

  const goToDiagnose = () => {
    navigate("/patient/instruction");
  };

  useEffect(() => {
    verifyToken()
      .then(() => {})
      .catch((error) => {
        console.log();
      });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        enableColorOnDark
        className={`${classes.navbar}`}
        sx={{ display: { md: "block", sm: "none", xs: "none" } }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: "black",
              display: { md: "block", sm: "none", xs: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ width: "100%", textAlign: "start" }}
          >
            Patient Dashboard
          </Typography>
          <Stack
            direction={"row"}
            sx={{
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              gap: "20px",
              display: { sm: "none", xs: "none", md: "flex" },
            }}
          >
            <Button
              onClick={() => goToDiagnose()}
              variant="outlined"
              sx={{ color: "black", bgcolor: "white" }}
              startIcon={<LocalHospitalIcon />}
            >
              Diagnose
            </Button>
            <Button
              onClick={() => logout()}
              variant="outlined"
              sx={{ color: "black", bgcolor: "white" }}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{ display: { md: "block", sm: "none", xs: "none" } }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {patientPages.map((page, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => navigate(`${page.url}`)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {getIcons(page.page, page.url)}
                </ListItemIcon>
                <ListItemText
                  primary={page.page}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: page.url === path ? "#03a9f4" : "black",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: "30px 15px",
          height: "100vh",
          overflow: "auto",
          paddingTop: { md: "80px", sm: "5px", xs: "5px" },
          bgcolor: "#f6f3f3",
        }}
      >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            justifyContent: "flex-end",
            width: "100%",
            gap: "20px",
            mb: "10px",
            display: { sm: "flex", xs: "flex", md: "none" },
          }}
        >
          <Button
            onClick={() => goToDiagnose()}
            variant="outlined"
            sx={{ color: "black", bgcolor: "white" }}
            startIcon={<LocalHospitalIcon />}
          >
            Diagnose
          </Button>
        </Stack>
        <Outlet />
        <AppBar
          position="fixed"
          color="primary"
          enableColorOnDark
          className={`${classes.navbar}`}
          sx={{
            top: "auto",
            bottom: 0,
            display: { md: "none", sm: "block" },
          }}
        >
          <Toolbar>
            <Stack
              direction={"row"}
              sx={{ gap: "35px", justifyContent: "space-between" }}
            >
              {patientPages.map((page, index) => (
                <IconButton onClick={() => navigate(`${page.url}`)} key={index}>
                  {getIcons(page.page, page.url)}
                </IconButton>
              ))}
              <IconButton>
                <LogoutIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default PatientLayout;
