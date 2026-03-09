import LessonSection from "../LessonSection";
import "../styles/lessons.css";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import LessonLayout from "../LessonLayout";
import HydrogenSuperposition1s2pSimulation from "./simulationComponents/HydrogenSuperposition1s2pSimulation";

export default function Chapter6Unit1Page() {
  return (
    <LessonLayout>
      <h1 id="lesson1">Unit 6. Superposition of the 1s and 2p States of the Hydrogen Atom</h1>

      <LessonSection>
        <h2>6.1 Deriving the 1s State from the Radial Factor</h2>

        <p>
          We derived the 1s spatial wavefunction in Chapter 5.1, but we will derive it again as review. The spatial wavefunction is written in spherical coordinates as the product of a radial factor
          and an angular factor:
        </p>

        <div className="importantEquation">
          <BlockMath math="\psi_{nlm}(r,\theta,\phi)=R_{nl}(r)\,Y_l^m(\theta,\phi)" />
        </div>

        <p>
          For the <InlineMath math="1s" /> state, the quantum numbers are <InlineMath math="n=1,\;l=0,\;m=0" />, and we
          are given the radial factor
        </p>

        <BlockMath math="R_{1s}(r)=2\left(\frac{Z}{a_0}\right)^{3/2}e^{-Zr/a_0}" />

        <p>
          where <InlineMath math="a_0" /> is the Bohr radius and <InlineMath math="Z" /> is the atomic number. The
          angular factor for <InlineMath math="l=0,\;m=0" /> is the spherical harmonic
        </p>

        <BlockMath math="Y_0^0(\theta,\phi)=\frac{1}{\sqrt{4\pi}}" />

        <p>
          So the full <InlineMath math="1s" /> wavefunction is obtained by multiplying the radial and angular parts:
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

        <p>Let</p>

        <BlockMath math="\alpha=\frac{2Z}{a_0}" />

        <p>Then the integral becomes</p>

        <BlockMath math="4\left(\frac{Z}{a_0}\right)^3\int_0^\infty r^2e^{-\alpha r}\,dr" />

        <p>Using the standard result</p>

        <BlockMath math="\int_0^\infty r^2e^{-\alpha r}\,dr=\frac{2}{\alpha^3}" />

        <p>we get</p>

        <BlockMath math="4\left(\frac{Z}{a_0}\right)^3\cdot\frac{2}{\left(2Z/a_0\right)^3}=4\left(\frac{Z}{a_0}\right)^3\cdot\frac{a_0^3}{4Z^3}=1" />

        <p>
          So the radial factor is properly normalized, and the probability density for the <InlineMath math="1s" />{" "}
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
        <h2 id="lesson2">6.2 Deriving the 2p State from the Radial Factor</h2>

        <p>
          For the specific <InlineMath math="2p" /> state used in this lesson, we take{" "}
          <InlineMath math="n=2,\;l=1,\;m=-1" />. The radial factor is the same for all <InlineMath math="2p" /> states:
        </p>

        <BlockMath math="R_{2p}(r)=\frac{1}{2\sqrt{6}}\left(\frac{Z}{a_0}\right)^{5/2}re^{-Zr/(2a_0)}" />

        <p>
          The angular factor is now the spherical harmonic for <InlineMath math="l=1,\;m=-1" />:
        </p>

        <BlockMath math="Y_1^{-1}(\theta,\phi)=\sqrt{\frac{3}{8\pi}}\sin\theta\,e^{-i\phi}" />

        <p>
          Therefore the full <InlineMath math="2p" /> wavefunction is
        </p>

        <div className="importantEquation">
          <BlockMath math="\psi_{2p}(r,\theta,\phi)=R_{2p}(r)Y_1^{-1}(\theta,\phi)" />
          <BlockMath math="\psi_{2p}(r,\theta,\phi)=\frac{1}{2\sqrt{6}}\left(\frac{Z}{a_0}\right)^{5/2}re^{-Zr/(2a_0)}\sqrt{\frac{3}{8\pi}}\sin\theta\,e^{-i\phi}" />
          <BlockMath math="\psi_{2p}(r,\theta,\phi)=\frac{1}{8\sqrt{\pi}}\left(\frac{Z}{a_0}\right)^{5/2}re^{-Zr/(2a_0)}\sin\theta\,e^{-i\phi}" />
        </div>

        <p>
          This is the same form as the expression used in the simulation: a radial factor multiplied by{" "}
          <InlineMath math="\sin\theta\,e^{-i\phi}" />, so unlike the <InlineMath math="2p_z" /> state, this orbital is{" "}
          <strong>complex</strong>.
        </p>

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

        <p>so the radial factor is normalized. The angular factor is also normalized over solid angle:</p>

        <BlockMath math="\int |Y_1^{-1}|^2\,d\Omega=\int_0^{2\pi}\int_0^\pi \frac{3}{8\pi}\sin^2\theta\sin\theta\,d\theta\,d\phi=1" />

        <p>
          Therefore the full <InlineMath math="2p" /> orbital is normalized.
        </p>

        <p>Squaring the wavefunction gives the probability density:</p>

        <div className="importantEquation">
          <BlockMath math="|\psi_{2p}(r,\theta,\phi)|^2=\frac{1}{64\pi}\left(\frac{Z}{a_0}\right)^5r^2e^{-Zr/a_0}\sin^2\theta" />
        </div>

        <p>
          Notice that the factor <InlineMath math="e^{-i\phi}" /> disappears when we take the magnitude squared, because{" "}
          <InlineMath math="|e^{-i\phi}|^2=1" />. So the probability density depends on <InlineMath math="r" /> and{" "}
          <InlineMath math="\theta" />, but not directly on <InlineMath math="\phi" />. However, the{" "}
          <InlineMath math="\phi" /> dependence will reappear in the <strong>interference term</strong> when this state
          is superposed with the <InlineMath math="1s" /> state.
        </p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson3">6.3 Superposition of the 1s and 2p States</h2>

        <p>
          Now suppose the electron is not in just one eigenstate, but in a superposition of the <InlineMath math="1s" />{" "}
          and <InlineMath math="2p" /> states. The general form is
        </p>

        <div className="importantEquation">
          <BlockMath math="\Psi(\mathbf{r},t)=c_{1s}\psi_{1s}(\mathbf{r})e^{-iE_{1s}t/\hbar}+c_{2p}\psi_{2p}(\mathbf{r})e^{-iE_{2p}t/\hbar}" />
        </div>

        <p>
          Because the <InlineMath math="2p" /> orbital contains the complex factor <InlineMath math="e^{-i\phi}" />, the
          interference term will depend on the azimuthal angle <InlineMath math="\phi" />.
        </p>

        <p>Start with</p>

        <BlockMath math="\psi_{2p}(r,\theta,\phi)=A(r,\theta)e^{-i\phi}" />

        <p>where</p>

        <BlockMath math="A(r,\theta)=\frac{1}{8\sqrt{\pi}}\left(\frac{Z}{a_0}\right)^{5/2}re^{-Zr/(2a_0)}\sin\theta" />

        <p>
          Since <InlineMath math="\psi_{1s}" /> is real, the probability density becomes
        </p>

        <BlockMath math="|\Psi(\mathbf{r},t)|^2=|c_{1s}|^2|\psi_{1s}|^2+|c_{2p}|^2|\psi_{2p}|^2+2|c_{1s}||c_{2p}|\psi_{1s}A(r,\theta)\cos\!\big(\Phi(t)-\phi\big)" />

        <p>where the time-dependent relative phase is</p>

        <BlockMath math="\Phi(t)=\frac{(E_{2p}-E_{1s})t}{\hbar}+\delta" />

        <p>
          and <InlineMath math="\delta" /> is any initial phase difference between the two states.
        </p>

        <p>Substituting the explicit hydrogen wavefunctions gives</p>

        <div className="importantEquation">
          <BlockMath
            math="|\Psi(\mathbf{r},t)|^2=
            |c_{1s}|^2\frac{1}{\pi}\left(\frac{Z}{a_0}\right)^3e^{-2Zr/a_0}
            +
            |c_{2p}|^2\frac{1}{64\pi}\left(\frac{Z}{a_0}\right)^5r^2e^{-Zr/a_0}\sin^2\theta
            +
            \frac{1}{4\pi}|c_{1s}||c_{2p}|\left(\frac{Z}{a_0}\right)^4re^{-3Zr/(2a_0)}\sin\theta\cos\!\big(\Phi(t)-\phi\big)"
          />
        </div>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson4">6.4 Simulation of 1s and 2p Superposition</h2>

        <p>
          Below is a simulation of the superposition of the <InlineMath math="1s" /> and complex{" "}
          <InlineMath math="2p" /> states. Because the <InlineMath math="2p" /> state contains the angular phase factor{" "}
          <InlineMath math="e^{-i\phi}" />, the interference depends on the azimuthal angle through{" "}
          <InlineMath math="\cos(\text{phase}-\phi)" />. As a result, changing the phase rotates the interference
          pattern around the nucleus instead of only stretching it along the <InlineMath math="z" />
          -axis as in the <InlineMath math="2p_z" /> case.
        </p>
      </LessonSection>

      <HydrogenSuperposition1s2pSimulation />
    </LessonLayout>
  );
}
