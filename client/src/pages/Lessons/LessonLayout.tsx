import clsx from "clsx"
import "./styles/lessons.css"
import { useScrollToHash } from '@/hooks';

export default function LessonLayout({children, className, id} : {children? : React.ReactNode, className? : string, id? :string}) {
    useScrollToHash();
    return (
        <div className={clsx("lessonPage", className)} id={id}>
            {children}
        </div>
    )
}