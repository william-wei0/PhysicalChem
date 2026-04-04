export function lessonLinkFromLessonNum(chapterNum: number, unitNum: number, lessonNum = 1) {
  return `/lessons/chapter${chapterNum}/unit${unitNum}#${lessonNum === 1 ? "" : `lesson${lessonNum}`}`;
}
