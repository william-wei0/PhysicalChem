import { useAllLessonProgress } from "@/hooks/useAllLessonProgress";

type Unit = {
  title: string;
  href: string;
};

type Chapter = {
  id: number;
  title: string;
  description: string;
  image: string;
  units: Unit[];
};

const lessonLink = (chapterNum: number, unitNum: number, lessonNum = 1) =>
  `/lessons/chapter${chapterNum}/unit${unitNum}${lessonNum === 1 ? "" : `#lesson${lessonNum}`}`;

const chapters: Chapter[] = [
  {
    id: 1,
    title: "Chapter 1: Single Slit Diffraction and the Heisenberg Uncertainty Principle",
    description:
      "This chapter focuses on Single-Slit Diffraction and the Heisenberg Uncertainty Principle, showing how wave behavior and quantum ideas are connected. It explores the single-slit experiment and explains how the spreading of light or particles after passing through a narrow slit provides observable evidence of the Heisenberg Uncertainty Principle. Through this experiment, the chapter highlights how increasing precision in position leads to greater uncertainty in momentum.",
    image: "src/pages/assets/Chapter1Image_SingleSlitDiffraction.png",
    units: [
      { title: "Unit 1.1: The Single Slit Diffraction Pattern", href: lessonLink(1, 1, 1) },
      { title: "Unit 1.2: The Heisenberg Uncertainty Principle", href: lessonLink(1, 1, 2) },
      { title: "Unit 1.3: A Simulation of the Single Slit Experiment", href: lessonLink(1, 1, 3) },
    ],
  },
  {
    id: 2,
    title: "Chapter 2: A Single Particle in 1-Dimensional Box",
    description:
      "This chapter focuses on using the time-independent Schrödinger equation to derive the wavefunction for a single energy eigenstate of a particle in a box. It examines how applying the equation, along with the boundary conditions of the system, leads to quantized energy levels and specific allowed wavefunctions. Through this process, the chapter shows how the particle-in-a-box model illustrates key ideas in quantum mechanics, including confinement, standing waves, and energy quantization.",
    image: "src/pages/assets/Chapter2Image_Particle1DBox.png",
    units: [
      { title: "Unit 2.1: A Single Particle in a 1-Dimensional Box ", href: lessonLink(2, 1, 1) },
      { title: "Unit 2.2: Applying Boundary Conditions", href: lessonLink(2, 1, 2) },
      { title: "Unit 2.3: A Simulation of a Particle in a 1-Dimensional Box", href: lessonLink(2, 1, 3) },
    ],
  },
  {
    id: 3,
    title: "Chapter 3: Superposition of Energy Eigenstates in a 1-Dimensional Box",
    description:
      "This chapter builds on the particle-in-a-box model by introducing the time-dependent Schrödinger equation and exploring how the wavefunction evolves over time. It examines the superposition of two energy eigenstates for a single particle in a box, showing how multiple allowed states can combine to produce a time-dependent quantum system. Through this extension, the chapter highlights important ideas such as quantum superposition, probability density variation, and the dynamic behavior of particles in confined systems.",
    image: "src/pages/assets/Chapter3Image_Superposition1DBox2.png",
    units: [
      { title: "Unit 3.1: Energy Eigenstates vs.Energy Superpositions", href: lessonLink(3, 1, 1) },
      { title: "Unit 3.2: Separation of Position and Time Variables", href: lessonLink(3, 1, 2) },
      { title: "Unit 3.3: Solving the Temporal Wavefunction", href: lessonLink(3, 1, 3) },
      { title: "Unit 3.4: Superposition in the Infinite Square Well", href: lessonLink(3, 1, 4) },
      { title: "Unit 3.5: Superposition of Two Energy States in the Infinite Square Well", href: lessonLink(3, 1, 5) },
      { title: "Unit 3.6: A Simulation of the Superposition of Two Energy States", href: lessonLink(3, 1, 6) },
    ],
  },
  {
    id: 4,
    title: "Chapter 4: The Two-Particle Rigid Rotor",
    description:
      "This chapter explores the rigid rotor model for two particles, demonstrating its analogy to the quantized angular momentum of a quantum particle. It examines how the rotational motion of the system leads to discrete energy levels and quantized angular momentum values.",
    image: "src/pages/assets/Chapter4Image_RigidRotor.png",
    units: [
      { title: "Unit 4.1: The Rigid Rotor Model", href: lessonLink(4, 1, 1) },
      { title: "Unit 4.2: The Hamiltonian and the Reduced Mass", href: lessonLink(4, 1, 2) },
      { title: "Unit 4.3: The Reduced Mass Moment of Inertia", href: lessonLink(4, 1, 3) },
      { title: "Unit 4.4: Applying the Spherical Harmonics of the Schrödinger Equation", href: lessonLink(4, 1, 4) },
      { title: "Unit 4.5: The Discrete Energy Spectrum", href: lessonLink(4, 1, 5) },
      { title: "Unit 4.6: A Simulation of the Two-Particle Rigid Rotor", href: lessonLink(4, 1, 6) },
    ],
  },
  {
    id: 5,
    title: "Chapter 5: Superposition of the 1s and 2pz States",
    description:
      "This chapter applies the radial and angular factors of the wavefunction to derive the 1s and 2pz states of an electron. It then shows how these two states can be combined in a superposition, producing a wavefunction that changes over time. By examining this time-dependent behavior, the chapter explores how the superposition oscillates between the two states, illustrating key ideas about quantum interference, phase evolution, and the dynamic nature of quantum systems.",
    image: "src/pages/assets/Chapter5Image_Superposition1s2pz.png",
    units: [
      { title: "Unit 5.1: Deriving the 1s State Function from the Radial Factor", href: lessonLink(5, 1, 1) },
      { title: "Unit 5.2: Deriving the 2pz State Function from the Radial Factor", href: lessonLink(5, 1, 2) },
      { title: "Unit 5.3: Superposition of the 1s and 2pz States", href: lessonLink(5, 1, 3) },
      { title: "Unit 5.4: A Simulation of 1s and 2pz Superposition", href: lessonLink(5, 1, 4) },
    ],
  },
  {
    id: 6,
    title: "Chapter 6: Superposition of the 1s and 2p States",
    description:
      "Building off of Chapter 5, this chapter develops the hydrogen atom wavefunctions for the 1s and 2p electron states from their radial and angular components and explores their time-dependent superposition.",
    image: "src/pages/assets/Chapter6Image_Superposition1s2p.png",
    units: [
      { title: "Unit 6.1: Deriving the 1s State Function from the Radial Factor", href: lessonLink(6, 1, 1) },
      { title: "Unit 6.2: Deriving the 2p State Function from the Radial Factor", href: lessonLink(6, 1, 2) },
      { title: "Unit 6.3: Superposition of the 1s and 2p States", href: lessonLink(6, 1, 3) },
      { title: "Unit 6.4: A Simulation of 1s and 2p Superposition", href: lessonLink(6, 1, 4) },
    ],
  },
];

