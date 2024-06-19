import React, { useState } from "react";
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
const drawerWidth = 240;

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
  const textAfterLastSlash =
    lastIndex !== -1 ? path.substring(lastIndex + 1) : path;
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const getIcons = (page) => {
    if (page === "Dashboard") return <HomeIcon />;
    if (page === "Diagnosed Reports") return <CoPresentIcon />;
    if (page === "My Appointments") return <BedroomParentIcon />;
    if (page === "My Profile") return <AccountBoxIcon />;
  };
  const logout = () => {
    localStorage.removeItem("osc-token");
    localStorage.removeItem("osc-user");
    window.location.href = "/login";
  };

  const goToDiagnose = () => {
    navigate("/patient/instruction");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} enableColorOnDark>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: "white",
              display: { md: "block", sm: "none", xs: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ color: "white", width: "100%", textAlign: "start" }}
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
      <Drawer variant="permanent" open={open}>
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
                  {getIcons(page.page)}
                </ListItemIcon>
                <ListItemText
                  primary={page.page}
                  sx={{ opacity: open ? 1 : 0 }}
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
          p: 3,
          height: "100vh",
          overflow: "auto",
          paddingTop: "50px",
          bgcolor: "#f6f3f3",
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default PatientLayout;
