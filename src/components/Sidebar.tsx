import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion/accordion";
import { HashLink } from "react-router-hash-link";
import styles from "./styles/sidebar.module.css";
import MinimizeSidebarButton from "./buttons/MinimizeSidebarButton";
import ExpandSidebarButton from "./buttons/ExpandSidebarButton";
import clsx from "clsx";
import type { CSSProperties } from "react";
import { useState, useEffect } from "react";

type LinksAccordionProps = {
  id: string;
  title: string;
  content?: React.ReactNode[];
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
};

const ROUTE = {
  lessons: "lessons",
  chapter: "chapter",
  unit: "unit",
  lesson: "lesson",
} as const;

const lessonLink = (chapterNum: number, unitNum: number, lessonNum?: number) => {
  return lessonNum == 1
    ? `/${ROUTE.lessons}/${ROUTE.chapter}${chapterNum}/${ROUTE.unit}${unitNum}#`
    : `/${ROUTE.lessons}/${ROUTE.chapter}${chapterNum}/${ROUTE.unit}${unitNum}#${ROUTE.lesson}${lessonNum}`;
};
const section: LinksAccordionProps[] = [
  {
    id: "1",
    title: "Unit 1: The Heisenberg Uncertainty Principle",
    content: [
      <HashLink to={lessonLink(1, 1, 1)}>1.1: Single Slit Diffraction</HashLink>,
      <HashLink to={lessonLink(1, 1, 2)}>1.2: Heisenberg Uncertainty Principle</HashLink>,
      <HashLink to={lessonLink(1, 1, 3)}>1.3: Single Slit Simulation</HashLink>,
    ],
    triggerClassName: clsx(styles.accordionTrigger, styles.underlineAnimation, "border-t"),
  },
  {
    id: "2",
    title: "Unit 2: Single Particle in 1-Dimensional Box",
    content: [
      <HashLink to={lessonLink(2, 1, 1)}>2.1 Single Particle in 1-Dimensional Box</HashLink>,
      <HashLink to={lessonLink(2, 1, 2)}>2.2 Applying Boundary Conditions</HashLink>,
      <HashLink to={lessonLink(2, 1, 3)}>2.3 Simulation of a Particle in a 1D Box</HashLink>,
    ],
  },
  {
    id: "3",
    title: "Unit 3: Superposition of Energy Eigenstates",
    content: [
      <HashLink to={lessonLink(3, 1, 1)}>3.1 Energy Eigenstates vs. Superpositions</HashLink>,
      <HashLink to={lessonLink(3, 1, 2)}>3.2 Separation of Position & Time Variables</HashLink>,
      <HashLink to={lessonLink(3, 1, 3)}>3.3 Solving The Temporal Wavefunction</HashLink>,
      <HashLink to={lessonLink(3, 1, 4)}>3.4 Superposition in the Infinite Square Well</HashLink>,
      <HashLink to={lessonLink(3, 1, 5)}>3.5 Simulation of Two Energy States</HashLink>,
    ],
  },
  {
    id: "4",
    title: "Unit 4: The Two-Particle Rigid Rotor",
    content: [
      <HashLink to={lessonLink(4, 1, 1)}>4.1 The Rigid Rotor Model</HashLink>,
      <HashLink to={lessonLink(4, 1, 2)}>4.2 The Hamiltonian and Reduced Mass</HashLink>,
      <HashLink to={lessonLink(4, 1, 3)}>4.3 The Reduced Mass Moment of Inertia</HashLink>,
      <HashLink to={lessonLink(4, 1, 4)}>4.4 Applying Spherical Harmonics</HashLink>,
      <HashLink to={lessonLink(4, 1, 5)}>4.5 The Discrete Energy Spectrum</HashLink>,
      <HashLink to={lessonLink(4, 1, 6)}>4.6 Simulation of the Rigid Rotor</HashLink>,
    ],
  },
  {
    id: "5",
    title: "Unit 5: Superposition of 1s and 2p1 states",
    content: [
      <HashLink to={lessonLink(5, 1, 1)}>5.1 Applying Spherical Harmonics</HashLink>,
      <HashLink to={lessonLink(5, 1, 2)}>5.2 The Discrete Energy Spectrum</HashLink>,
    ],
  },
  {
    id: "6",
    title: "Unit 6: Physical Properties of Atoms",
    content: [
      <HashLink to={lessonLink(6, 1, 1)}>5.1 Applying Spherical Harmonics</HashLink>,
      <HashLink to={lessonLink(6, 1, 2)}>5.2 The Discrete Energy Spectrum</HashLink>,
    ],
  },
  {
    id: "7",
    title: "Unit 7: Physical Properties of Atoms",
    content: [<HashLink to="/">3.3: The Superposition of 1s2pz</HashLink>],
  },
];

export default function Sidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const intersectionObserver = new IntersectionObserver(([entry]) => setHeaderVisible(entry.isIntersecting), {
      threshold: 0,
    });

    const resizeObserver = new ResizeObserver(([entry]) => {
      setHeaderHeight(entry.contentRect.height);
    });

    intersectionObserver.observe(header);
    resizeObserver.observe(header);

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-zinc-50 flex-1 border border-black relative">
      {isOpen && (
        <div
          className="p-4 fixed transition-[top] duration-500 ease-in-out"
          style={{ top: headerVisible ? headerHeight : 0 }}
        >
          <MinimizeSidebarButton onClick={onToggle} className="absolute right-2 top-2 z-10" />
          <header className="text-center font-bold text-xl p-2 mb-5">Lesson Overview</header>
          <div className="bg-zinc-200 rounded-2xl border border-black pb-5 pt-5">
            <Accordion>
              {section.map((item) => (
                <AccordionItem id={item.id} key={item.id}>
                  <AccordionTrigger
                    className={
                      item.triggerClassName
                        ? item.triggerClassName
                        : clsx(styles.accordionTrigger, styles.underlineAnimation)
                    }
                    style={item.triggerStyle}
                  >
                    {item.title}
                  </AccordionTrigger>
                  {item.content?.map((content, index) => (
                    <AccordionContent
                      key={index}
                      className={item.contentClassName ? item.contentClassName : styles.linkItem}
                      style={item.contentStyle}
                    >
                      {content}
                    </AccordionContent>
                  ))}
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      )}
      {!isOpen && (
        <div className="bg-zinc-100 h-full flex items-center">
          <ExpandSidebarButton onClick={onToggle} className="h-full" />
        </div>
      )}
    </div>
  );
}
