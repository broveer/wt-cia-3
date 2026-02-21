import axios from "axios";

// In dev: VITE_API_URL is empty, so Vite's proxy sends /api/* → localhost:5000
// In production (Vercel): set VITE_API_URL to your Render backend URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
});

export default api;
