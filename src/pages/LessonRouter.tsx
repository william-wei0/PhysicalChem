import { useParams } from "react-router-dom";
import type { ComponentType, JSX } from "react";

import Lesson1Page from "./Lessons/Unit1Pages/Lesson1_Unit1_Page";
import Lesson2_Unit1_Page from "./Lessons/Unit1Pages/Lesson2_Unit1_Page";

type LessonRouteParams = {
  lessonId: string;
};

const lessonMap: Record<string, ComponentType> = {
  lesson1: Lesson1Page,
  lesson2: Lesson2_Unit1_Page,
};

export default function LessonRouter(): JSX.Element {
    const { lessonId } = useParams<LessonRouteParams>();

    const Component = lessonId ? lessonMap[lessonId] : undefined;
    if (!Component) {
        throw new Response("Lesson not found", { status: 404 });
    }

    return <Component />;
}
