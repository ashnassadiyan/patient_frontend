import { Card, CardContent, CardHeader } from "@mui/material";
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
      <Card variant="outlined">
        <CardHeader title="My Appointments" />
        <CardContent>
          <AppointmentTable data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyAppoinments;
