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
      "Build a strong foundation by exploring the course overview, learning goals, key vocabulary, and the essential concepts introduced at the beginning of the program.",
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
      "Apply the basics through guided examples, interactive tasks, and real learning scenarios that help students connect ideas and build confidence.",
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
      "Revisit the main ideas, test understanding with quick checks, and reflect on progress through summaries, checkpoints, and extension tasks.",
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
      "Bring everything together in a project-based unit where learners create, present, and evaluate their understanding using the skills from earlier chapters.",
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
      "Bring everything together in a project-based unit where learners create, present, and evaluate their understanding using the skills from earlier chapters.",
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
      "Bring everything together in a project-based unit where learners create, present, and evaluate their understanding using the skills from earlier chapters.",
    image: "src/pages/assets/Chapter6Image_Superposition1s2p.png",
    units: [
      { title: "Unit 6.1: Deriving the 1s State Function from the Radial Factor", href: lessonLink(6, 1, 1) },
      { title: "Unit 6.2: Deriving the 2p State Function from the Radial Factor", href: lessonLink(6, 1, 2) },
      { title: "Unit 6.3: Superposition of the 1s and 2p States", href: lessonLink(6, 1, 3) },
      { title: "Unit 6.4: A Simulation of 1s and 2p Superposition", href: lessonLink(6, 1, 4) },
    ],
  },
];

export default function Homepage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 p-4">
      <section className="mx-auto max-w-7xl px-6 pb-15 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500"></p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            CM-UY 3113: Physical Chemistry I
          </h1>

          <p className="mt-5 leading-7 text-slate-900 sm:text-lg">
            This course provides a molecular approach of physical chemistry, covering quantum mechanics and its
            applications to atomic and molecular structure and to molecular spectroscopy. In this course, we cover the
            Schrödinger equation, the quantum mechanical treatment of harmonic oscillators, hydrogen atomic orbitals,
            perturbation theory, electron spin, and a short introduction to statistical thermodynamics.
          </p>
          <p className="mt-5 text-base leading-7 text-slate-900 sm:text-lg">
            This website contains derivations of some key equations and interactive simulations of quantum mechanical
            concepts. Since this website is intended to be used while taking New York University's CM-UY 3113: Physical
            Chemistry I course, please also obtain the courses's textbook (Quantum Chemistry 7th Edition, by Ira N.
            Levine.) to follow along with each chapter.
          </p>
          <div className="flex justify-center-safe pt-12">
            <img src="src/pages/assets/Quantum Chemistry 7th Edition by Ira Levine.jpg" alt="An image of the cover of Quantum Chemistry 7th Edition by Ira Levine"></img>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-8xl px-6 pb-10 sm:px-8 lg:px-10 bg-zinc-100 rounded-2xl border-black border-2">
        <h2 className="text-4xl text-center pt-8 pb-10 font-semibold tracking-tight text-slate-950 sm:text-5xl">
          CM-UY 3113: Physical Chemistry I: Chapter Overview
        </h2>
        <div className="space-y-10">
          {chapters.map((chapter) => (
            <article key={chapter.id} className="overflow-hidden rounded-3xl border border-black bg-white shadow-sm">
              <div className="grid gap-0 lg:grid-cols-[1fr_1.5fr]">
                <div className="border-b border-slate-200 bg-slate-50 lg:border-b-0 lg:border-r">
                  <img src={chapter.image} alt={chapter.title} className="h-full min-h-[260px] w-full object-cover" />
                </div>

                <div className="p-8 sm:p-10">
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{chapter.title}</h2>

                  <p className="mt-4 text-base leading-7 text-slate-600">{chapter.description}</p>

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
                            <span className="transition group-hover:translate-x-0.5 group-hover:text-slate-600">→</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
