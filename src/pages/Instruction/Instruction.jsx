import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Stack,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Instruction = () => {
  const nativigate = useNavigate();
  const gotoNext = () => {
    nativigate("/patient/diagnose");
  };

  return (
    <div>
      <Card variant="outlined">
        <CardHeader title="Instruction" />
        <CardContent>
          <Stack>
            <Typography>I</Typography>
          </Stack>
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
            >
              Next
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
};

export default Instruction;
