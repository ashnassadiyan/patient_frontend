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
  return http.delete(`patient/delete_patient/${id}`);
};

export const diagnose = (data, id) => {
  return http.post(`patient/diagnose/${id}`, data);
};
