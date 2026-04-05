import LessonSection from "../LessonSection";
import "../styles/lessons.css";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import LessonLayout from "../LessonLayout";
import RigidRotorSimulation from "./simulationComponents/RigidRotorSimulation";
import { LessonTasksProvider } from "@/context/LessonTasks/LessonTasksProvider";
import { TasksPanel } from "@/context/LessonTasks/TasksPanel";

export default function Chapter4Unit1Page() {
  return (
    <LessonLayout>
      <h1 id="lesson1">Unit 4. The Two-Particle Rigid Rotor and Discrete Rotational Energy</h1>

      <LessonSection>
        <h2>4.1 The Rigid Rotor Model</h2>
        <p>
          In this section we will look at the <strong>two-particle rigid rotor</strong>. This is a system of two
          particles of masses <InlineMath math="m_1" /> and <InlineMath math="m_2" /> held at a fixed distance{" "}
          <InlineMath math="d" /> from each other by a rigid, massless rod. Because the distance between particles is fixed,
          the magnitude of the relative position vector <InlineMath math="\mathbf{r}" /> is constant:
        </p>
        <div className="importantEquation">
          <BlockMath math="|\mathbf{r}| = d" />
        </div>
        <p>
          Since the distance between the two particles cannot change, there is no radial motion and hence no radial
          kinetic energy. All of the kinetic energy of the system is therefore <strong>rotational</strong>. Furthermore,
          because the particles interact only through the rigid constraint and experience no external potential, the
          potential energy is zero everywhere:
        </p>{" "}
        <BlockMath math="V = 0" />
        <p>The total energy of the rotor is thus entirely kinetic rotational energy.</p>
        <p>
          The rigid rotor serves as a foundational model in quantum chemistry. It captures the essential physics of the
          rotation of a diatomic molecule, and its quantum mechanical solution reveals one of the central results of
          quantum mechanics: <strong>rotational energy is quantized</strong>. A molecule cannot rotate with any
          arbitrary energy but rather it is restricted to a discrete ladder of allowed energy levels.
        </p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson2">4.2 The Hamiltonian and the Reduced Mass</h2>
        <p>
          To set up the quantum mechanical problem, we first reduce the two-body system to an equivalent one-body
          problem using the <strong>reduced mass</strong>:
        </p>{" "}
        <div className="importantEquation">
          <BlockMath math="\mu = \frac{m_1 m_2}{m_1 + m_2}" />
        </div>
        <p>
          The reduced mass <InlineMath math="\mu" /> is a single effective mass that captures the inertia of the
          relative motion between <InlineMath math="m_1" /> and <InlineMath math="m_2" />. The problem is now
          mathematically equivalent to a single fictitious particle of mass <InlineMath math="\mu" /> moving in
          three-dimensional space, with its position described by the relative coordinates of <InlineMath math="m_1" />{" "}
          and <InlineMath math="m_2" />.
        </p>
        <p>The Hamiltonian operator for the internal (relative) motion of this "reduced-mass" particle is:</p>{" "}
        <div className="importantEquation">
          <BlockMath math="\hat{H} = -\frac{\hbar^2}{2\mu}\nabla^2" />
        </div>
        <p>
          where <InlineMath math="\nabla^2" /> is the Laplacian operator. Since <InlineMath math="V = 0" />, no
          potential energy term appears.
        </p>
        <p>
          Rather than working in Cartesian coordinates <InlineMath math="(x, y, z)" />, it is far more natural to use{" "}
          <strong>spherical coordinates</strong> <InlineMath math="(r, \theta, \phi)" />. In spherical coordinates, the
          Laplacian separates into a radial part and an angular part. Since the radial coordinate is fixed at{" "}
          <InlineMath math="r = d" />, the wave function depends only on the angular variables:
        </p>{" "}
        <BlockMath math="\psi = \psi(\theta, \phi)" />
        <p>
          All terms in the Laplacian involving <InlineMath math="r" />
          -derivatives correspond to radial kinetic energy. Because there is no radial motion, these terms vanish when
          acting on <InlineMath math="\psi(\theta, \phi)" /> and can be dropped from the Hamiltonian entirely.
        </p>
        <p>
          What remains is the angular part of the kinetic energy, which is precisely the square of the angular momentum
          operator <InlineMath math="\hat{L}^2" />. The Hamiltonian simplifies to:
        </p>{" "}
        <div className="importantEquation">
          <BlockMath math="\hat{H} = \frac{\hat{L}^2}{2\mu d^2}" />
        </div>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson3">4.3 The The Reduced Mass Moment of Inertia</h2>
        <p>
          Before solving for the energy eigenvalues, it is helpful to introduce the <strong>moment of inertia</strong>{" "}
          <InlineMath math="I" />, which plays the same role in rotational mechanics that mass plays in translational
          mechanics. For a system of <InlineMath math="n" /> particles, the moment of inertia about a chosen axis is
          defined as:
        </p>{" "}
        <div className="importantEquation">
          <BlockMath math="I \equiv \sum_{i=1}^{n} m_i r_i^2" />
        </div>
        <p>
          where <InlineMath math="m_i" /> is the mass of the <InlineMath math="i" />
          -th particle and <InlineMath math="r_i" /> is its perpendicular distance from the rotation axis.
        </p>
        <p>
          For the two-particle rigid rotor, we choose the rotation axis to pass through the{" "}
          <strong>center of mass</strong> and be perpendicular to the rod joining <InlineMath math="m_1" /> and{" "}
          <InlineMath math="m_2" />. If we place the center of mass at the origin with the rod along the{" "}
          <InlineMath math="x" />
          -axis, then:
        </p>
        <p>
          <InlineMath math="m_1" /> sits at <InlineMath math="(-r_1,\, 0,\, 0)" /> and <InlineMath math="m_2" /> sits at{" "}
          <InlineMath math="(r_2,\, 0,\, 0)" />, where the center-of-mass condition requires:
        </p>{" "}
        <BlockMath math="m_1 r_1 = m_2 r_2" />
        <p>The moment of inertia about this axis is then:</p> <BlockMath math="I = m_1 r_1^2 + m_2 r_2^2" />
        <p>
          Using the center-of-mass condition and the constraint <InlineMath math="d = r_1 + r_2" />, this simplifies
          elegantly to:
        </p>{" "}
        <div className="importantEquation">
          <BlockMath math="I = \mu d^2" />
        </div>
        <p>
          where <InlineMath math="\mu = m_1 m_2 / (m_1 + m_2)" /> is the reduced mass. With this substitution, the
          Hamiltonian becomes:
        </p>{" "}
        <div className="importantEquation">
          <BlockMath math="\hat{H} = \frac{\hat{L}^2}{2I}" />
        </div>
        <p>This is the standard form of the rigid rotor Hamiltonian expressed through the moment of inertia.</p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson4">4.4 Applying the Spherical Harmonics of the Schrödinger Equation</h2>
        <p>
          Since the rigid rotor is constrained to a sphere of radius <InlineMath math="d" />, the wave function depends
          only on <InlineMath math="\theta" /> and <InlineMath math="\phi" />. These angular wave functions are already
          well-known as the <strong>spherical harmonics</strong> <InlineMath math="Y_J^m(\theta, \phi)" />, where the
          quantum number <InlineMath math="J" /> (rather than <InlineMath math="\ell" />, to distinguish the rotational
          context) labels the total angular momentum, and <InlineMath math="m" /> labels its projection onto the{" "}
          <InlineMath math="z" />
          -axis:
        </p>
        <div className="importantEquation">
          <BlockMath math="\psi(\theta, \phi) = Y_J^m(\theta, \phi)" />
        </div>
        <p>
          The spherical harmonics are the eigenfunctions of <InlineMath math="\hat{L}^2" /> with eigenvalues:
        </p>{" "}
        <div className="importantEquation">
          <BlockMath math="\hat{L}^2\, Y_J^m(\theta,\phi) = J(J+1)\hbar^2\, Y_J^m(\theta,\phi)" />
        </div>
        <p>
          Substituting this into the Schrödinger equation <InlineMath math="\hat{H}\psi = E\psi" /> gives:
        </p>{" "}
        <BlockMath math="\frac{\hat{L}^2}{2I}\,Y_J^m = E\,Y_J^m" />
        <BlockMath math="\frac{J(J+1)\hbar^2}{2I}\,Y_J^m = E\,Y_J^m" />
        <p>Reading off the energy eigenvalue, the allowed rotational energies of the rigid rotor are:</p>{" "}
        <div className="importantEquation">
          <BlockMath math="E_J = \frac{J(J+1)\hbar^2}{2I}, \qquad J = 0,\, 1,\, 2,\, \ldots" />
        </div>
        <p>
          This is one of the central results of quantum mechanics applied to molecular rotation. The rotational energy
          is <strong>not continuous</strong> — it is restricted to the discrete set of values given by the formula
          above.
        </p>
        <p>
          Note also that for each value of <InlineMath math="J" />, the quantum number <InlineMath math="m" />
          can take the <InlineMath math="2J+1" /> integer values:
        </p>{" "}
        <BlockMath math="m = -J,\; -J+1,\; \ldots,\; J-1,\; J" />
        <p>
          All <InlineMath math="2J+1" /> states for a given <InlineMath math="J" /> share the same energy{" "}
          <InlineMath math="E_J" />, so each energy level is <InlineMath math="(2J+1)" />
          -fold degenerate.
        </p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson5">4.5 The Discrete Energy Spectrum</h2>
        <p>Let us examine the structure of the energy levels more carefully. The first few allowed energies are:</p>
        <p>
          For <InlineMath math="J = 0" />: the rotor is not rotating at all, and the energy is zero.
        </p>{" "}
        <div className="importantEquation">
          <BlockMath math="E_0 = \frac{0 \cdot 1 \cdot \hbar^2}{2I} = 0" />
        </div>
        <p>
          For <InlineMath math="J = 1" />: the first excited rotational level.
        </p>{" "}
        <div className="importantEquation">
          <BlockMath math="E_1 = \frac{1 \cdot 2 \cdot \hbar^2}{2I} = \frac{\hbar^2}{I}" />
        </div>
        <p>
          For <InlineMath math="J = 2" />:
        </p>{" "}
        <div className="importantEquation">
          <BlockMath math="E_2 = \frac{2 \cdot 3 \cdot \hbar^2}{2I} = \frac{3\hbar^2}{I}" />
        </div>
        <p>
          Notice that the energy levels are not equally spaced — the gap between successive levels <em>increases</em>{" "}
          with <InlineMath math="J" />:
        </p>{" "}
        <BlockMath math="\Delta E = E_{J+1} - E_J = \frac{\hbar^2}{2I}\left[(J+1)(J+2) - J(J+1)\right] = \frac{\hbar^2}{I}(J+1)" />
        <p>
          This increasing spacing is a hallmark of the rigid rotor and leads to the characteristic pattern observed in
          the <strong>microwave rotational spectra</strong> of diatomic molecules, where absorption lines appear at
          evenly spaced frequencies — a direct experimental confirmation that rotational energy is discrete.
        </p>
        <p>The full set of allowed energy levels can be written compactly as:</p>{" "}
        <div className="importantEquation">
          <BlockMath math="\boxed{E_J = \frac{J(J+1)\hbar^2}{2I}, \qquad J = 0, 1, 2, \ldots}" />
        </div>
        <p>
          with each level carrying a degeneracy of <InlineMath math="g_J = 2J + 1" />.
        </p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson6">4.6 A Simulation of the Two-Particle Rigid Rotor</h2>
        <p>
          The simulation below shows the two-particle rigid rotor in three dimensions. The two atoms (spheres) are held
          at a fixed distance and rotate about the rotor axis, shown by the white arrow. The orientation of the axis in
          space is controlled by the angles <InlineMath math="\Phi" /> and <InlineMath math="\theta" />, corresponding
          to the azimuthal and polar angles of the angular momentum vector in spherical coordinates.
        </p>
        <p>
          Observe how the rotor axis defines a fixed direction in space and the two atoms orbit around it. In quantum
          mechanics, this axis corresponds to the quantization axis of the angular momentum operator{" "}
          <InlineMath math="\hat{L}" />, and the projection of <InlineMath math="\hat{L}" /> onto this axis is given by
          the quantum number <InlineMath math="m" />.
        </p>
      </LessonSection>
      <LessonTasksProvider chapterId={4} unitId={6}>
        <TasksPanel title={"Superposition of Energy Eigenstates"} />
        <RigidRotorSimulation />
      </LessonTasksProvider>
    </LessonLayout>
  );
}
