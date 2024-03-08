import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../store/usersManagement/usersManagementSlice";
import { toastHandler } from "../utils/toast";

const Profile = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo.userInfo);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setValues,
  } = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      contactNumber: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required("email is required"),
      firstName: yup.string().required("first name is required"),
      lastName: yup.string().required("last name is required"),
      contactNumber: yup
        .string()
        .matches(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
          "contact number is not valid"
        )
        .required("contact number is required"),
    }),
    onSubmit: (values) => {
      const { payload } = dispatch(updateUserInfo(values));
      if (payload) {
        toastHandler("User info updated!", "success");
      } else {
        toastHandler("User already exist!", "error");
      }
    },
  });

  useEffect(() => {
    setValues(userInfo);
  }, []);

  return (
    <div>
      <div className="text-2xl font-bold mb-10">Profile</div>

      <div className="max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <div className="mb-2 text-sm">Enter your email address</div>
            <TextField
              size="small"
              className="w-full"
              type="email"
              name="email"
              id="email"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <div className="h-4 text-xs text-red-500">
              {touched.email ? errors.email : ""}
            </div>
          </div>

          <div className="flex my-2 gap-4">
            <div className="flex-1">
              <div className="mb-2 text-sm">First name</div>
              <TextField
                size="small"
                className="w-full"
                type="text"
                name="firstName"
                id="firstName"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              <div className="h-4 text-xs text-red-500">
                {touched.firstName ? errors.firstName : ""}
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-2 text-sm">Last name</div>
              <TextField
                size="small"
                className="w-full"
                type="text"
                name="lastName"
                id="lastName"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              <div className="h-4 text-xs text-red-500">
                {touched.lastName ? errors.lastName : ""}
              </div>
            </div>
          </div>

          <div className="my-2">
            <div className="mb-2 text-sm">Contact number</div>
            <TextField
              size="small"
              className="w-full"
              type="tel"
              name="contactNumber"
              id="contactNumber"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contactNumber}
            />
            <div className="h-4 text-xs text-red-500">
              {touched.contactNumber ? errors.contactNumber : ""}
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" variant="contained" className="w-full">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
