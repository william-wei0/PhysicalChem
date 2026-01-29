import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion/accordion";
import { Link } from "react-router";
import styles from "./styles/sidebar.module.css";
import MinimizeSidebarButton from "./buttons/MinimizeSidebarButton";
import ExpandSidebarButton from "./buttons/ExpandSidebarButton";
import clsx from "clsx";
import type { CSSProperties } from "react";

type LinksAccordionProps = {
  id: string;
  title: string;
  content?: React.ReactNode;
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
};

const section: LinksAccordionProps[] = [
  {
    id: "1",
    title: "Unit 1: Physical Properties of Atoms",
    content: "unit1",
    triggerClassName: clsx(
      styles.accordionTrigger,
      styles.underlineAnimation,
      "border-t",
    ),
  },
  {
    id: "2",
    title: "Unit 2: Physical Properties of Atoms",
    content: "unit2",
  },
  {
    id: "3",
    title: "Unit 3: Physical Properties of Atoms",
    content: (
      <Link to="/">
        3.3: The Superposition of 1s2pz
      </Link>
    ),
  },
  {
    id: "4",
    title: "Unit 4: Physical Properties of Atoms",
    content: (
      <Link to="/">
        3.3: The Superposition of 1s2pz
      </Link>
    ),
  },
  {
    id: "5",
    title: "Unit 5: Physical Properties of Atoms",
    content: (
      <Link to="/">
        3.3: The Superposition of 1s2pz
      </Link>
    ),
  },
  {
    id: "6",
    title: "Unit 6: Physical Properties of Atoms",
    content: (
      <Link to="/">
        3.3: The Superposition of 1s2pz
      </Link>
    ),
  },
  {
    id: "7",
    title: "Unit 7: Physical Properties of Atoms",
    content: (
      <Link to="/">
        3.3: The Superposition of 1s2pz
      </Link>
    ),
  },
];

export default function Sidebar({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-zinc-50 flex-1 border border-black relative">
      {isOpen && (
        <div className="p-4">
          {" "}
          <MinimizeSidebarButton
            onClick={onToggle}
            className="absolute right-2 top-2 z-10"
          />
          <header className="text-center font-bold text-xl p-2 mb-5">
            Lesson Overview
          </header>
          <div className="bg-zinc-200 rounded-2xl border border-black pb-5 pt-5">
            <Accordion>
              {section.map((item) => (
                <AccordionItem id={item.id} key={item.id}>
                  <AccordionTrigger
                    className={
                      item.triggerClassName
                        ? item.triggerClassName
                        : clsx(
                            styles.accordionTrigger,
                            styles.underlineAnimation,
                          )
                    }
                    style={item.triggerStyle}
                  >
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent
                    className={
                      item.contentClassName
                        ? item.contentClassName
                        : clsx("text-left relative", styles.lessonItem)
                    }
                  >
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      )}
      {!isOpen && (
        <div className="bg-zinc-100 h-full">
          <ExpandSidebarButton onClick={onToggle} className="h-full" />
        </div>
      )}
    </div>
  );
}
