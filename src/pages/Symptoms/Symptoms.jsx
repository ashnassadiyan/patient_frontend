import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { isEmpty } from "lodash";
import { diagnoseReport } from "../../store/patientServices";
import { useDispatch } from "react-redux";
import {
  openAlert,
  startLoading,
  stopLoading,
} from "../../store/slices/alertSlice";
import { ERROR, SUCCESS } from "../../components/CustomAlerts/constants";
import AddIcon from "@mui/icons-material/Add";

function getSymptomsString(arr) {
  return arr.map((item) => item.symptom).join(", ");
}

const Symptoms = () => {
  const location = useLocation();
  const nativigate = useNavigate();
  const dispatch = useDispatch();
  const [symptomsSets, setSymptomsSets] = useState([]);
  const [symptom, setSymptom] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  console.log(location.state, "location.state");

  useEffect(() => {
    const newSymps = location.state.map((s) => {
      return {
        symptom: s?.word,
      };
    });
    setSymptomsSets([...newSymps]);
  }, []);

  const handleDelete = (index) => {
    let sympList = [...symptomsSets];
    sympList.splice(index, 1);
    setSymptomsSets(() => [...sympList]);
  };

  const handleAdd = () => {
    setSymptomsSets((state) => [...state, { symptom }]);
    setSymptom("");
  };

  const handleEdit = (e, index) => {
    setSelectedIndex(index);
    setSymptom(e);
  };

  const saveEdit = () => {
    let sympList = [...symptomsSets];
    sympList[selectedIndex].symptom = symptom;
    setSymptomsSets(() => [...sympList]);
    setSelectedIndex(null);
    setSymptom("");
  };

  const diagnose = () => {
    const user = JSON.parse(localStorage.getItem("osc-user"));

    const data = {
      doctor: "rheumatologist",
      disease: "arthritis",
      symptoms: getSymptomsString(symptomsSets),
    };
    dispatch(startLoading());
    diagnoseReport(user?.id, data)
      .then((res) => {
        dispatch(stopLoading());
        dispatch(
          openAlert({
            message: "Updated successfully",
            status: SUCCESS,
          })
        );
        nativigate(`/patient/diagnoseReport/${res.data.saved_diagnosed_id}`);
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
    //
  };

  const gotoDiagnose = () => {
    nativigate("/patient/diagnose");
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Add Symptoms Manually" />
      <CardContent>
        <Grid container>
          <Grid item md={6} sm={12}>
            <img
              alt="google_logo"
              className="instrunction"
              src="/images/symptoms.jpg"
            />
          </Grid>
          <Grid item md={6} sm={12}>
            <Box
              sx={{
                backgroundColor: "#fff",
                borderRadius: "21px",
                width: "100%",
                p: { md: "24px 24px", sm: "10px" },
              }}
            >
              <FormControl
                sx={{ m: 1, width: "100%", mt: "12px" }}
                variant="outlined"
                size="small"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Add Symptom
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={() => {
                          selectedIndex ? saveEdit() : handleAdd();
                        }}
                        sx={{ color: "#006CD9" }}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="symptom"
                />
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  padding: "20px 20px",
                  gap: "4px",
                }}
              >
                {symptomsSets &&
                  symptomsSets.map((newSymp, index) => (
                    <Chip
                      key={index}
                      sx={{
                        border: "1px solid rgba(0, 0, 0, 0.15)",
                        borderRadius: "4px",
                        fontSize: "13px",
                        backgroundColor: "#fff",
                        "& .MuiChip-deleteIcon": {
                          color: "#fff",
                          borderColor: "#555555",
                          backgroundColor: "#555555",
                          borderRadius: "100%",
                          width: "8px",
                          height: "8px",
                        },
                      }}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography>{newSymp?.symptom}</Typography>
                          <IconButton
                            onClick={(e) => {
                              handleEdit(newSymp?.symptom, index);
                            }}
                            sx={{ marginLeft: "4px", color: "#555555" }}
                          >
                            <EditIcon
                              fontSize="small"
                              sx={{
                                width: "8px",
                                height: "8px",
                                color: "#006CD9",
                              }}
                            />
                          </IconButton>
                        </Box>
                      }
                      deleteIcon={
                        <CloseIcon
                          sx={{ width: "8px", height: "8px", color: "#fff" }}
                        />
                      }
                      onDelete={() => handleDelete(index)}
                    />
                  ))}
              </Box>
              <Typography sx={{ fontSize: "14px", mb: "32px" }}>
                Missed out on any symptoms? Not to worry – we got you covered.
                You can still add them manually, by typing the symptom in the
                “Search box”.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Stack
          direction={"row"}
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          <Button
            onClick={() => gotoDiagnose()}
            variant="outlined"
            sx={{ color: "black" }}
            startIcon={<ChevronLeftIcon />}
          >
            Record
          </Button>
          <Button
            onClick={() => diagnose()}
            variant="outlined"
            sx={{ color: "black" }}
            endIcon={<ChevronRightIcon />}
            disabled={isEmpty(symptomsSets)}
          >
            Diagnose
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default Symptoms;
