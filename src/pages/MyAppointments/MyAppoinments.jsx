import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppointmentTable from "../../components/AppointmentTable/AppointmentTable";
import { getAppointment } from "../../store/patientServices";
import { startLoading, stopLoading } from "../../store/slices/alertSlice";

const MyAppoinments = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("osc-user"));
    dispatch(startLoading());
    getAppointment(user.id)
      .then((res) => {
        dispatch(stopLoading());
        setData(res.data.appointment_exist);
      })
      .catch(() => {
        dispatch(stopLoading());
      });
  }, []);
  return (
    <div>
      <Card sx={{ borderRadius: "12px", boxShadow: "none" }}>
        <Typography sx={{ m: "10px 0", fontSize: "24px", fontWeight: 600 }}>
          My Appointments
        </Typography>

        <CardContent>
          <AppointmentTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAppoinments;
