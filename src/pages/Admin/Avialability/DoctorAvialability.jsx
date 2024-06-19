import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getDoctorAvailability } from "../../../store/doctorsServices";
import { COZY } from "../../../theme/spacing";

const DoctorAvialability = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { firstName, lastName, specialized } = location.state;
  console.log(location.state, "location.state");

  useEffect(() => {
    getDoctorAvailability(id)
      .then(() => {})
      .catch(() => {});
  }, [id]);
  return (
    <div>
      <Stack>
        <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
          <Stack direction={"row"} sx={{ gap: COZY }}>
            <Typography sx={{ fontWeight: 600 }}>
              {firstName} {lastName} :
            </Typography>
            <Typography>{specialized}</Typography>
          </Stack>
          <Button
            onClick={() => navigate(`/admin/doctors/availability/add/${id}`)}
            variant="contained"
          >
            Add New
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default DoctorAvialability;
