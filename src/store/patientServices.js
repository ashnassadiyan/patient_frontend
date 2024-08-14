import http from "../http/http";

export const registerService = (data) => {
  return http.post("patient/create_patient", data);
};

export const verifyOtp = (patient_id, otp) => {
  return http.post(`patient/verify`, {
    otp: otp,
    patient_id,
  });
};

export const loginService = (data) => {
  return http.post("auth/login", data);
};

export const verifyToken = () => {
  return http.get("auth/token");
};

export const getPatients = (filterFields) => {
  const { firstName, lastName, page } = filterFields;
  return http.get(
    `patient/get_patients?firstName=${firstName}&lastName=${lastName}&page=${page}`
  );
};

export const deletePatients = (id) => {
  console.log(id, "id");
  return http.delete(`patient/delete_patient/${id}`);
};

export const diagnose = (data, id) => {
  return http.post(`patient/diagnose/${id}`, data);
};

export const diagnoseReport = (id, data) => {
  return http.post(`patient/diagnoseReport/${id}`, data);
};

export const getReports = (id) => {
  return http.get(`patient/getReports/${id}`);
};

export const updateProfile = (id, data) => {
  return http.put(`patient/update_profile/${id}`, data);
};

export const fetchDetails = async () => {
  const user = JSON.parse(localStorage.getItem("osc-user"));
  await http
    .get(`patient/get_user/${user.id}`)
    .then((response) => {
      console.log(response.data.data);
      localStorage.setItem("osc-user", JSON.stringify(response.data.data));
    })
    .catch(() => {});
};

export const getReport = async (id) => {
  return http.get(`patient/get_diagnosed_report/${id}`);
};

export const createAppointment = async (data) => {
  return http.post(`appointments/create_appointment`, data);
};
