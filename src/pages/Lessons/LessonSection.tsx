import clsx from "clsx"
import "./styles/lessons.css"

export default function LessonSection({children, className} : {children? : React.ReactNode, className? : string}) {
    return (
        <section className={clsx("lessonSection", className)}>
            {children}
        </section>
    )
}