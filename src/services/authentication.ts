import axios, {type AxiosInstance} from "axios";
import {jwtDecode} from "jwt-decode";
import {UserSchema} from "@/classes/User-class.ts";
import {z} from "zod/v4";

class AuthenticationClass {
  private readonly axiosAuthenticate : AxiosInstance;

  constructor() {

    this.axiosAuthenticate = axios.create({
      baseURL : 'https://dummyjson.com/auth',
      // timeout : 1000,
      headers : {
        'Content-Type' : "application/json"
      }
    })

    this.axiosAuthenticate.interceptors.request.use(
      async (config) => {

        // Handle authored access
        if (!config.data){
          // Check for access token
          const access_token_storage = localStorage.getItem("access_token");

          // Access token does not exist
          if (!access_token_storage){
            return Promise.reject({
              status : 400,
              data : {
                message: "EMPTY KEY"
              }
            });
          }

          const access_token = jwtDecode(access_token_storage);
          const current_time = Math.round(Date.now() / 1000);

          // Access token expired
          if (access_token.exp && access_token.exp < current_time){
            const response = await this.refresh();

            // Refresh success
            if (response.status === 200){
              const new_access_token_storage = localStorage.getItem("access_token");
              config.headers.Authorization =  new_access_token_storage ? `Bearer ${new_access_token_storage}` : config.headers.Authorization;
              config.headers.credentials = 'include';
              await this.axiosAuthenticate(config);
            }

            // Refresh failed
            else {
              return Promise.reject({
                status: 400,
                data : {
                  message: "REFRESH FAILED"
                }
              });
            }
          }

          // Access token valid
          else {
            config.headers.Authorization =  access_token ? `Bearer ${access_token_storage}` : config.headers.Authorization;
            config.headers.credentials = 'include';
          }

        }

        // Handling POST requests
        else {
          // Check user schema
          if (config.data.username && config.data.password){
            console.log("User schema check");
            const validatedSchema = UserSchema.safeParse(config.data);

            if (!validatedSchema.success){
              return Promise.reject({
                status : 400,
                data : {
                  message: "FAILED VALIDATION",
                  error : z.treeifyError(validatedSchema.error).properties
                }
              });
            }
          }

          // Refresh data
          else if (config.data.refresh) {
            console.log("Refresh API key check");
            const refresh_token_storage = localStorage.getItem("refresh_token");

            // Refresh token does not exist
            if (!refresh_token_storage){
              localStorage.removeItem("access_token");
              return Promise.reject({
                status: 400,
                data: {
                  message: "EMPTY KEY"
                }
              });
            }

            const refresh_token = jwtDecode(refresh_token_storage);
            const current_time = Math.round(Date.now() / 1000);

            // Refresh token expired
            if (refresh_token.exp && refresh_token.exp < current_time){
              return Promise.reject({
                status: 400,
                data : {
                  message: "REFRESH TOKEN EXPIRED"
                }
              });
            }
          }
        }

        return config;
      },
      function (error){
        return Promise.reject(error);
      }
    );

    this.axiosAuthenticate.interceptors.response.use(
      function (response){
        if (response.data.accessToken && response.data.refreshToken){
          localStorage.setItem("access_token", response.data.accessToken);
          localStorage.setItem("refresh_token", response.data.refreshToken);
        }
        console.log(response);
        return response;
      },
      function (error){
        return error;
      }
    );

  }

  public async login(username : string, password : string) {
    return await this.axiosAuthenticate.post("/login", {
      username: username,
      password: password,
      expiresInMins: 180,
    });
  }

  public async refresh() {
    return await this.axiosAuthenticate.post("/refresh", {
      refreshToken: localStorage.getItem("refresh_token"),
    });
  }

  public async getUserData(){
    return await this.axiosAuthenticate.get("/me");
  }

}

export default AuthenticationClass;
