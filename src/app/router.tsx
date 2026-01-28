import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import LessonsPage from "../pages/LessonsPage";
import LessonIndexPage from "../pages/Lessons/LessonIndexPage";
import LessonLayout from "../pages/Lessons/LessonLayout";
import SignUpPage from "@/pages/SignUpPage";
import App from "./App";
import LoginPage from "@/pages/LoginPage";

const routes = [
    {
        path        : "/",
        element     : <App/>,
        errorElement: <ErrorPage/>,
        children    : [
            {index: true, element: <HomePage/>},
        ]

    },
    {
        path: "/lessons",
        element: <LessonLayout />,
        errorElement: <ErrorPage/>,
        children: [
            { index: true, element: <LessonIndexPage/>},
            { path: ":lessonId", element: <LessonsPage /> },
        ],
    },
    {   
        path: "/signup",
        element: <SignUpPage />,
        errorElement: <ErrorPage/>,
    },
    {   
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage/>,
    }
]

export default routes