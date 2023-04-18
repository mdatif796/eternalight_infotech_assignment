const API_ROOT = "http://44.204.57.107";

export const API_URLS = {
  login: () => `${API_ROOT}/api/authenticate`,
  signup: () => `${API_ROOT}/api/create-user`,
  getUser: () => `${API_ROOT}/api/get-authenticated-user`,
  editUser: () => `${API_ROOT}/api/edit-user`,
};

export const LOCAL_STORAGE_TOKEN_KEY = "eternalight_assignments";
