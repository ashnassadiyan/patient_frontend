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
import ReportsTable from "../../components/ReportsTable/ReportsTable";
import { getReports } from "../../store/patientServices";

const DiagnoseReports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("osc-user"));
    console.log(user, "user");
    getReports(user.id)
      .then((res) => {
        setData(res.data.reports);
        console.log(res, "res");
      })
      .catch(() => {});
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
