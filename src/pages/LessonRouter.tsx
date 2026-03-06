import { useParams } from "react-router-dom";
import type { ComponentType, JSX } from "react";

import Chapter1Unit1Page from "./Lessons/Chapter1Pages/Chapter1Unit1Page";
import Chapter2Unit1Page from "./Lessons/Chapter2Pages/Chapter2Unit1Page";
import Chapter3Unit1Page from "./Lessons/Chapter3Pages/Chapter3Unit1Page";
import Chapter4Unit1Page from "./Lessons/Chapter4Pages/Chapter4Unit1Page";

type LessonRouteParams = {
  chapterId: string;
  unitId: string;
};

const chapterIndexMap: Record<string, ComponentType> = {};

const lessonMap: Record<string, Record<string, ComponentType>> = {
  chapter1: {
    unit1: Chapter1Unit1Page,
  },
  chapter2: {
    unit1: Chapter2Unit1Page,
  },
  chapter3: {
    unit1: Chapter3Unit1Page,
  },
  chapter4: {
    unit1: Chapter4Unit1Page,
  },
};

export default function LessonRouter(): JSX.Element {
  const { chapterId, unitId } = useParams<LessonRouteParams>();

  if (chapterId && unitId) {
    const Component = lessonMap[chapterId]?.[unitId];
    if (!Component) throw new Response("Lesson not found", { status: 404 });
    return <Component />;
  }

  if (chapterId) {
    const Component = chapterIndexMap[chapterId];
    if (!Component) throw new Response("Chapter not found", { status: 404 });
    return <Component />;
  }

  throw new Response("Not found", { status: 404 });
}
