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

const Symptoms = () => {
  const location = useLocation();
  const [symptomsSets, setSymptomsSets] = useState([]);
  const [symptom, setSymptom] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const nativigate = useNavigate();

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
    //  nativigate("/patient/symptoms", { state: symptoms });
  };

  const gotoDiagnose = () => {
    nativigate("/patient/diagnose");
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Symptoms" />
      <CardContent>
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "21px",
            width: "100%",
            p: "24px 24px",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: "32px" }}>
            Here are the skills you have mentioned in your resume. You can
            update them as you need.
          </Typography>
          <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
            symptom
          </Typography>
          <FormControl
            sx={{ m: 1, width: "100%", mt: "12px" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Add symptom
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
                    +
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
              padding: "12px 0",
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
        </Box>
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
            Instructions
          </Button>
          <Button
            onClick={() => diagnose()}
            variant="outlined"
            sx={{ color: "black" }}
            endIcon={<ChevronRightIcon />}
            disabled={isEmpty(symptomsSets)}
          >
            Next
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default Symptoms;
