import { Box, Button, Pagination, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getPatients } from "../../../store/";
import SearchIcon from "@mui/icons-material/Search";
import { getPatients } from "../../../store/patientServices";
import { COZY, UPPER } from "../../../theme/spacing";
import PatientTable from "../../../components/PatientTable/index";

const AddDoctors = () => {
  const navigate = useNavigate();

  const [filterFields, setFilterFields] = useState({
    firstName: "",
    lastName: "",
    page: 1,
    total: 1,
  });

  const [patients, setDoctors] = useState([]);

  const getAllPatients = () => {
    getPatients(filterFields)
      .then((res) => {
        setDoctors(res.data.patients);
        console.log(res.data.patients, "patients");
      })
      .catch(() => {});
  };

  useEffect(() => {
    getAllPatients();
  }, [filterFields.page]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFilterFields((state) => ({
      ...state,
      [name]: value,
      page: 1,
    }));
  };

  const onPageChange = (e, p) => {
    setFilterFields((state) => ({
      ...state,
      page: p,
    }));
  };

  return (
    <Stack sx={{ gap: COZY }}>
      <Stack direction={"row"} sx={{ gap: COZY, mt: UPPER }}>
        <TextField
          placeholder="First Name"
          fullWidth
          onChange={onChange}
          name={"firstName"}
        />
        <TextField
          placeholder="Last Name"
          fullWidth
          onChange={onChange}
          name={"lastName"}
        />
        <Button
          variant="contained"
          onClick={() => getAllPatients()}
          sx={{ minWidth: "150px" }}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Stack>
      <Stack sx={{ mt: UPPER, gap: COZY }}>
        <PatientTable data={patients} onPageChange={onPageChange} />
        {/* <Stack direction={"row"} sx={{ justifyContent: "flex-end" }}>
          <Pagination
            count={filterFields.page}
            color="secondary"
            onChange={onPageChange}
          />
        </Stack> */}
      </Stack>
    </Stack>
  );
};

export default React.memo(AddDoctors);
