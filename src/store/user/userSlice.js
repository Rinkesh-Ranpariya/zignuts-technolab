import { createSlice } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";

const initialState = {
  isAuthenticated: false,
  userInfo: {
    email: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    password: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    login: (state, action) => {
      const { values, allUsers } = action.payload;
      const userData = allUsers.find((user) => user.email === values.email);
      const isValidPassword = bcrypt.compareSync(
        values.password,
        userData.password
      );
      if (userData.email && isValidPassword) {
        state.isAuthenticated = true;
        state.userInfo = userData;
        localStorage.setItem("userToken", values.email);
        action.payload = true;
      } else {
        action.payload = false;
      }
    },
    loginWithToken: (state, action) => {
      const { token, allUsers } = action.payload;
      const userData = allUsers.find((user) => user.email === token);
      if (userData) {
        state.isAuthenticated = true;
        state.userInfo = userData;
        action.payload = true;
      } else {
        localStorage.removeItem("userToken");
        action.payload = false;
      }
    },
    logout: (state) => {
      state = initialState;
      localStorage.removeItem("userToken");
    },
  },
});

export const { login, loginWithToken, logout, updateUserInfo } =
  userSlice.actions;
export default userSlice.reducer;
