import { HashLink } from "react-router-hash-link";
import { lessonLinkFromLessonNum } from "@/utils/lessonLink";
import { useState } from "react";

const CHAPTER_SECTIONS = [
  {
    id: 1,
    title: "Chapter 1: Single Slit Diffraction and the Heisenberg Uncertainty Principle",
    date: "Chapter 01 — Week 1",
    description:
      "This chapter focuses on Single-Slit Diffraction and the Heisenberg Uncertainty Principle, showing how wave behavior and quantum ideas are connected. It explores the single-slit experiment and explains how the spreading of light or particles after passing through a narrow slit provides observable evidence of the Heisenberg Uncertainty Principle. Through this experiment, the chapter highlights how increasing precision in position leads to greater uncertainty in momentum.",
    units: [
      { title: "Unit 1.1: The Single Slit Diffraction Pattern", href: lessonLinkFromLessonNum(1, 1, 1) },
      { title: "Unit 1.2: The Heisenberg Uncertainty Principle", href: lessonLinkFromLessonNum(1, 1, 2) },
      { title: "Unit 1.3: A Simulation of the Single Slit Experiment", href: lessonLinkFromLessonNum(1, 1, 3) },
    ],
  },
  {
    id: 2,
    title: "Chapter 2: A Single Particle in 1-Dimensional Box",
    description:
      "This chapter focuses on using the time-independent Schrödinger equation to derive the wavefunction for a single energy eigenstate of a particle in a box. It examines how applying the equation, along with the boundary conditions of the system, leads to quantized energy levels and specific allowed wavefunctions. Through this process, the chapter shows how the particle-in-a-box model illustrates key ideas in quantum mechanics, including confinement, standing waves, and energy quantization.",
    date: "Chapter 02 — Week 2",
    units: [
      { title: "Unit 2.1: A Single Particle in a 1-Dimensional Box ", href: lessonLinkFromLessonNum(2, 1, 1) },
      { title: "Unit 2.2: Applying Boundary Conditions", href: lessonLinkFromLessonNum(2, 1, 2) },
      { title: "Unit 2.3: A Simulation of a Particle in a 1-Dimensional Box", href: lessonLinkFromLessonNum(2, 1, 3) },
    ],
  },
  {
    id: 3,
    title: "Chapter 3: Superposition of Energy Eigenstates in a 1-Dimensional Box",
    description:
      "This chapter builds on the particle-in-a-box model by introducing the time-dependent Schrödinger equation and exploring how the wavefunction evolves over time. It examines the superposition of two energy eigenstates for a single particle in a box, showing how multiple allowed states can combine to produce a time-dependent quantum system. Through this extension, the chapter highlights important ideas such as quantum superposition, probability density variation, and the dynamic behavior of particles in confined systems.",
    date: "Chapter 03 — Week 4",
    units: [
      { title: "Unit 3.1: Energy Eigenstates vs.Energy Superpositions", href: lessonLinkFromLessonNum(3, 1, 1) },
      { title: "Unit 3.2: Separation of Position and Time Variables", href: lessonLinkFromLessonNum(3, 1, 2) },
      { title: "Unit 3.3: Solving the Temporal Wavefunction", href: lessonLinkFromLessonNum(3, 1, 3) },
      { title: "Unit 3.4: Superposition in the Infinite Square Well", href: lessonLinkFromLessonNum(3, 1, 4) },
      {
        title: "Unit 3.5: Superposition of Two Energy States in the Infinite Square Well",
        href: lessonLinkFromLessonNum(3, 1, 5),
      },
      {
        title: "Unit 3.6: A Simulation of the Superposition of Two Energy States",
        href: lessonLinkFromLessonNum(3, 1, 6),
      },
    ],
  },
  {
    id: 4,
    title: "Chapter 4: The Two-Particle Rigid Rotor",
    description:
      "This chapter explores the rigid rotor model for two particles, demonstrating its analogy to the quantized angular momentum of a quantum particle. It examines how the rotational motion of the system leads to discrete energy levels and quantized angular momentum values.",
    date: "Chapter 04 — Week 6",
    units: [
      { title: "Unit 4.1: The Rigid Rotor Model", href: lessonLinkFromLessonNum(4, 1, 1) },
      { title: "Unit 4.2: The Hamiltonian and the Reduced Mass", href: lessonLinkFromLessonNum(4, 1, 2) },
      { title: "Unit 4.3: The Reduced Mass Moment of Inertia", href: lessonLinkFromLessonNum(4, 1, 3) },
      {
        title: "Unit 4.4: Applying the Spherical Harmonics of the Schrödinger Equation",
        href: lessonLinkFromLessonNum(4, 1, 4),
      },
      { title: "Unit 4.5: The Discrete Energy Spectrum", href: lessonLinkFromLessonNum(4, 1, 5) },
      { title: "Unit 4.6: A Simulation of the Two-Particle Rigid Rotor", href: lessonLinkFromLessonNum(4, 1, 6) },
    ],
  },
  {
    id: 5,
    title: "Chapter 5: Superposition of the 1s and 2pz States",
    description:
      "This chapter applies the radial and angular factors of the wavefunction to derive the 1s and 2pz states of an electron. It then shows how these two states can be combined in a superposition, producing a wavefunction that changes over time. By examining this time-dependent behavior, the chapter explores how the superposition oscillates between the two states, illustrating key ideas about quantum interference, phase evolution, and the dynamic nature of quantum systems.",
    date: "Chapter 05 — Week 7",
    units: [
      {
        title: "Unit 5.1: Deriving the 1s State Function from the Radial Factor",
        href: lessonLinkFromLessonNum(5, 1, 1),
      },
      {
        title: "Unit 5.2: Deriving the 2pz State Function from the Radial Factor",
        href: lessonLinkFromLessonNum(5, 1, 2),
      },
      { title: "Unit 5.3: Superposition of the 1s and 2pz States", href: lessonLinkFromLessonNum(5, 1, 3) },
      { title: "Unit 5.4: A Simulation of 1s and 2pz Superposition", href: lessonLinkFromLessonNum(5, 1, 4) },
    ],
  },
  {
    id: 6,
    title: "Chapter 6: Superposition of the 1s and 2p States",
    description:
      "Building off of Chapter 5, this chapter develops the hydrogen atom wavefunctions for the 1s and 2p electron states from their radial and angular components and explores their time-dependent superposition.",
    date: "Chapter 06 — Week 8",
    units: [
      {
        title: "Unit 6.1: Deriving the 1s State Function from the Radial Factor",
        href: lessonLinkFromLessonNum(6, 1, 1),
      },
      {
        title: "Unit 6.2: Deriving the 2p State Function from the Radial Factor",
        href: lessonLinkFromLessonNum(6, 1, 2),
      },
      { title: "Unit 6.3: Superposition of the 1s and 2p States", href: lessonLinkFromLessonNum(6, 1, 3) },
      { title: "Unit 6.4: A Simulation of 1s and 2p Superposition", href: lessonLinkFromLessonNum(6, 1, 4) },
    ],
  },
];

