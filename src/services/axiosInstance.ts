import axios from "axios";

const axiosAbortController = new AbortController();

const axiosInstance = axios.create({
  baseURL : "https://",
  timeout : 1000,
  headers : {'Content-Type' : "application/json"},
  signal : axiosAbortController.signal
})

axiosInstance.interceptors.request.use(
  function (config) {
    // Change headers : config.headers
    // config.headers.Key = value
    console.log('Request sent: ', config);
    return config;
  },
  function (error){
    return Promise.reject(error);
  }
)

axiosInstance.interceptors.response.use(
  function (response){

    console.log('Response data: ', response.data);
    return response;
  },
  function (error){
    if (error.response && error.response.status === 400){
        console.log('Error');
    }
    return error;
  }
)

export default axiosInstance;
