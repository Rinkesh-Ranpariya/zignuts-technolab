import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { login } from "../store/user/userSlice";
import { toastHandler } from "../utils/toast";
import Loading from "./Loading";
import useCheckAuth from "../customHooks/useCheckAuth";
import facebookLogo from "../assets/images/facebook-logo.png";
import appleLogo from "../assets/images/apple-logo.png";
import googleLogo from "../assets/images/google-logo.png";
import loginImage1 from "../assets/images/loginImage1.png";
import loginImage2 from "../assets/images/loginImage2.png";

const Login = () => {
  const isLoading = useCheckAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allUsers = useSelector((state) => state.usersManagement.allUsers);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object().shape({
        email: yup.string().email().required("email is required"),
        password: yup.string().required("password is required"),
      }),
      onSubmit: (values) => {
        const { payload: isUserExist } = dispatch(login({ values, allUsers }));
        if (isUserExist) {
          navigate("/");
        } else {
          toastHandler("Invalid email or password!", "error");
        }
      },
    });

  const handleClickSignup = () => {
    navigate("/register");
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
            <div className="text-gray-500">No Account ?</div>
            <div
              className="text-[#B87514] cursor-pointer"
              onClick={handleClickSignup}
            >
              Sign up
            </div>
          </div>
        </div>

        <div className="text-4xl mb-8 font-semibold">Sign in</div>

        <div className="text-sm flex flex-shrink justify-between items-center gap-2 mb-9 min-[426px]:hidden">
          <div className="flex gap-4 justify-center items-center bg-[#FFF4E3] p-3 max-w-60 w-full rounded-lg cursor-pointer">
            <img src={googleLogo} alt="google-logo" />
            <div className="text-[#B87514]">Sign with google</div>
          </div>
          <div className="flex justify-center items-center bg-[#F6F6F6] p-3 rounded-lg cursor-pointer">
            <img src={facebookLogo} alt="facebook-logo" />
          </div>
          <div className="flex justify-center items-center bg-[#F6F6F6] p-3 rounded-lg cursor-pointer">
            <img src={appleLogo} alt="apple-logo" />
          </div>
        </div>

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

          <div>
            <div className="mb-2 text-sm">Enter your Password</div>
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

          <div className="text-right text-xs text-[#AD3113] cursor-pointer">
            Forgot Password
          </div>

          <button
            type="submit"
            className="text-sm my-3 py-3 w-full rounded-lg bg-[#E48700] text-white cursor-pointer max-[426px]:mb-0"
          >
            Sign in
          </button>
        </form>

        <div className="text-center text-sm text-gray-400 max-[426px]:hidden">
          OR
        </div>

        <div className="text-sm flex justify-center items-center gap-2 mt-3 max-[426px]:hidden">
          <div className="flex justify-center items-center bg-[#F6F6F6] p-3 rounded-lg cursor-pointer">
            <img src={googleLogo} alt="google-logo" />
          </div>
          <div className="flex justify-center items-center bg-[#F6F6F6] p-3 rounded-lg cursor-pointer">
            <img src={facebookLogo} alt="facebook-logo" />
          </div>
          <div className="flex justify-center items-center bg-[#F6F6F6] p-3 rounded-lg cursor-pointer">
            <img src={appleLogo} alt="apple-logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
