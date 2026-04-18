import axios from "axios"

const baseURL = 'https://localhost:7082'

const axiosInstance = axios.create({ baseURL })

axiosInstance.interceptors.request.use((request) => {
    return request
})



axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes("/api/UserLogin")
    ) {
      localStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common.Authorization;
    }

    return Promise.reject(error);
  }
);
export default axiosInstance


// if (error.response &&error.response.status === 401 &&!error.config.url.includes("/api/UserLogin")) {
    //   window.location.href = "/Login";
    // }

// axiosInstance.interceptors.response.use(response => {
//     if (response.status === 401) {
//         location.href = '../Pages/Login'
//     }
//     return response
// })
