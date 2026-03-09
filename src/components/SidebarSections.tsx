import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import { HashLink } from "react-router-hash-link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion/accordion";
import "./styles/sidebar.css";

type LessonItem = {
  chapterNum: number;
  unitNum: number;
  lessonNum: number;
  label: ReactNode;
};

type SectionItem = {
  id: string;
  title: ReactNode;
  lessons: LessonItem[];
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
};

const lessonLink = (chapterNum: number, unitNum: number, lessonNum = 1) =>
  `/lessons/chapter${chapterNum}/unit${unitNum}#${
    lessonNum === 1 ? "" : `lesson${lessonNum}`
  }`;

const defaultTriggerClass = "sidebarAccordionTrigger underlineAnimation"
const defaultContentClass = "linkItem";

const sections: SectionItem[] = [
  {
    id: "1",
    title: <p>Unit 1: The Heisenberg Uncertainty Principle</p>,
    lessons: [
      { chapterNum: 1, unitNum: 1, lessonNum: 1, label: "1.1: Single Slit Diffraction" },
      { chapterNum: 1, unitNum: 1, lessonNum: 2, label: "1.2: Heisenberg Uncertainty Principle" },
      { chapterNum: 1, unitNum: 1, lessonNum: 3, label: "1.3: Single Slit Simulation" },
    ],
    triggerClassName: "border-t-2",
  },
  {
    id: "2",
    title: <p>Unit 2: Single Particle in 1-Dimensional Box</p>,
    lessons: [
      { chapterNum: 2, unitNum: 1, lessonNum: 1, label: "2.1 Single Particle in 1-Dimensional Box" },
      { chapterNum: 2, unitNum: 1, lessonNum: 2, label: "2.2 Applying Boundary Conditions" },
      { chapterNum: 2, unitNum: 1, lessonNum: 3, label: "2.3 Simulation of a Particle in a 1D Box" },
    ],
  },
  {
    id: "3",
    title: <p>Unit 3: Superposition of Energy Eigenstates</p>,
    lessons: [
      { chapterNum: 3, unitNum: 1, lessonNum: 1, label: "3.1 Energy Eigenstates vs. Superpositions" },
      { chapterNum: 3, unitNum: 1, lessonNum: 2, label: "3.2 Separation of Position & Time Variables" },
      { chapterNum: 3, unitNum: 1, lessonNum: 3, label: "3.3 Solving The Temporal Wavefunction" },
      { chapterNum: 3, unitNum: 1, lessonNum: 4, label: "3.4 Superposition in the Infinite Square Well" },
      { chapterNum: 3, unitNum: 1, lessonNum: 5, label: "3.5 Simulation of Two Energy States" },
    ],
  },
  {
    id: "4",
    title: <p>Unit 4: The Two-Particle Rigid Rotor</p>,
    lessons: [
      { chapterNum: 4, unitNum: 1, lessonNum: 1, label: "4.1 The Rigid Rotor Model" },
      { chapterNum: 4, unitNum: 1, lessonNum: 2, label: "4.2 The Hamiltonian and Reduced Mass" },
      { chapterNum: 4, unitNum: 1, lessonNum: 3, label: "4.3 The Reduced Mass Moment of Inertia" },
      { chapterNum: 4, unitNum: 1, lessonNum: 4, label: "4.4 Applying Spherical Harmonics" },
      { chapterNum: 4, unitNum: 1, lessonNum: 5, label: "4.5 The Discrete Energy Spectrum" },
      { chapterNum: 4, unitNum: 1, lessonNum: 6, label: "4.6 Simulation of the Rigid Rotor" },
    ],
  },
  {
    id: "5",
    title: <p>Unit 5. Superposition of 1s and 2p<sub>z</sub> States</p>,
    lessons: [
      { chapterNum: 5, unitNum: 1, lessonNum: 1, label: "5.1 Deriving the 1s State Function" },
      { chapterNum: 5, unitNum: 1, lessonNum: 2, label: <p>5.2 Deriving the 2p<sub>z</sub> State Function</p> },
      { chapterNum: 5, unitNum: 1, lessonNum: 3, label: <p>5.3 Superposition of the 1s and 2p<sub>z</sub> States</p> },
      { chapterNum: 5, unitNum: 1, lessonNum: 3, label: <p>5.4 Simulation of 1s and 2p<sub>z</sub> Superposition</p> },
    ],
  },
  {
    id: "6",
    title: <p>Unit 6. Superposition of 1s and 2p States</p>,
    lessons: [
      { chapterNum: 6, unitNum: 1, lessonNum: 1, label: "6.1 Deriving the 1s State Function" },
      { chapterNum: 6, unitNum: 1, lessonNum: 2, label: "6.2 Deriving the 2p State Function" },
      { chapterNum: 6, unitNum: 1, lessonNum: 2, label: "6.3 Superposition of the 1s and 2p States" },
      { chapterNum: 6, unitNum: 1, lessonNum: 2, label: "6.4 Simulation of 1s and 2p Superposition" },
      
    ],
  },

];

export default function SidebarSections() {
  return (
    <Accordion>
      {sections.map((section) => (
        <AccordionItem id={section.id} key={section.id}>
          <AccordionTrigger
            className={clsx(defaultTriggerClass, section.triggerClassName)}
            style={section.triggerStyle}
          >
            {section.title}
          </AccordionTrigger>

          {section.lessons.map((lesson) => (
            <AccordionContent
              key={`${lesson.chapterNum}-${lesson.unitNum}-${lesson.lessonNum}`}
              className={clsx(defaultContentClass, section.contentClassName)}
              style={section.contentStyle}
            >
              <HashLink to={lessonLink(lesson.chapterNum, lesson.unitNum, lesson.lessonNum)}>
                {lesson.label}
              </HashLink>
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
}