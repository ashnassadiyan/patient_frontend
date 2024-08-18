import { Card, CardContent, CardHeader } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppointmentTable from "../../../components/AppointmentTable/AppointmentTable";
import { getDoctors } from "../../../store/doctorsServices";
import { getAllAppointment } from "../../../store/patientServices";
import { startLoading, stopLoading } from "../../../store/slices/alertSlice";

const Index = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const getappointments = () => {
    dispatch(startLoading());
    getAllAppointment()
      .then((res) => {
        dispatch(stopLoading());
        setData([...res.data.appointment_exist]);
      })
      .catch((error) => {
        dispatch(stopLoading());
        console.log(error);
      });
  };

  useEffect(() => {
    getappointments();
  }, []);

  return (
    <Card variant="outlined">
      <CardHeader title="Appointments" />
      <CardContent>
        <AppointmentTable data={data} getappointments={getappointments} />
      </CardContent>
    </Card>
  );
};

export default Index;
