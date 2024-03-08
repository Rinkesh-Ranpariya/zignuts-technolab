import axios from "axios";

let AxiosCreator;

if (typeof window !== "undefined") {
  AxiosCreator = axios.create({
    baseURL: "https://dummyjson.com",
  });

  AxiosCreator.interceptors.request.use((config) => {
    return config;
  });

  AxiosCreator.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err?.response?.status === 401) {
        console.log("401 err : ", err);
        window.location.href = "/login";
      }

      throw err?.response;
    }
  );
}

export default AxiosCreator;
