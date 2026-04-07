import HomePage from "../pages/Homepage/Homepage";
import ErrorPage from "../pages/ErrorPage";
import LessonsRouter from "../pages/LessonRouter";
import LessonIndexPage from "../pages/Lessons/LessonIndexPage";
import PageLayout from "../layouts/PageLayout";
import SignUpPage from "@/pages/SignUpPage";
import LoginPage from "@/pages/LoginPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import AuthLayout from "../layouts/AuthLayout";
import { UnauthenticatedRoute } from "@/context/auth/UnauthenticatedRoute";
import AccountDashboard from "@/pages/AccountDashboard";
import { ProtectedRoute } from "@/context/auth/ProtectedRoute";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";

const routes = [
  {

    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PageLayout />,
        children: [
          { index: true,                        element: <HomePage /> },
          { path: "lessons",                    element: <LessonIndexPage /> },
          { path: "lessons/:lessonId",          element: <LessonsRouter /> },
          { path: "lessons/:chapterId/:unitId", element: <LessonsRouter /> },
          { path: "privacy-policy", element: <PrivacyPolicy /> },
          { path: "cookies", element: <CookiePolicy /> },
          { path: "dashboard", element: <ProtectedRoute><AccountDashboard /></ProtectedRoute> },
        ],
      },

      {
        element: <UnauthenticatedRoute><AuthLayout /></UnauthenticatedRoute>,
        children: [
          { path: "signup",          element: <SignUpPage /> },
          { path: "login",           element: <LoginPage /> },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
          { path: "reset-password",  element: <ResetPasswordPage /> },
        ],
      },
    ],
  },
]

export default routes;
