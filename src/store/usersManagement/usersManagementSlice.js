import { createSlice } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";

const storedUsers = localStorage.getItem("AppUsers");

const initialState = {
  allUsers: storedUsers ? JSON.parse(storedUsers) : [],
};

export const usersManagementSlice = createSlice({
  name: "users management",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const isUserExist = state.allUsers.find(
        (user) => user.email === action.payload.email
      );
      if (!isUserExist) {
        const newUserList = [...state.allUsers, action.payload];
        state.allUsers = newUserList;
        localStorage.setItem("AppUsers", JSON.stringify(newUserList));
        action.payload = true;
      } else {
        action.payload = false;
      }
    },
    updateProfileData: (state, action) => {
      const isUserExist = state.allUsers
        .filter((user) => user.userId !== action.payload.userId)
        .find((user) => user.email === action.payload.email);
      if (!isUserExist) {
        const userList = state.allUsers.map((user) => {
          if (user.userId === action.payload.userId) {
            return { ...user, ...action.payload };
          }
          return user;
        });
        state.allUsers = userList;
        localStorage.setItem("AppUsers", JSON.stringify(userList));
        localStorage.setItem("userToken", action.payload.email);
        action.payload = true;
      } else {
        action.payload = false;
      }
    },
    updatePassword: (state, action) => {
      const userExist = state.allUsers.find(
        (user) => user.userId === action.payload.userId
      );
      const isValidPassword = bcrypt.compareSync(
        action.payload.currentPassword,
        userExist.password
      );
      if (userExist && isValidPassword) {
        const userList = state.allUsers.map((user) => {
          if (user.userId === action.payload.userId) {
            const hashedPassword = bcrypt.hashSync(
              action.payload.newPassword,
              10
            );
            return { ...user, password: hashedPassword };
          }
          return user;
        });
        state.allUsers = userList;
        localStorage.setItem("AppUsers", JSON.stringify(userList));
        action.payload = true;
      } else {
        action.payload = false;
      }
    },
  },
});

export const { addUser, updateProfileData, updatePassword } =
  usersManagementSlice.actions;
export default usersManagementSlice.reducer;
