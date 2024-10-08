import axios from "axios";
import http from "../http/http";

export const getDoctors = (filterFields) => {
  const {
    firstName = "",
    lastName = "",
    specialized = "",
    page = 1,
  } = filterFields;
  return http.get(
    `doctor/get_doctors?firstName=${firstName}&lastName=${lastName}&specialized=${specialized}&page=${page}&limit=20`
  );
};

export const getDoctorsAvailability = (id) => {
  return http.get(`availability/availability/${id}`);
};

export const createDoctor = (data) => {
  return http.post(`doctor/create_doctor`, data);
};

export const updateDoctor = (id, data) => {
  return http.put(`doctor/update_doctor/${id}`, data);
};

export const getDoctor = (id) => {
  return http.get(`doctor/get_doctor/${id}`);
};

export const getDoctorAvailability = (id) => {
  return http.get(`availability/availability/${id}`);
};

export const addDoctorAvailability = (data) => {
  return http.post(`availability/create_availability`, {
    Availability_data: data,
  });
};

export const getAvailabilities = (id) => {
  return http.post(`availability/availability/${id}`);
};

export const verifyOtp = (id, otp) => {
  return http.post(`patient/verify/${id}`, { otp: otp });
};

export const getDoctorsCount = () => {
  return http.get(`doctor/get_doctors_count`);
};
