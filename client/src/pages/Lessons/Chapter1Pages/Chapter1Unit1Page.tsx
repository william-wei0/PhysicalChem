import SingleSlitSimulation from "./simulationComponents/SingleSlitSimulation";
import LessonSection from "../LessonSection";
import "../styles/lessons.css";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import LessonLayout from "../LessonLayout";
import { TasksPanel } from "@/context/LessonTasks/TasksPanel";
import { LessonTasksProvider } from "@/context/LessonTasks/LessonTasksProvider";
import { type TaskSection } from "@/context/LessonTasks/LessonTasksContext";

export default function Chapter1Unit1Page() {
  const LESSON_SECTIONS: TaskSection[] = [
    {
      id: "Section 1.3.1 Light as a Wave",
      title: "Section 1.3.1: Light as a Wave",
      tasks: [
        {
          id: "observeIncreaseDiffractionSlitSizeChanges",
          label: (
            <p>
              <strong>(Task 1.1)</strong> Increase the Diffraction Slit Size (increasing the uncertainty in position{" "}
              <InlineMath math="\Delta x" />
              ), and observe how the diffraction pattern narrows on photoreceptor wall (decreasing the uncertainty in
              momentum <InlineMath math="\Delta p" />
              ).
            </p>
          ),
          completed: false,
        },
        {
          id: "observeDecreaseDiffractionSlitSizeChanges",
          label: (
            <p>
              <strong>(Task 1.2)</strong> Decrease the Diffraction Slit Size (decreasing the uncertainty in position{" "}
              <InlineMath math="\Delta x" />
              ), and observe how the diffraction pattern spreads out on photoreceptor wall (increasing the uncertainty
              in momentum <InlineMath math="\Delta p" />
              ).
            </p>
          ),
          completed: false,
        },
        {
          id: "observeIncreaseWavelengthChanges",
          label: (
            <p>
              <strong>(Task 1.3)</strong> From equations (1) and (4), we wrote{" "}
              <InlineMath math="\Delta x \Delta p_{x} = p \lambda" />. This showed that an increase in wavelength is met
              by an increase in the uncertainty in position to maintain equality (if <InlineMath math="\Delta x" /> is
              constant). Observe how increasing the wavelength spreads out the diffraction pattern on photoreceptor
              wall.
            </p>
          ),
          completed: false,
        },
        {
          id: "observeDecreaseWavelengthChanges",
          label: (
            <p>
              <strong>(Task 1.4)</strong> Similarly, a decrease in wavelength is met by a decrease in the uncertainty in
              position. Observe how decreasing the wavelength narrows the diffraction pattern on photoreceptor wall.
            </p>
          ),
          completed: false,
        },
      ],
    },
    {
      id: "Section 1.3.2 Light as a Particle",
      title: "Section 1.3.2: Light as a Wave",
      tasks: [
        {
          id: "showParticles",
          label: (
            <p>
              <strong>(Task 2.1)</strong> Change the Simulation mode to treat light as particles by clicking{" "}
              <strong> Show Particle Simulation</strong>.
            </p>
          ),
          completed: false,
        },
        {
          id: "showParticleDistribution",
          label: (
            <p>
              <strong>(Task 2.2)</strong> Convert the photoreceptor wall to show expected particle distributions by
              clicking on <strong>Light Wave Gradient</strong>. Observe how the peaks and valleys of the expected
              particle distributions matches the light wave gradient.
            </p>
          ),
          completed: false,
        },
        {
          id: "startFirstParticleSimulation",
          label: (
            <p>
              <strong>(Task 2.3)</strong> Open the Particle Simulation Settings and start a simulation of light
              particles passing through the slit. The location of each particle hitting the wall is marked by a yellow
              tick.
            </p>
          ),
          completed: false,
        },
        {
          id: "observeParticleMovement",
          label: (
            <p>
              <strong>(Task 2.4)</strong> Observe how the particles follow wave's anti-nodes (areas of high intensity)
              and avoids the node (areas of low intensity), resulting in the same distribution on the wall as the
              expected distribution and the light gradient.
            </p>
          ),
          completed: false,
        },
        {
          id: "modifySlitSize",
          label: (
            <p>
              <strong>(Task 2.5)</strong> Modify the Diffraction Slit Size to change the probability distribution.
            </p>
          ),
          completed: false,
        },
        {
          id: "startSecondParticleSimulation",
          label: (
            <p>
              <strong>(Task 2.6)</strong> Start a second particle simulation to observe how the particle distribution
              changed.
            </p>
          ),
          completed: false,
        },
      ],
    },
  ];

  return (
    <LessonLayout>
      <h1 id={"lesson1"}>Unit 1. Single Slit Diffraction and the Heisenberg Uncertainty Principle</h1>

      <LessonSection>
        <h2>1.1 The Single Slit Diffraction Pattern</h2>
        <p>
          To observe the uncertainty principle, we can explore the single slit diffraction experiment. The experiment
          begins with a beam of photons traveling in the positive-y direction with a momentum{" "}
          <InlineMath math="\overrightarrow{p}" />. The beam then encounters a solid, opaque wall with a narrow silt of
          width <InlineMath math="w" />. This wall blocks most of the photons, only allowing some photons to pass
          through the narrow slit. Since the photons pass through a slit of width <InlineMath math="w" />, the
          uncertainty in particle's position after passing through the slit is equal to the width of the slit:{" "}
          <InlineMath math="\Delta x = w" />. The photons that pass through then land on a photographic plate, recording
          the location of the photon. See Figure 1.1 below to see a diagram of the experimental set up.
        </p>

        <div className="figure">
          {" "}
          <img
            src="/src/pages/Lessons/assets/Figure1.1-DiffractionOfElectronsBySlit-QuantumChemistry-IraLevine-p6.png"
            alt="Figure 1.1. Diffraction of electrons by a slit. Obtained from Quantum Chemistry 7th Edition (p. 6, Figure
            1.1) by Ira N. Levine"
          />
          <p>
            Figure 1.1. Diffraction of electrons by a slit. Obtained from Quantum Chemistry 7th Edition (p. 6, Figure
            1.1) by Ira N. Levine{" "}
          </p>
        </div>

        <p>
          Since photons have both particle-like and wave-like properties, they are diffracted by the slit resulting in a
          diffraction pattern on the photographic plate. The graph to the right of the photographic plate in Figure 1.1
          shows the relative probabilities a photon hitting a specific location on the plate. Furthermore, because the
          photons can be found above and below the slit, the diffraction pattern shows that the slit imparts a momentum
          in the y direction on the particles as they pass through. The momentum in y-direction of a particle deflected
          up by an angle <InlineMath math="\alpha" /> can be calculated as <InlineMath math="p_{x} = p\sin{\alpha}" />{" "}
          and similarly <InlineMath math="p_{x} = -p\sin{\alpha}" /> for particles deflected down. Since most particles
          are deflected between the first minimums of the diffraction patterns at angles <InlineMath math="\alpha" />{" "}
          and <InlineMath math="-\alpha" />, we can use the range of the momentum values between{" "}
          <InlineMath math="\alpha" /> and <InlineMath math="-\alpha" /> as a measure of the uncertainty in the momentum
          in the x-direction: <InlineMath math="\Delta p_{x} = p \sin{\alpha}" />.
        </p>
        <p>
          Combining the uncertainty in the position and x-component of the momentum, we can write the following
          equation:
        </p>
        <div className="importantEquation">
          <BlockMath math="\begin{equation} \Delta x \Delta p_{x} = p w \sin{\alpha} \end{equation}"></BlockMath>
        </div>
      </LessonSection>
      <LessonSection>
        <h2 id={"lesson2"}>1.2 The Heisenberg Uncertainty Principle</h2>
        <p>
          Working on the equation further, we can relate the angle <InlineMath math="\alpha" /> to the wavelength{" "}
          <InlineMath math="\lambda" /> of the photons. In order for the photons to destructively interfere at the first
          minimum, the path length difference between the waves entering at the top of the slit and the center of the
          slit must be <InlineMath math="\frac{1}{2} \lambda" />. Setting point <InlineMath math="A" /> as the origin
          point for waves entering at the top of the slit and point <InlineMath math="B" /> as the origin point for
          waves entering at the center of the slit, we can draw Figure 1.2 below.{" "}
        </p>
        <div className="figure">
          {" "}
          <img
            src="/src/pages/Lessons/assets/Figure1.2-CalculationOfFirstDiffractionMinimum-QuantumChemistry-IraLevine-p7.png"
            alt="Figure 1.2. Calculation of first diffraction minimum. Obtained from Quantum Chemistry 7th Edition (p. 7,
            Figure 1.2) by Ira N. Levine"
          />
          <p>
            Figure 1.2. Calculation of first diffraction minimum. Obtained from Quantum Chemistry 7th Edition (p. 7,
            Figure 1.2) by Ira N. Levine{" "}
          </p>
        </div>

        <p>
          Now, we draw a point <InlineMath math="C" /> such that <InlineMath math="AD = CD" /> and we can now calculate
          the path length difference as <InlineMath math="BC" />. From the earlier condition that the path length
          difference must be equal to <InlineMath math="\frac{1}{2} \lambda" />, we can write the path length difference
          as:
        </p>
        <BlockMath math="\begin{equation} BC = \frac{1}{2} \lambda \end{equation}" />

        <p>
          Since the diffraction wall is placed far away compared to the width of the slit, the lines{" "}
          <InlineMath math="AD" /> and <InlineMath math="BD" /> are approximately parallel, so the angle{" "}
          <InlineMath math="\angle ACB \approx 90 \degree" />. This means that <InlineMath math="\triangle ABC" /> is a
          right triangle and using some trigonometry and the right triangle sine identity, we can notice that angle{" "}
          <InlineMath math="\angle CAB = \alpha" /> resulting in:
        </p>
        <BlockMath math="\begin{equation} BC = \frac{1}{2} w \sin{\alpha} \end{equation}" />
        <p>
          Combining our equations of <InlineMath math="BC" /> we can now write the following:
        </p>
        <BlockMath math="BC = BC"></BlockMath>
        <BlockMath math="\frac{1}{2} \lambda = \frac{1}{2} w \sin{\alpha}"></BlockMath>
        <BlockMath math="\begin{equation} \lambda = w \sin{\alpha} \end{equation}"></BlockMath>

        <p>
          {" "}
          Combining equation <InlineMath math="(1)" /> with equation <InlineMath math="(4)" />, we now have:{" "}
        </p>
        <BlockMath math="\Delta x \Delta p_{x} = p \lambda"></BlockMath>

        <p>
          {" "}
          And substituting in the de Broglie relation: <InlineMath math="\lambda = h / p" />{" "}
        </p>
        <BlockMath math="\Delta x \Delta p_{x} = p \frac{h}{p}"></BlockMath>
        <BlockMath math="\Delta x \Delta p_{x} = h"></BlockMath>
        <p>
          To account for the fact that our uncertainties were not rigorously defined in this experiment, our derived
          equation should actually be written as:{" "}
        </p>
        <BlockMath math="\begin{equation} \Delta x \Delta p_{x} \approx h \end{equation}"></BlockMath>
        <p>
          Since we don't actually know if there are any other constants, but we know that the uncertainty depends on{" "}
          <InlineMath math="h" /> and is roughly on the same order of magnitude as <InlineMath math="h" />.
        </p>
        <p>
          If we perform some more rigorous experiments, we can learn that the correct equation for the Heisenberg
          Uncertainty Principle is:
        </p>
        <div className="importantEquation">
          <BlockMath math="\begin{equation} \Delta x \Delta p_{x} \gt \frac{h}{4\pi} = \frac{\hbar}{2} \end{equation}"></BlockMath>
        </div>
        <p>
          {" "}
          This relation shows that the product of the uncertainties in the particle's position and momentum is
          proportional to Plank's constant <InlineMath math="h" /> and is a fixed quantity. Thus, any precision about a
          particle's position is met by a larger uncertainty in the particle's momentum. Thus, in the single slit
          experiment, by imposing a wall with a slit, we measure the photon's position, reducing the uncertainty in the
          photon's position. But, by performing the measurement the system was disturbed, resulting in an increase in
          the uncertainty in the photon's momentum.
        </p>
      </LessonSection>
      <LessonSection>
        <h2 id={"lesson3"}>1.3 A Simulation of the Single Slit Experiment</h2>
        <p>
          Below is a simulation of the diagram in Figure 1.1. Click on the "Controls" to control the diffraction slit
          width and observe how making the slit narrower (decreasing the uncertainty in position) causes the diffraction
          pattern to spread out (increasing the uncertainty in momentum) and visa versa.
        </p>
        <p>
          Click on the "Show Particle Simulation" to show the photons as particles and use the controls to begin a
          particle simulation to observe the distribution of photons on the photographic plate.
        </p>
      </LessonSection>
      <LessonTasksProvider initialTaskSections={LESSON_SECTIONS} chapterId={1} unitId={1}>
        <TasksPanel title={"Single Slit Diffraction"} />
        <SingleSlitSimulation />
      </LessonTasksProvider>
    </LessonLayout>
  );
}
