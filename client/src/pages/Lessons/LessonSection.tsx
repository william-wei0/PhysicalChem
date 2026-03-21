import clsx from "clsx"
import "./styles/lessons.css"

export default function LessonSection({children, className, id} : {children? : React.ReactNode, className? : string, id? :string}) {
    return (
        <section className={clsx("lessonSection", className)} id={id}>
            {children}
        </section>
    )
}