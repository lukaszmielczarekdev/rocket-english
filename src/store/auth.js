import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStoreData, notify } from "./utils";
import { googleLogout } from "@react-oauth/google";
import * as api from "../api";

const INITIAL_STATE = {
  status: null,
  currentUser: null,
};

export const signin = createAsyncThunk("auth/signin", async (formData) => {
  try {
    const { data } = await api.signIn(formData);
    return data;
  } catch (error) {
    notify(error.response.data.message);
  }
});

export const externalSignin = createAsyncThunk(
  "auth/externalSignin",
  async (response) => {
    try {
      const { data } = await api.externalSignIn(response);
      return data;
    } catch (error) {
      notify(error.response.data.message);
    }
  }
);

export const signup = createAsyncThunk("auth/signup", async (formData) => {
  try {
    const { data } = await api.signUp(formData);
    return data;
  } catch (error) {
    notify(error.response.data.message);
  }
});

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async ({ id }) => {
    try {
      await api.deleteUser(id);
      return id;
    } catch (error) {
      console.log(error);
      notify(error.response.data.message);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: getStoreData("user.auth", INITIAL_STATE),
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("rocket-english-profile");
      state.currentUser = null;
      state.status = null;
      googleLogout();
    },
  },
  extraReducers: {
    [signin.pending]: (state) => {
      state.status = "loading";
    },
    [signin.fulfilled]: (state, action) => {
      if (action.payload?.token) {
        localStorage.setItem(
          "rocket-english-profile",
          JSON.stringify({ credential: action.payload.token })
        );
        state.currentUser = action.payload.user;
        notify(`Hello ${action.payload.user.name}`);
      }
      state.status = "success";
    },
    [signin.rejected]: (state) => {
      state.status = "failed";
    },

    [externalSignin.pending]: (state) => {
      state.status = "loading";
    },
    [externalSignin.fulfilled]: (state, action) => {
      if (action.payload?.token) {
        localStorage.setItem(
          "rocket-english-profile",
          JSON.stringify({ credential: action.payload.token })
        );
        state.currentUser = action.payload.user;
        notify(`Hello ${action.payload.user.name}`);
      }
      state.status = "success";
    },
    [externalSignin.rejected]: (state) => {
      state.status = "failed";
    },
    [signup.pending]: (state) => {
      state.status = "loading";
    },
    [signup.fulfilled]: (state, action) => {
      if (action.payload?.token) {
        localStorage.setItem(
          "rocket-english-profile",
          JSON.stringify({ credential: action.payload.token })
        );
        state.currentUser = action.payload.user;
        notify(`Hello ${action.payload.user.name}`);
      }
      state.status = "success";
    },
    [signup.rejected]: (state) => {
      state.status = "failed";
    },

    [deleteUser.pending]: (state) => {
      state.status = "loading";
    },
    [deleteUser.fulfilled]: (state, action) => {
      if (!action.payload?.user) {
        localStorage.removeItem("rocket-english-profile");
        state.currentUser = null;
        state.status = null;
        googleLogout();
        notify("Account deleted");
      }
      state.status = "success";
    },
    [deleteUser.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
