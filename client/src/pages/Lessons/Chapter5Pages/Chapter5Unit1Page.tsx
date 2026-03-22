import LessonSection from "../LessonSection";
import "../styles/lessons.css";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import LessonLayout from "../LessonLayout";
import HydrogenSuperposition1s2pzSimulation from "./simulationComponents/HydrogenSuperposition1s2pzSimulation";

export default function Chapter5Unit1Page() {
  return (
    <LessonLayout>
      <h1 id="lesson1">
        Unit 5. Superposition of the 1s and 2p<sub>z</sub> States of the Hydrogen Atom
      </h1>

      <LessonSection>
        <h2>5.1 Deriving the 1s State from the Radial Factor</h2>

        <p>
          For the hydrogen atom, the spatial wavefunction is written in spherical coordinates as the product of a radial
          factor and an angular factor:
        </p>

        <div className="importantEquation">
          <BlockMath math="\psi_{nlm}(r,\theta,\phi)=R_{nl}(r)\,Y_l^m(\theta,\phi)" />
        </div>

        <p>
          For the <InlineMath math="1s" /> state, the quantum numbers are <InlineMath math="n=1,\;l=0,\;m=0" />, and we
          are given the radial factor as:
        </p>

        <BlockMath math="R_{1s}(r)=2\left(\frac{Z}{a_0}\right)^{3/2}e^{-Zr/a_0}" />

        <p>
          where <InlineMath math="a_0" /> is the Bohr radius and <InlineMath math="Z" /> is the atomic number. The
          angular factor for <InlineMath math="l=0,\;m=0" /> is the spherical harmonic
        </p>

        <BlockMath math="Y_0^0(\theta,\phi)=\frac{1}{\sqrt{4\pi}}" />

        <p>
          So, the full <InlineMath math="1s" /> wavefunction is obtained by multiplying the radial and angular parts:
        </p>

        <div className="importantEquation">
          <BlockMath math="\psi_{1s}(r,\theta,\phi)=R_{1s}(r)Y_0^0(\theta,\phi)=2\left(\frac{Z}{a_0}\right)^{3/2}e^{-Zr/a_0}\cdot\frac{1}{\sqrt{4\pi}}" />
          <BlockMath math="\psi_{1s}(r)=\frac{1}{\sqrt{\pi}}\left(\frac{Z}{a_0}\right)^{3/2}e^{-Zr/a_0}" />
        </div>

        <p>To verify that this state is normalized, we use the normalization condition</p>

        <BlockMath math="\int |\psi_{1s}|^2\,d\tau=1" />

        <p>Since the wavefunction separates into radial and angular parts, the full integral becomes</p>

        <BlockMath math="\int |\psi_{1s}|^2\,d\tau=\left(\int_0^\infty |R_{1s}(r)|^2r^2\,dr\right)\left(\int |Y_0^0|^2\,d\Omega\right)" />

        <p>
          The spherical harmonic is already normalized, so <InlineMath math="\int |Y_0^0|^2\,d\Omega=1" />. Therefore,
          we only need to evaluate the radial integral:
        </p>

        <BlockMath math="\int_0^\infty |R_{1s}(r)|^2r^2\,dr=\int_0^\infty 4\left(\frac{Z}{a_0}\right)^3 e^{-2Zr/a_0}r^2\,dr" />

        <p>Factoring out the constants, our integral becomes:</p>

        <BlockMath math="4\left(\frac{Z}{a_0}\right)^3\int_0^\infty r^2e^{-2Zr/a_0}\,dr" />

        <p>
          {" "}
          If we let <InlineMath math="\frac{2Z}{a_0}=k" />, this integral has the form:
        </p>

        <BlockMath math="\int_0^\infty r^2e^{-kr}\,dr=\frac{2}{k^3}" />

        <p>
          So, the solution to our integral is:
        </p>
        <BlockMath math="4\left(\frac{Z}{a_0}\right)^3\int_0^\infty r^2e^{-2Zr/a_0}\,dr=4\left(\frac{Z}{a_0}\right)^3\cdot\frac{2}{\left(2Z/a_0\right)^3}" />

        <BlockMath math="=4\left(\frac{Z}{a_0}\right)^3\cdot\frac{a_0^3}{4Z^3}=1" />

        <p>
          Since <InlineMath math="\int |\psi_{1s}|^2\,d\tau=1" />, the radial factor is properly normalized, and the probability density for the <InlineMath math="1s" />{" "}
          state is
        </p>

        <div className="importantEquation">
          <BlockMath math="|\psi_{1s}(r)|^2=\frac{1}{\pi}\left(\frac{Z}{a_0}\right)^3e^{-2Zr/a_0}" />
        </div>

        <p>
          This density depends only on <InlineMath math="r" />, so the <InlineMath math="1s" /> orbital is spherically
          symmetric.
        </p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson2">
          5.2 Deriving the 2p<sub>z</sub> State from the Radial Factor
        </h2>

        <p>
          For the <InlineMath math="2p_z" /> state, the quantum numbers are <InlineMath math="n=2,\;l=1,\;m=0" />, and
          we are given the radial factor
        </p>

        <BlockMath math="R_{2p}(r)=\frac{1}{2\sqrt{6}}\left(\frac{Z}{a_0}\right)^{5/2}re^{-Zr/(2a_0)}" />

        <p>
          The angular factor for <InlineMath math="l=1,\;m=0" /> is
        </p>

        <BlockMath math="Y_1^0(\theta,\phi)=\sqrt{\frac{3}{4\pi}}\cos\theta" />

        <p>
          Therefore the full <InlineMath math="2p_z" /> wavefunction is
        </p>

        <div className="importantEquation">
          <BlockMath math="\psi_{2p_z}(r,\theta,\phi)=R_{2p}(r)Y_1^0(\theta,\phi)" />
          <BlockMath math="\psi_{2p_z}(r,\theta,\phi)=\frac{1}{2\sqrt{6}}\left(\frac{Z}{a_0}\right)^{5/2}re^{-Zr/(2a_0)}\sqrt{\frac{3}{4\pi}}\cos\theta" />
          <BlockMath math="\psi_{2p_z}(r,\theta)=\frac{1}{4\sqrt{2\pi}}\left(\frac{Z}{a_0}\right)^{5/2}re^{-Zr/(2a_0)}\cos\theta" />
        </div>

        <p>
          Since <InlineMath math="z=r\cos\theta" />, this may also be written in the common form
        </p>

        <BlockMath math="\psi_{2p_z}(r,\theta)=\frac{1}{4\sqrt{2\pi}}\left(\frac{Z}{a_0}\right)^{5/2}ze^{-Zr/(2a_0)}" />

        <p>To verify the radial normalization, we again evaluate</p>

        <BlockMath math="\int_0^\infty |R_{2p}(r)|^2r^2\,dr" />

        <p>Substituting the radial factor gives</p>

        <BlockMath math="\int_0^\infty \left[\frac{1}{2\sqrt{6}}\left(\frac{Z}{a_0}\right)^{5/2}re^{-Zr/(2a_0)}\right]^2r^2\,dr" />

        <BlockMath math="=\frac{1}{24}\left(\frac{Z}{a_0}\right)^5\int_0^\infty r^4e^{-Zr/a_0}\,dr" />

        <p>Using the standard result</p>

        <BlockMath math="\int_0^\infty r^4e^{-\alpha r}\,dr=\frac{4!}{\alpha^5}=\frac{24}{\alpha^5}" />

        <p>
          with <InlineMath math="\alpha=Z/a_0" />, we obtain
        </p>

        <BlockMath math="\frac{1}{24}\left(\frac{Z}{a_0}\right)^5\cdot\frac{24}{(Z/a_0)^5}=1" />

        <p>
          so the radial factor is normalized. Since <InlineMath math="Y_1^0" /> is also normalized over solid angle, the
          full <InlineMath math="2p_z" /> orbital is normalized.
        </p>

        <p>We can now square the wavefunction to write the probability density function:</p>

        <div className="importantEquation">
          <BlockMath math="|\psi_{2p_z}(r,\theta)|^2=\frac{1}{32\pi}\left(\frac{Z}{a_0}\right)^5r^2e^{-Zr/a_0}\cos^2\theta" />
        </div>

        <p>
          Here, unlike the <InlineMath math="1s" /> orbital, this density depends on angle as well as radius. The factor{" "}
          <InlineMath math="\cos^2\theta" /> creates the familiar two-lobed shape along the <InlineMath math="z" />
          -axis.
        </p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson3">
          5.3 Superposition of the 1s and 2p<sub>z</sub> States
        </h2>

        <p>
          Now suppose the electron is not in just one eigenstate, but in a superposition of the <InlineMath math="1s" />{" "}
          and <InlineMath math="2p_z" /> states. The general form is
        </p>

        <div className="importantEquation">
          <BlockMath math="\Psi(\mathbf{r},t)=c_{1s}\psi_{1s}(\mathbf{r})e^{-iE_{1s}t/\hbar}+c_{2p_z}\psi_{2p_z}(\mathbf{r})e^{-iE_{2p}t/\hbar}" />
        </div>

        <p>
          Because both spatial orbitals are real, the probability density is found by multiplying{" "}
          <InlineMath math="\Psi^*\Psi" /> and combining the two cross terms into a cosine:
        </p>

        <BlockMath math="|\Psi(\mathbf{r},t)|^2=|c_{1s}|^2|\psi_{1s}|^2+|c_{2p_z}|^2|\psi_{2p_z}|^2+2|c_{1s}||c_{2p_z}|\psi_{1s}\psi_{2p_z}\cos\!\big(\Delta\phi(t)\big)" />

        <p>where the relative phase is</p>

        <BlockMath math="\Delta\phi(t)=\frac{(E_{2p}-E_{1s})t}{\hbar}+\delta" />

        <p>
          and <InlineMath math="\delta" /> is any initial phase difference.
        </p>

        <p>Substituting the explicit hydrogen wavefunctions gives</p>

        <div className="importantEquation">
          <BlockMath
            math="|\Psi(\mathbf{r},t)|^2=
          |c_{1s}|^2\frac{1}{\pi}\left(\frac{Z}{a_0}\right)^3e^{-2Zr/a_0}
          +
          |c_{2p_z}|^2\frac{1}{32\pi}\left(\frac{Z}{a_0}\right)^5r^2e^{-Zr/a_0}\cos^2\theta
          +
          \frac{1}{2\sqrt{2}\pi}|c_{1s}||c_{2p_z}|\left(\frac{Z}{a_0}\right)^4re^{-3Zr/(2a_0)}\cos\theta\cos\!\big(\Delta\phi(t)\big)"
          />
        </div>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson4">
          5.4 Simulation of 1s and 2p<sub>z</sub> Superposition
        </h2>

        <p></p>
      </LessonSection>
      <HydrogenSuperposition1s2pzSimulation />
    </LessonLayout>
  );
}
