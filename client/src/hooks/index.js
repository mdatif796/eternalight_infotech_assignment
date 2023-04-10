import { useContext, useEffect, useState } from "react";
import { logIn as userLogin, signUp, getLoggedInUser, editUser } from "../api";
import { AuthContext } from "../providers/authProvider";

import {
  getItemFromLocalStorage,
  LOCAL_STORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  setItemToLocalStorage,
} from "../utils";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);

      if (userToken) {
        const response = await getLoggedInUser();
        if (response.success) {
          setUser(response.user);
        }
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    const fetchedUser = response.user;
    if (response.success) {
      setItemToLocalStorage(LOCAL_STORAGE_TOKEN_KEY, response.jwt_token);
      setUser(fetchedUser);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const signup = async (email, name, password, confirm_password) => {
    const response = await signUp(email, name, password, confirm_password);
    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const edit = async (email, name, password, confirm_password) => {
    const response = await editUser(email, name, password, confirm_password);
    if (response.success) {
      setUser(response.user);
      setItemToLocalStorage(LOCAL_STORAGE_TOKEN_KEY, response.jwt_token);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCAL_STORAGE_TOKEN_KEY);
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    edit,
  };
};
