import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDoctorsCount } from "../../../store/doctorsServices";
import {
  getDiagnosedReports,
  getPatientsCount,
  getPendingAppoinment,
} from "../../../store/patientServices";
import { startLoading, stopLoading } from "../../../store/slices/alertSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [OngoingInterviewsData, setOngoingInterviewsData] = useState([
    {
      value: "0",
      title: "Total Patients",
      description: "Total Patients registered",
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
      title: "Total Doctors",
      description: "Total Doctors registered",
      imageSrc: "/images/3.jpg",
      key: "goodStudents",
    },
    {
      value: "0",
      title: "Total Reports",
      description: "Total Reports generated",
      imageSrc: "/images/4.jpg",
      key: "weakStudents",
    },
  ]);

  const getAllData = async () => {
    dispatch(startLoading());
    setLoading(true);
    let newData = [...OngoingInterviewsData];
    await getPatientsCount().then((res) => {
      newData[0].value = res.data.patients;
    });

    await getPendingAppoinment()
      .then((res) => {
        newData[1].value = res.data.appointment_exist.false;
      })
      .catch((res) => {});

    await getDoctorsCount()
      .then((res) => {
        newData[2].value = res.data.doctors_count;
      })
      .catch(() => {});

    await getDiagnosedReports()
      .then((res) => {
        newData[3].value = res.data.diagnosed_count;
      })
      .catch(() => {});

    console.log(newData, "newData");
    dispatch(stopLoading());
    setOngoingInterviewsData(() => [...newData]);
    setLoading(false);
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <Card variant="outlined" sx={{ bgcolor: "#f6f3f3" }}>
        <CardHeader title="Dashboard" />
        <CardContent>
          {loading ? (
            <CircularProgress color="inherit" />
          ) : (
            <Grid container spacing={2}>
              {OngoingInterviewsData.map((item, index) => (
                <Grid item md={3} xs={12} sm={6} key={index}>
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
                      <Grid item xs={8}>
                        <Typography
                          sx={{
                            fontSize: "24px",
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
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "flex-start",
                        }}
                      >
                        {/* <img
                        alt="google_logo"
                        className="instrunction"
                        src="/images/sympt
                         src="/images/symptoms.jpg"oms.jpg"
                      /> */}
                        <img src={item.imageSrc} style={{ height: "50px" }} />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
