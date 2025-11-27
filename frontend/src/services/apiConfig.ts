import axios from "axios";

const apiConfig = axios.create({
  baseURL: "https://jsonbulut.com/api/",
  timeout: 5000,
});

export default apiConfig;