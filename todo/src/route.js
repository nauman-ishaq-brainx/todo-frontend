import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/dashboard/Home";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UpdatePassword from "./pages/auth/UpdatePassword";

export const authRoutes = [
    {
        name:"Login",
        path:"login",
        element:<Login />,
        protected: false,
    },
       {
        name:"Signup",
        path:"signup",
        element:<Signup />,
        protected: false,
    },
    {
        name: 'Email Verification',
        path : 'verify-email/:token',
        element:  <VerifyEmail />,
        protected: false
    },
    
    {
        name: 'Reset Password',
        path : 'reset-password/:token',
        element:  <ResetPassword />,
        protected: false
    },
    {
        name: 'Forgot Password',
        path : 'forgot-password',
        element:  <ForgotPassword />,
        protected: false
    },
    {
        name: 'Update Password',
        path : 'update-password',
        element:  <UpdatePassword />,
        protected: true,
    }
]


export const todoRoutes = [
       {
        name:"Home",
        path:"/",
        element:<Home />,
        protected: true,
    }
]
