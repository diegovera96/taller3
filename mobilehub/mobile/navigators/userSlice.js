import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

const initialState = {
  id: null,
  name: null,
  rut: null,
  email: null,
  token: null,
  birth_date: null,
};

export const userSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      const payload = jwtDecode(action.payload);
      state.id = payload.id;
      state.name = payload.name;
      state.rut = payload.rut;
      state.email = payload.email;
      state.token = action.payload;
    state.birth_date = payload.birth_date;
    },
    logout: (state) => {
      state.id = null;
      state.name = null;
      state.rut = null;
      state.email = null;
      state.token = null;
        state.birth_date = null;
    },
  },
});

export const selectToken = (state) => state.user.token;
export const selectId = (state) => state.user.id;
export const selectName = (state) => state.user.name;
export const selectRut = (state) => state.user.rut;
export const selectEmail = (state) => state.user.email;
export const selectBirthDate = (state) => state.user.birth_date;

export const { login, logout } = userSlice.actions;
