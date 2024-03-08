import { createSlice } from "@reduxjs/toolkit";

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
    updateUserInfo: (state, action) => {
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
      if (userExist && userExist.password === action.payload.currentPassword) {
        const userList = state.allUsers.map((user) => {
          if (user.userId === action.payload.userId) {
            return { ...user, password: action.payload.newPassword };
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

export const { addUser, updateUserInfo, updatePassword } =
  usersManagementSlice.actions;
export default usersManagementSlice.reducer;
