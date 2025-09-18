import axios from "axios";

const client = axios.create({
  baseURL: "https://api.redseam.redberryinternship.ge/api",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});
export { client };
