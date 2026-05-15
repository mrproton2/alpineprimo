// src/services/api.js

import axios from "axios";

const API = axios.create({
  baseURL: "http://54.237.162.64:8080/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;