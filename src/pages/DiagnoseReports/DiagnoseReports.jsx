import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReportsTable from "../../components/ReportsTable/ReportsTable";
import { getReports } from "../../store/patientServices";
import { startLoading, stopLoading } from "../../store/slices/alertSlice";

const DiagnoseReports = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getAllReports = (id) => {
    dispatch(startLoading());
    getReports(id)
      .then((res) => {
        dispatch(stopLoading());
        setData(res.data.reports);
        console.log(res, "res");
      })
      .catch(() => {
        dispatch(stopLoading());
      });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("osc-user"));
    getAllReports(user.id);
  }, []);

  return (
    <Card sx={{ borderRadius: "12px", boxShadow: "none" }}>
      <CardHeader title="Diagnosed Reports" />
      <CardContent>
        <Grid container>
          <ReportsTable data={data} getReports={getReports} />
        </Grid>
      </CardContent>
      <CardActions>
        <Stack
          direction={"row"}
          sx={{ width: "100%", justifyContent: "space-between" }}
        ></Stack>
      </CardActions>
    </Card>
  );
};

export default DiagnoseReports;
