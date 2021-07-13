import http from "../utils/http-common";
import { createContext, useContext } from "react";

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const login = (owner_phone_number, password) => {
    return http
      .post("/store/signin", {
        owner_phone_number,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("store", JSON.stringify(response.data));
        }

        return response.data;
      });
  };

  const employeeLogin = (username, password, store_id) => {
    return http
      .post("/employee/signin", {
        username,
        password,
        store_id,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("store", JSON.stringify(response.data));
        }

        return response.data;
      });
  };

  const logout = () => {
    localStorage.removeItem("store");
  };

  const register = (
    name,
    owner_name,
    email,
    url,
    owner_phone_number,
    password,
    description
  ) => {
    return http.post("/store/signup", {
      owner_name,
      owner_phone_number,
      name,
      url,
      email,
      description,
      password,
    });
  };

  const getCurrentUser = () => {
    // if (localStorage.getItem("store") === null) {
    //     return null
    // }
    return JSON.parse(localStorage.getItem("store"));
  };

  return {
    login,
    employeeLogin,
    logout,
    register,
    getCurrentUser,
  };
};
