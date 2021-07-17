import axios from "axios";
import queryString from "query-string";

const clientApi = axios.create({
  baseURL: "https://api.rawg.io/api",
  paramsSerializer: (params) => queryString.stringify(params),
});

clientApi.interceptors.request.use((config) => {
  config.params = config.params || {};

  config.params["key"] = "a79b604533c44c4cbae3074607508b7f";
  return config;
});

clientApi.interceptors.response.use((data) => data.data);

export default clientApi;
