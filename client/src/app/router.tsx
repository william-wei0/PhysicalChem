import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import LessonsRouter from "../pages/LessonRouter";
import LessonIndexPage from "../pages/Lessons/LessonIndexPage";
import PageLayout from "../layouts/PageLayout";
import SignUpPage from "@/pages/SignUpPage";
import LoginPage from "@/pages/LoginPage";
import { ProtectedRoute } from "@/context/auth/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/lessons",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LessonIndexPage /> },
      { path: ":lessonId", element: <LessonsRouter /> },
      { path: ":chapterId/:unitId", element: <LessonsRouter /> },
    ],
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <p>This is a protected route.</p>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
];

export default routes;
