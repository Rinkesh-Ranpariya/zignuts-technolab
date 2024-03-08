import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PageNotFound from "./components/PageNotFound";
import Products from "./components/Products";
import RequireAuth from "./components/RequireAuth";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import ViewProduct from "./components/ViewProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Products />
      </RequireAuth>
    ),
  },
  {
    path: "/product/:productId",
    element: (
      <RequireAuth>
        <ViewProduct />
      </RequireAuth>
    ),
  },
  {
    path: "/profile",
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
  },
  {
    path: "/change-password",
    element: (
      <RequireAuth>
        <ChangePassword />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <div className="h-screen">
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
