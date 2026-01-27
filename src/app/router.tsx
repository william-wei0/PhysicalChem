import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import LessonsPage from "../pages/LessonsPage";
import LessonIndexPage from "../pages/Lessons/LessonIndexPage";
import LessonLayout from "../pages/Lessons/LessonLayout";
import App from "./App";

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
    }
]

export default routes