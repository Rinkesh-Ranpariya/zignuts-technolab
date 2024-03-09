import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { addUser } from "../store/usersManagement/usersManagementSlice";
import { toastHandler } from "../utils/toast";
import useCheckAuth from "../customHooks/useCheckAuth";
import Loading from "./Loading";
import loginImage1 from "../assets/images/loginImage1.png";
import loginImage2 from "../assets/images/loginImage2.png";
import { TextField } from "@mui/material";

const getCharacterValidationError = (str) => {
  return `your password must have at least 1 ${str} character`;
};

const Signup = () => {
  const isLoading = useCheckAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        firstName: "",
        lastName: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
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
        password: yup
          .string()
          .required("password is required")
          // check minimum characters
          .min(8, "password must have at least 8 characters")
          // different error messages for different requirements
          .matches(/[0-9]/, getCharacterValidationError("digit"))
          .matches(/[a-z]/, getCharacterValidationError("lowercase"))
          .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
          .matches(/[^A-Za-z0-9]/, getCharacterValidationError("special")),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "passwords does not match")
          .required("please re-type your password"),
      }),
      onSubmit: (values) => {
        const hashedPassword = bcrypt.hashSync(values.password, 10);
        const userInfo = {
          ...values,
          password: hashedPassword,
          userId: `userId-${uuidv4()}`,
        };
        delete userInfo.confirmPassword;
        const { payload: isUserAdded } = dispatch(addUser(userInfo));
        if (isUserAdded) {
          toastHandler(
            "Thanks for signing up. Your account has been created.",
            "success"
          );
          navigate("/login");
        } else {
          toastHandler("User already exist!", "error");
        }
      },
    });

  const handleClickSignin = () => {
    navigate("/login");
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="h-screen flex justify-center items-center overflow-hidden">
      <div className="fixed h-full w-full flex -z-10">
        <div className="flex-1 bg-[#ECBC76]"></div>
        <div className="max-[768px]:hidden flex-1 bg-[#FFFEF9]"></div>
      </div>

      <div className="relative bg-white rounded-3xl p-9 max-[426px]:px-5 max-[426px]:py-10 mx-5 max-w-xl w-full shadow-lg">
        <div className="max-[768px]:hidden">
          <div className="absolute top-20 -left-[200px] w-[200px]">
            <img src={loginImage1} alt="loginImage1" />
          </div>
          <div className="absolute top-6 -right-[360px] w-[410px]">
            <img src={loginImage2} alt="loginImage2" />
          </div>
        </div>

        <div className="flex justify-between">
          <div>Welcome to Best</div>
          <div className="text-sm">
            <div className="text-gray-500">Have an Account ?</div>
            <div
              className="text-[#B87514] cursor-pointer"
              onClick={handleClickSignin}
            >
              Sign in
            </div>
          </div>
        </div>

        <div className="text-4xl mb-8 font-semibold">Sign up</div>

        <form onSubmit={handleSubmit}>
          <div className="flex my-2 gap-4">
            <div className="flex-1">
              <div className="mb-2 text-sm">Email address</div>
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

            <div className="flex-1">
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

          <div className="flex my-2 gap-4">
            <div className="flex-1">
              <div className="mb-2 text-sm">Password</div>
              <TextField
                size="small"
                className="w-full"
                type="password"
                name="password"
                id="password"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <div className="h-4 text-xs text-red-500">
                {touched.password ? errors.password : ""}
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

          <button
            type="submit"
            className="text-sm mt-5 py-3 w-full rounded-lg bg-[#E48700] text-white cursor-pointer"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
