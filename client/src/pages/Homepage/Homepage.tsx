import { HomepageChapterSections } from "./HomepageChapterSections";

export function HomepageIntro() {
  return (
    <section className="px-6 sm:px-8 lg:px-10 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-15 ">
        <div className="lg:col-span-3">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500"></p>
          <div
            className={`homepageTitleFont text-6xl md:text-7xl font-extrabold tracking-tighter leading-tight text-on-surface`}
          >
            <h1>Physical Chemistry I:</h1> <h1>CM-UY 3113</h1>
          </div>

          <p className="mt-5 leading-7 text-slate-900 sm:text-lg">
            This course provides a molecular approach of physical chemistry, covering quantum mechanics and its
            applications to atomic and molecular structure and to molecular spectroscopy. In this course, we cover the
            Schrödinger equation, the quantum mechanical treatment of harmonic oscillators, hydrogen atomic orbitals,
            perturbation theory, electron spin, and a short introduction to statistical thermodynamics.
          </p>
          <p className="mt-5 text-base leading-7 text-slate-900 sm:text-lg">
            This website contains derivations of some key equations and interactive simulations of quantum mechanical
            concepts. Since this website is used to assist studying for CM-UY 3113: Physical Chemistry I, please also
            obtain a copy of courses's textbook: Quantum Chemistry 7th Edition, by Ira N. Levine.
          </p>
        </div>

        <div className="lg:col-span-2 flex items-center justify-center p-3">
          <img
            src="src/assets/pages/Quantum Chemistry 7th Edition by Ira Levine.jpg"
            alt="An image of the cover of Quantum Chemistry 7th Edition by Ira Levine"
            className="w-full h-full object-contain"
          ></img>
        </div>
      </div>
    </section>
  );
}


export default function Homepage() {
  return (
    <div className="bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed-variant min-h-screen">
      <main className="max-w-[1440px] mx-auto px-8 py-16">
        <HomepageIntro />
        <HomepageChapterSections />
      </main>
    </div>
  );
}
