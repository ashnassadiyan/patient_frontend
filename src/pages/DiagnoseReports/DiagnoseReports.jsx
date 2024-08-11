import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReportsTable from "../../components/ReportsTable/ReportsTable";
import { getReports } from "../../store/patientServices";
import { startLoading, stopLoading } from "../../store/slices/alertSlice";

const DiagnoseReports = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("osc-user"));
    dispatch(startLoading());
    getReports(user.id)
      .then((res) => {
        dispatch(stopLoading());
        setData(res.data.reports);
        console.log(res, "res");
      })
      .catch(() => {
        dispatch(stopLoading());
      });
  }, []);

  return (
    <Card variant="outlined">
      <CardHeader title="Diagnosed Reports" />
      <CardContent>
        <Grid container>
          <ReportsTable data={data} />
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
