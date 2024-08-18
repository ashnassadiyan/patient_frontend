import {
  Alert,
  AlertTitle,
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { getReport } from "../../store/patientServices";
import {
  openAlert,
  startLoading,
  stopLoading,
} from "../../store/slices/alertSlice";
import { useDispatch } from "react-redux";
import { ERROR } from "../../components/CustomAlerts/constants";
import { formatDateToYYYYMMDDHHMM } from "../../helpers/helper";

function getSymptomsString(arr) {
  return arr.map((item) => item.symptom).join(", ");
}

const DiagnoseReport = () => {
  const nativigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [diagnosedDetails, setDiagnosedDetails] = useState({
    doctor: "",
    disease: "",
    symptoms: "",
  });

  useEffect(() => {
    dispatch(startLoading());
    getReport(id)
      .then((res) => {
        dispatch(stopLoading());
        console.log(res.data.report, "res.data.report");
        setDiagnosedDetails(res.data.report);
      })
      .catch(() => {
        dispatch(stopLoading());
        dispatch(
          openAlert({
            message: "something went wrong",
            status: ERROR,
          })
        );
      });
  }, []);

  const gotoNext = () => {
    nativigate(`/patient/makeAppoinment/${id}`, {
      state: diagnosedDetails,
    });
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Diagnostic report" />
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
                gap: "15px",
              }}
            >
              <Typography sx={{ color: "gray", mt: "20px", mb: "20px" }}>
                Based on the symptoms you provided, here’s what we discovered:
              </Typography>
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

              <Stack sx={{ alignItems: "flex-start" }}>
                <Typography sx={{ fontWeight: 600 }}>Diagnosed At</Typography>
                <Stack direction={"row"}>
                  {formatDateToYYYYMMDDHHMM(diagnosedDetails.created)}
                </Stack>
              </Stack>

              <Alert severity="info" sx={{ mt: "20px" }}>
                <Stack sx={{ gap: "10px" }}>
                  <Typography
                    sx={{ textAlign: "left", fontSize: "14px", color: "gray" }}
                  >
                    VoiceVita is not a substitute for a doctor. We think it’s
                    important to seek medical advice from a specialist. We’ve
                    made it easier by providing the best type of specialist who
                    can help you.
                  </Typography>
                  <Typography
                    sx={{ textAlign: "left", fontSize: "14px", color: "gray" }}
                  >
                    Take the next step to feeling better by making an
                    appointment using our channelling services! Simply click
                    “Make an appointment”.
                  </Typography>
                </Stack>
              </Alert>
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
            onClick={() => gotoNext()}
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
