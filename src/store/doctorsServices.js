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
    `doctor/get_doctors?firstName=${firstName}&lastName=${lastName}&specialized=${specialized}&page=${page}`
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
  return http.post(`http://127.0.0.1:8000/verify/${id}`, { otp: otp });
};
