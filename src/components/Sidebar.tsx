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
    title: "Unit 1",
    content: "unit1",
    triggerClassName: styles.accordionTrigger
  },
  {
    id: "2",
    title: "Unit 2",
    content: "unit2",
    triggerClassName: styles.accordionTrigger
  },
  {
    id: "3",
    title: "Unit 3",
    content: <Link to="/" className="block w-full">Home</Link>,
    triggerClassName: styles.accordionTrigger,
    contentClassName: styles.accordionTrigger
  },
];

export default function Sidebar() {
  return (
    <div className="bg-zinc-300 text-blue p-4 rounded flex-1">
      <header className="bg-zinc-400">
        This is this sidebar header
      </header>
      <div className="bg-zinc-500">
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
