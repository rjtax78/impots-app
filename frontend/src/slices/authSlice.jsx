import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoUser: localStorage.getItem("infoUser")
    ? JSON.parse(localStorage.getItem("infoUser"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.infoUser = action.payload;
      localStorage.setItem("infoUser", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.infoUser = null;
      localStorage.removeItem("infoUser");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
