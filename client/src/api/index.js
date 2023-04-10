import { API_URLS, LOCAL_STORAGE_TOKEN_KEY, getFormBody } from "../utils";

export const logIn = async (email, password) => {
  let response = await fetch(API_URLS.login(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({ email: email, password: password }),
  });
  response = await response.json();
  return response;
};

export const signUp = async (email, name, password, confirm_password) => {
  let response = await fetch(API_URLS.signup(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: getFormBody({
      email: email,
      name: name,
      password: password,
      confirm_password: confirm_password,
    }),
  });
  response = await response.json();
  return response;
};

export const getLoggedInUser = async () => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  let response = await fetch(API_URLS.getUser(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`, // Remove Auth if not required
    },
  });
  response = await response.json();
  return response;
};

export const editUser = async (email, name, password, confirm_password) => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  let response = await fetch(API_URLS.editUser(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`, // Remove Auth if not required
    },
    body: getFormBody({
      email: email,
      name: name,
      password: password,
      confirm_password: confirm_password,
    }),
  });
  response = await response.json().catch((err) => console.log("er", err));
  return response;
};
