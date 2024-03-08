import React from "react";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../store/usersManagement/usersManagementSlice";
import { toastHandler } from "../utils/toast";

const getCharacterValidationError = (str) => {
  return `your password must have at least 1 ${str} character`;
};

const ChangePassword = () => {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo.userInfo);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: yup.object().shape({
        currentPassword: yup.string().required("current password is required"),
        newPassword: yup
          .string()
          .required("new password is required")
          // check minimum characters
          .min(8, "password must have at least 8 characters")
          // different error messages for different requirements
          .matches(/[0-9]/, getCharacterValidationError("digit"))
          .matches(/[a-z]/, getCharacterValidationError("lowercase"))
          .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
          .matches(/[^A-Za-z0-9]/, getCharacterValidationError("special")),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("newPassword"), null], "passwords does not match")
          .required("please re-type your password"),
      }),
      onSubmit: (values, { resetForm }) => {
        const { currentPassword, newPassword } = values;
        const newCred = {
          currentPassword,
          newPassword,
          userId: userInfo.userId,
        };
        const { payload } = dispatch(updatePassword(newCred));
        if (payload) {
          toastHandler("Password updated!", "success");
          resetForm();
        } else {
          toastHandler("Invalid password!", "error");
        }
      },
    });

  return (
    <div>
      <div className="text-2xl font-bold mb-10">Change Password</div>

      <div className="max-w-xl">
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <div className="mb-2 text-sm">Current password</div>
            <TextField
              size="small"
              className="w-full"
              type="password"
              name="currentPassword"
              id="currentPassword"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.currentPassword}
            />
            <div className="h-4 text-xs text-red-500">
              {touched.currentPassword ? errors.currentPassword : ""}
            </div>
          </div>

          <div className="flex my-2 gap-4">
            <div className="flex-1">
              <div className="mb-2 text-sm">Enter your new password</div>
              <TextField
                size="small"
                className="w-full"
                type="password"
                name="newPassword"
                id="newPassword"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newPassword}
              />
              <div className="h-4 text-xs text-red-500">
                {touched.newPassword ? errors.newPassword : ""}
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-2 text-sm">Confirm password</div>
              <TextField
                size="small"
                className="w-full"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
              <div className="h-4 text-xs text-red-500">
                {touched.confirmPassword ? errors.confirmPassword : ""}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" variant="contained" className="w-full">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
