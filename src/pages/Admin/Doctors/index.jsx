import { Box, Button, Pagination, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorTable from "../../../components/DoctorTable";
import { getDoctors } from "../../../store/doctorsServices";
import { COZY, UPPER } from "../../../theme/spacing";
import SearchIcon from "@mui/icons-material/Search";

const AddDoctors = () => {
  const navigate = useNavigate();

  const [filterFields, setFilterFields] = useState({
    firstName: "",
    lastName: "",
    specialized: "",
    page: 1,
    total: 1,
  });
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getAllDoctors();
  }, [filterFields.page]);

  const getAllDoctors = () => {
    getDoctors(filterFields)
      .then((res) => {
        console.log(res.data.data);
        setDoctors([...res.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <Stack direction={"row"} sx={{ gap: COZY, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => navigate("/admin/doctors/add")}
        >
          Add New Doctor
        </Button>
      </Stack>
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
        <TextField
          placeholder="Specialized"
          onChange={onChange}
          fullWidth
          name={"specialized"}
        />
        <Button
          variant="contained"
          onClick={() => getAllDoctors()}
          sx={{ minWidth: "150px" }}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Stack>
      <Stack sx={{ mt: UPPER, gap: COZY }}>
        <DoctorTable data={doctors} onPageChange={onPageChange} />
        <Stack direction={"row"} sx={{ justifyContent: "flex-end" }}>
          <Pagination
            count={filterFields.page}
            color="secondary"
            onChange={onPageChange}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default React.memo(AddDoctors);
