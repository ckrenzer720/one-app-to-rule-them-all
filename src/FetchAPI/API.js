import axios from "axios";

const API_BASE_URL = "https://the-one-api.dev/v2";
// const API_TOKEN = import.meta.env.API_TOKEN

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: "Bearer IjlWwGG14MA0UODw7juA",
  },
});
