import axios from "axios";

const API_BASE_URL = "https://the-one-api.dev/v2";
const TOLKIEN = import.meta.env.VITE_API_KEY;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${TOLKIEN}`,
  },
});
