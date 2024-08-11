import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function getSymptomsString(arr) {
  return arr.map((item) => item.symptom).join(", ");
}

const DiagnoseReport = () => {
  const location = useLocation();
  const [diagnosedDetails, setDiagnosedDetails] = useState({
    doctor: "",
    disease: "",
    symptoms: "",
  });

  useEffect(() => {
    // setDiagnosedDetails(() => ({
    //   symptoms: getSymptomsString(location.state),
    //   doctor: "rheumatologist",
    //   disease: "arthritis",
    // }));
  }, [location.state]);

  return (
    <Card variant="outlined">
      <CardHeader title="Diagnosed Report" />
      <CardContent>
        <Grid container>
          <Grid item md={6} sm={12} xs={12}></Grid>

          <Grid item md={6} sm={12} xs={12}>
            <Stack
              sx={{
                backgroundColor: "#fff",
                borderRadius: "21px",
                width: "100%",
                p: { md: "24px 24px", sm: "10px" },
                gap: "10px",
              }}
            >
              <Stack sx={{ alignItems: "flex-start" }}>
                <Typography sx={{ fontWeight: 600 }}>Symptoms</Typography>
                <Stack direction={"row"}>
                  <Typography> {diagnosedDetails.symptoms}</Typography>
                </Stack>
              </Stack>

              <Stack sx={{ alignItems: "flex-start" }}>
                <Typography sx={{ fontWeight: 600 }}>
                  Diagnosed disease
                </Typography>
                <Stack direction={"row"}>
                  <Typography> {diagnosedDetails.disease}</Typography>
                </Stack>
              </Stack>

              <Stack sx={{ alignItems: "flex-start" }}>
                <Typography sx={{ fontWeight: 600 }}>
                  Suggested doctor
                </Typography>
                <Stack direction={"row"}>{diagnosedDetails.doctor}</Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Stack
          direction={"row"}
          sx={{ width: "100%", justifyContent: "flex-end" }}
        >
          <Button
            // onClick={() => diagnose()}
            variant="outlined"
            sx={{ color: "black" }}
            endIcon={<ChevronRightIcon />}
            // disabled={isEmpty(symptomsSets)}
          >
            Make a Appointment
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default DiagnoseReport;