export function HomepageChapterSections() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <h2 className="text-lg font-bold tracking-[0.25em] uppercase text-outline mb-6">Chapters & Simulations</h2>

      <div className="space-y-10">
        {CHAPTER_SECTIONS.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={item.title}>
              <div className="group cursor-pointer" onClick={() => setOpenIndex(isOpen ? null : i)}>
                <div className="flex justify-between items-baseline mb-2 ">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors underlineAnimationText">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-mono text-outline-variant italic">{item.date}</span>
                    <span
                      className={`text-outline-variant transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    >
                      ▾
                    </span>
                  </div>
                </div>
                <p className="text-on-surface-variant leading-relaxed max-w-4xl">{item.description}</p>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
                }`}
              >
                <ul className="border-l-2 border-outline-variant/30 pl-2 space-y-1">
                  {item.units.map((unit) => (
                    <li key={unit.title}>
                      <HashLink
                        to={unit.href}
                        className="group/unit text-sm font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-3 py-2 px-3 rounded-md hover:bg-primary/5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-outline-variant/50 group-hover/unit:bg-primary group-hover/unit:scale-125 transition-all duration-200 inline-block shrink-0" />

                        <span className="relative inline-block after:absolute after:bottom-[-2px] after:left-0 after:h-[3px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover/unit:after:w-full">
                          {unit.title}
                        </span>

                        <span className="ml-auto opacity-0 group-hover/unit:opacity-100 transition-opacity duration-200 text-primary text-xs">
                          →
                        </span>
                      </HashLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}