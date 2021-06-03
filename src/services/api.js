import axios from "axios";

const api = axios.create({
  baseURL: "https://im-api-backend.herokuapp.com/", // TODO: env variable
});

export default api;
