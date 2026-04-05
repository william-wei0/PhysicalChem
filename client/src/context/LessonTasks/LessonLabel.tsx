import { InlineMath } from "react-katex";
import type { LabelPart } from "./LessonTasksContext";

export function renderLabel(parts: LabelPart[]): React.ReactNode {
  return parts.map((part, i) => {
    switch (part.type) {
      case "math":
        return <InlineMath key={i} math={part.expression} />;
      case "bold":
        return <strong key={i}>{part.text}</strong>;
      case "text":
      default:
        return <span key={i}>{part.text}</span>;
    }
  });
}