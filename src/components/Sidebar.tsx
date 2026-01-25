import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion/accordion";
import { Link } from "react-router";
import styles from "./styles/sidebar.module.css"

type LinksAccordionProps = {
  id: string;
  title: string;
  content: React.ReactNode;
  triggerClassName?: string;
  triggerStyle?: string;
  contentClassName?: string;
  contentStyle?: string;
};

const section: LinksAccordionProps[] = [
  {
    id: "1",
    title: "Unit 1: Physical Properties of Atoms",
    content: "unit1",
    triggerClassName: styles.accordionTrigger
  },
  {
    id: "2",
    title: "Unit 2: Physical Properties of Atoms",
    content: "unit2",
    triggerClassName: styles.accordionTrigger
  },
  {
    id: "3",
    title: "Unit 3: Physical Properties of Atoms",
    content: <Link to="/" className="inline-block px-4 py-2 bg-blue-500 text-white rounded transition-all duration-300 hover:bg-blue-600 hover:scale-105">Home</Link>,
    triggerClassName: styles.accordionTrigger,
    contentClassName: styles.accordionTrigger
  },
];

export default function Sidebar() {
  return (
    <div className="bg-zinc-100 text-blue p-4 flex-1 border border-black">
      <header className="text-center font-bold text-lg p-2">
        Unit Lessons
      </header>
      <div className="">
      <Accordion>
        {section.map((item) => (
          <AccordionItem id={item.id} key={item.id}>
            <AccordionTrigger className={item.triggerClassName}> {item.title}</AccordionTrigger>
            <AccordionContent className={item.contentClassName}>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </div>
    </div>
  );
}
