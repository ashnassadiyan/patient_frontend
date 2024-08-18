import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiagnosedReports,
  getPendingAppoinment,
} from "../../store/patientServices";
import { addToDo } from "../../store/slices/todoSlice";

import { startLoading, stopLoading } from "../../store/slices/alertSlice";

const PatientDashBoard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [patientDetails, setPatientDetails] = useState({});
  const [OngoingInterviewsData, setOngoingInterviewsData] = useState([
    {
      value: "0",
      title: "Total Diagnosed",
      description: "Total Diagnostic count",
      imageSrc: "/images/1.jpg",
      key: "ongoing",
    },
    {
      value: "0",
      title: "Pending Appoinments",
      description: "Pending Appoinments to be approved",
      imageSrc: "/images/2.jpg",
      key: "last24",
    },
    {
      value: "0",
      title: "Approved Appoinments",
      description: "Total Approved Appoinments",
      imageSrc: "/images/4.jpg",
      key: "weakStudents",
    },
  ]);

  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("osc-user"));
    setPatientDetails(user);
    // dispatch(startLoading());
    setLoading(true);
    let newData = [...OngoingInterviewsData];
    await getDiagnosedReports(user?.id)
      .then((res) => {
        newData[0].value = res.data.diagnosed_count;
      })
      .catch(() => {});
    await getPendingAppoinment(user?.id)
      .then((res) => {
        newData[1].value = res.data.appointment_exist.false;
        newData[2].value = res.data.appointment_exist.true;
      })
      .catch(() => {});

    setLoading(false);
    // dispatch(stopLoading());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Stack sx={{ gap: "20px" }}>
        <Stack
          direction={"row"}
          sx={{
            height: "100%",
            width: "100%",
            justifyContent: "flex-start",
            mt: "20ps",
            mb: "20px",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>
            Welcome {patientDetails?.firstName} {patientDetails?.lastName}
          </Typography>
        </Stack>

        <Grid container spacing={2}>
          {OngoingInterviewsData.map((item, index) => (
            <Grid item md={4} xs={12} sm={6} key={index}>
              <Box
                sx={{
                  borderRadius: "12px",
                  bgcolor: "#fff",
                  p: {
                    xs: "20px 20px 16px 20px",
                    sm: "20px 20px 28px 20px",
                  },
                  width: "100%",
                  height: "100%",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item md={4} xs={4}>
                    <Stack
                      sx={{
                        justifyContent: "center",
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      {loading ? (
                        <CircularProgress color="inherit" />
                      ) : (
                        <Typography
                          sx={{
                            fontSize: "44px",
                            color:
                              index === 0
                                ? "#009343"
                                : index === 1
                                ? "#FF7F4E"
                                : index === 2
                                ? "#006CD9"
                                : "#FFB42F",
                            fontWeight: 700,
                            mb: "12px",
                          }}
                        >
                          {item.value}
                        </Typography>
                      )}

                      <Box>
                        <Typography
                          sx={{
                            fontSize: { xs: "12px", sm: "13px" },
                            fontWeight: 500,
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "10px",
                            fontWeight: 400,
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    md={8}
                    xs={8}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <img src={item.imageSrc} style={{ height: "150px" }} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Alert severity="success">
          Always seek medical help from qualified healthcare professionals.
          Self-diagnosis or relying solely on non-professional sources can lead
          to inaccuracies, as no diagnosis can be 100% accurate without proper
          evaluation and testing. Your health is important—trust it to the
          experts.
        </Alert>
      </Stack>
    </Box>
  );
};

export default PatientDashBoard;
