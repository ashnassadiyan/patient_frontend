import { Button, Card, CardContent, CardHeader, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const CardHolder = ({ title, children }) => {
  const navigate = useNavigate();
  return (
    <Card variant="outlined">
      <CardHeader title={title} />
      <CardContent>
        <Stack sx={{ mt: "10px", mb: "10px" }} direction="row">
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            startIcon={<KeyboardArrowLeftIcon />}
          >
            Back
          </Button>
        </Stack>
        {children}
      </CardContent>
    </Card>
  );
};

export default CardHolder;
