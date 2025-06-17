import axios from "axios";

const isDev = process.env.NODE_ENV === "development"
const API_URL = isDev ? "http://localhost:5909/api" : "/api"
export const api = axios.create({
  baseURL: API_URL
})