export default function LessonsIndexPage() {
  const { getChapterStats } = useAllLessonProgress();

  return (
    <main className="min-h-screen bg-white text-slate-900 p-4">
      <div className="bg-white p-10 pt-2">
        <h2 className="homepageTitleFont sm:text-5xl md:text-6xl text-center pt-8 pb-12 font-extrabold tracking-tighter leading-tight text-on-surface text-slate-950 ">
          CM-UY 3113: Physical Chemistry I: Chapters
        </h2>
        <div className="space-y-10">
          {chapters.map((chapter) => {
            const { completed, total, percent, allComplete } = getChapterStats(chapter.id);
            return (
              <article key={chapter.id} className="overflow-hidden rounded-3xl border border-black bg-white shadow-sm">
                <div className="grid gap-0 lg:grid-cols-[1fr_1.5fr]">
                  <div className="border-b border-slate-200 bg-slate-50 lg:border-b-0 lg:border-r">
                    <img src={chapter.image} alt={chapter.title} className="h-full min-h-[260px] w-full object-cover" />
                  </div>

                  <div className="p-8 sm:p-10">
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                      {chapter.title}
                    </h2>

                    <p className="mt-4 text-base leading-7 text-slate-600 mb-4">{chapter.description}</p>

                    <div className="w-full space-y-2">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium">
                          {allComplete ? "All " : ""}Objectives Completed{allComplete ? "!" : ""} ({completed}/{total})
                        </p>
                        <p className="text-sm font-medium">{percent.toFixed(1)}%</p>
                      </div>
                      <div className="w-full h-2 bg-slate-300 rounded-full overflow-hidden mb-4">
                        <div
                          className={`h-full transition-all duration-700 ease-out ${allComplete ? "bg-green-500": "bg-red-700"}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="font-semibold uppercase tracking-[0.18em] text-slate-500">Chapter units</h3>

                      <div className="mt-4 grid gap-3 sm:grid-cols-1">
                        {chapter.units.map((unit) => (
                          <a
                            key={unit.title}
                            href={unit.href}
                            className="group rounded-2xl border border-slate-500 bg-white px-4 py-4 font-medium transition hover:border-slate-400 hover:bg-slate-50"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span>{unit.title}</span>
                              <span className="transition group-hover:translate-x-0.5 group-hover:text-slate-600">
                                →
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
