import axios from "axios";

const API = axios.create({ baseURL: "https://rocket-english.herokuapp.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("rocket-english-profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("rocket-english-profile")).credential
    }`;
  }
  return req;
});

export const externalSignIn = (data) => API.post("/user/externalsignin", data);
export const signIn = (data) => API.post("/user/signin", data);
export const signUp = (data) => API.post("/user/signup", data);
export const deleteUser = (id) => API.delete(`/user/${id}`);
export const updateProgress = (update) =>
  API.patch(`/user/updateprogress`, update);
export const saveGame = (save) => API.patch(`/user/savegame`, save);
