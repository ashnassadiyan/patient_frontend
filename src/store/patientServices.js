import http from "../http/http";

export const registerService = (data) => {
  return http.post("http://127.0.0.1:8000/patient/create_patient", data);
};

export const verifyOtp = (patient_id, otp) => {
  return http.post(`http://127.0.0.1:8000/patient/verify`, {
    otp: otp,
    patient_id,
  });
};

export const loginService = (data) => {
  return http.post("auth/login", data);
};
