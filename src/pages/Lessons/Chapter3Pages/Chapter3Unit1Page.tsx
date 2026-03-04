import LessonSection from "../LessonSection";
import "../styles/lessons.css";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import LessonLayout from "../LessonLayout";
import TwoParticleWellSimulation from "./simulationComponents/TwoParticleWellSimulation";

export default function Chapter3Unit1Page() {
  return (
    <LessonLayout>
      <h1 id="lesson4">Unit 3. Superposition of Energy Eigenstates in a 1-Dimensional Box</h1>

      <LessonSection>
        <h2>3.1 Energy Eigenstates vs. Superpositions</h2>
        <p>
          From Chapter 2, by solving the time-independent Schrödinger equation, we have derived the spatial wavefunction
          (also known as the stationary state) <InlineMath math="\psi(x)"></InlineMath>
          and showed that probability of finding a particle in a given location in an infinite well is given by a family
          of equations according to the particle's quantum number <InlineMath math="n"></InlineMath>.
          <div className="importantEquation">
            <BlockMath math="\psi_n(x)=\sqrt{\frac{2}{a}}\sin\!\left(\frac{n\pi x}{a}\right),\quad n=1,2,3,\ldots" />
          </div>
        </p>
        <p>
          Since these stationary states are solutions to particle's wavefunctions at specific quantum numbers{" "}
          <InlineMath math="n"></InlineMath>, and because a particle's energy depends on its quantum number, we call the
          wavefunction at a specific quantum number <InlineMath math="n"></InlineMath>, the energy eigenstate.
        </p>
        <p>
          However, a real quantum particle does not always only exist as one energy eigenstate but rather a
          superposition of multiple energy eigenstates which is the weighted sum of each of the particle's energy eigenstate.
          <BlockMath math="\Psi(x,t)=\sum_{k=1}^{\infty} c_k\,\psi_k(x)\phi_k(t)" />
          Furthermore, real particles are also not only governed by the wavefunction{" "}
          <InlineMath math="\psi(x)"></InlineMath> but also depends on time, as shown in the general form of the
          time-dependent Schrödinger equation where the full wavefunction is <InlineMath math="\Psi(x,t)"></InlineMath>.
          <BlockMath math="i\hbar\frac{\partial \Psi(x,t)}{\partial t}=\bm{\hat{H}}\Psi(x,t)" />
        </p>

        <p>
          In the following section, we will explore the time-dependence of the particle in a box and why we could both
          separate the wavefunction into separate spatial and temporal wavefunction, and also ignore the temporal
          wavefunction for particle in a box when considering a single energy level.
        </p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson2">3.2 Separation of Position and Time Variables</h2>

        <p>
          To begin, we will start with the general form of the time-dependent Schrödinger equation for a particle in a
          box:
          <BlockMath math="i\hbar\frac{\partial \Psi(x,t)}{\partial t}=\left(-\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2}+V(x)\right)\Psi(x,t)" />
        </p>

        <p>
          First, notice that the Hamiltonian operator{" "}
          <InlineMath math="\hat{H}=-\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2}+V(x)" /> on the right of the
          equation depends only on <InlineMath math="x" />. While on the left, the time derivative acts only on{" "}
          <InlineMath math="t" />.
        </p>
        <p>
          {" "}
          This observation is important because if we assume a solution where the full wavefunction is a product of a
          spatial wavefunction and a temporal wavefunction, we can rearrange the equation to show that the spatial
          wavefunction and temporal wavefunction must equal a constant which is much easier to solve. So we will assume
          the full wavefunction has a spatial wavefunction <InlineMath math="\psi(x)"></InlineMath> and a temporal
          wavefunction <InlineMath math="\phi(t)"></InlineMath> with the form:
          <div className="importantEquation">
            <BlockMath math="\Psi(x,t)=\psi(x)\,\phi(t)" />
          </div>
        </p>

        <p>
          For example, if we substitute <InlineMath math="\Psi(x,t)=\psi(x)\phi(t)" /> into the Schrödinger equation and
          expand:
          <BlockMath math="i\hbar\,\frac{d(\psi(x)\phi(t))}{dt}=\left(-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}+V(x)\right)\psi(x)\phi(t)" />
          <BlockMath math="i\hbar\,\frac{d(\psi(x)\phi(t))}{dt}=\left(-\frac{\hbar^2}{2m}\frac{d^2\psi(x)\phi(t)}{dx^2}+V(x)\psi(x)\phi(t)\right)" />
        </p>
        <p>
          Now notice that the derivative on the left-hand side is a derivative with respect to time, so{" "}
          <InlineMath math="\psi(x)" /> is treated as a constant with respect to <InlineMath math="t" /> and can be
          factored out of the derivative. Similarly, on the right-hand side, <InlineMath math="\phi(t)" /> is treated as
          a constant with respect to <InlineMath math="x" /> and can also be factored out, resulting in:{" "}
        </p>
        <p>
          <BlockMath math="i\hbar\,\psi(x)\frac{d\phi(t)}{dt}=\left(-\frac{\hbar^2}{2m}\frac{d^2\psi(x)}{dx^2}+V(x)\psi(x)\right)\phi(t)" />
          Now divide both sides by <InlineMath math="\psi(x)\phi(t)" /> to move all the <InlineMath math="\phi(t)" /> to
          the left-hand side, and all the <InlineMath math="\psi(x)" /> to the right (assuming the wavefunction is not
          zero):
          <BlockMath math="i\hbar\,\frac{1}{\phi(t)}\frac{d\phi(t)}{dt}=\frac{1}{\psi(x)}\left(-\frac{\hbar^2}{2m}\frac{d^2\psi(x)}{dx^2}+V(x)\psi(x)\right)" />
        </p>

        <p>
          Now we can make a key observation. Notice how the left side depends only on{" "}
          <InlineMath math="\textcolor{blue}t" /> and the right side depends only on{" "}
          <InlineMath math="\textcolor{red}x" />.
          <BlockMath math="i\hbar\,\frac{1}{\phi(\textcolor{blue}{t})}\frac{d\phi(\textcolor{blue}{t})}{d\textcolor{blue}{t}}=\frac{1}{\psi(\textcolor{red}{x})}\left(-\frac{\hbar^2}{2m}\frac{d^2\psi(\textcolor{red}{x})}{d\textcolor{red}{x}^2}+V(\textcolor{red}{x})\psi(\textcolor{red}{x})\right)" />
        </p>
        <p>
          The only way a function of time can equal a function of space for <em>all</em> <InlineMath math="x" /> and{" "}
          <InlineMath math="t" /> is if both sides are equal to the same constant. We call that constant the energy{" "}
          <InlineMath math="E" />, allowing us to write two ordinary differential equations which are much easier to
          solve:
          <div className="importantEquation">
            <BlockMath math="i\hbar\,\frac{1}{\phi(t)}\frac{d\phi(t)}{dt}=E,\qquad \frac{1}{\psi}\left(-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2}+V\psi\right)=E" />
          </div>
          The first equation is an ordinary differential equation that can be solved to find the temporal wavefunction
          and the second equation is exactly the <strong>time-independent Schrödinger equation</strong> we used in
          Chapter 2.
        </p>
        <p>
          These two equations are the reason why we assumed one possible solution to the full wavefunction is a product
          of a separate spatial wavefunction and temporal wavefunction. By assuming it was separable, we were able to
          derive these equations which are much easier to solve than the original partial differential equation. This
          does not guarantee that these are the only solutions to the full wavefunction, but they are possible
          solutions.
        </p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson3">
          3.3 Solving The Temporal Wavefunction <InlineMath math="\phi(t)" />
        </h2>

        <p>
          From Chapter 2, we already solved the time-independent Schrödinger equation. In this section, we will continue
          with the separation of variables and solve the time-only equation.
          <div className="importantEquation">
            <BlockMath math="i\hbar\,\frac{1}{\phi(t)}\frac{d\phi(t)}{dt}=E" />
          </div>
          We start by multiplying both sides by <InlineMath math="\phi" />:
          <BlockMath math="i\hbar\,\frac{d\phi}{dt}=E\,\phi" />
          and then isolate the derivative:
          <BlockMath math="\frac{d\phi}{dt}=-\frac{iE}{\hbar}\,\phi" />
        </p>

        <p>
          This is a first-order linear differential equation with constant coefficients which can be solved by
          separation of variables:
          <BlockMath math="\frac{1}{\phi}\,d\phi=-\frac{iE}{\hbar}\,dt" />
          and integrate both sides:
          <BlockMath math="\int \frac{1}{\phi}\,d\phi=\int -\frac{iE}{\hbar}\,dt" />
          <BlockMath math="\ln|\phi|=-\frac{iE}{\hbar}t + C" />
        </p>

        <p>
          Exponentiating both sides gives:
          <BlockMath math="\phi(t)=C'\,e^{-iEt/\hbar}" />
          where <InlineMath math="C'=e^C" /> is a constant which we can absorb into the overall coefficient of the full
          wavefunction. So the time dependence of an energy eigenstate is always:
          <BlockMath math="\phi_n(t)=e^{-iE_n t/\hbar}" />
        </p>

        <p>
          Putting the spatial and time parts together to generate the full wavefunction:
          <div className="importantEquation">
            <BlockMath math="\large\Psi_n(x,t)=\psi_n(x)\,e^{-iE_n t/\hbar}" />
          </div>
        </p>
        <p>
          *Notice how the temporal wavefunction is an exponential with no real component (it is purely imaginary). So,
          the magnitude of the temporal wavefunction for a single energy level always has magnitude 1, since{" "}
          <InlineMath math="|e^{-iAt}|=1" /> where <InlineMath math="A"></InlineMath> is any real number.
        </p>
        <p>
          When we combine this temporal wavefunction with the spatial wavefunction we found in Chapter 2 to produce the
          full wavefunction:
          <BlockMath math="\large\Psi_n(x,t)=\psi_n(x)\,e^{-iE_n t/\hbar}" />
          <BlockMath math="\large\Psi_n(x,t)=\psi_n(x)\cdot 1" />
          <BlockMath math="\large\Psi_n(x,t)=\psi_n(x)" />
          The full wavefunction is equivalent to the stationary state, meaning that the probability density of a single
          energy eigenstate <em>not</em> change over time, allowing us to ignore the temporal wavefunction. However,
          particles are not often found in a single energy state which is why we need the temporal wavefunction for
          other problems.
        </p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson4">3.4 Superposition in the Infinite Square Well</h2>

        <p>
          Real quantum particles are not restricted to being in only one eigenstate. In general, the particle can be in
          a <strong>superposition</strong> of multiple energy eigenstates described by the weighted sum of different
          wavefunctions at different energy levels <InlineMath math="k"></InlineMath>:
          <BlockMath math="\Psi(x,t)=\sum_{k=1}^{\infty} c_k\,\psi_k(x)\phi_k(t)" />
          The constants <InlineMath math="c_k" /> are called <em>probability amplitudes</em> where{" "}
          <InlineMath math="|c_k|^2" /> is the probability of measuring the energy <InlineMath math="E_k" />. Since they
          are probability amplitudes, they must also sum to 1 to satisfy the normalization condition, so:
          <BlockMath math="\sum_{k=1}^{\infty} |c_k|^2 = 1" />
        </p>

        <p>
          In section 3.3, we derived the temporal wavefunction for a particle in a box at different energy levels. This
          means that each wavefunction has a time-dependent phase <InlineMath math="e^{-iE_nt/\hbar}" /> but a{" "}
          <strong>time-independent</strong> probability density <InlineMath math="|\Psi(x,t)|^2" />. So when particles
          have a <strong>superposition</strong> of different energies, there is <strong>interference</strong> between
          the energy levels, and that interference can make the probability of finding a particle at a specific location{" "}
          <InlineMath math="|\Psi(x,t)|^2" /> change with time.
        </p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson6">3.5 Superposition of Two Energy States in the Infinite Square Well</h2>

        <p>
          To explore the interference, let's consider a simple superposition of just two energy eigenstates, labeled{" "}
          <InlineMath math="n" /> and <InlineMath math="m" />:
          <div className="importantEquation">
            <BlockMath math="\begin{equation}\Psi(x,t)=c_n\,\psi_n(x)\,e^{-iE_n t/\hbar}+c_m\,\psi_m(x)\,e^{-iE_m t/\hbar}\end{equation}" />
          </div>
          where the coefficients must satisfy <InlineMath math="|c_n|^2+|c_m|^2=1" />
        </p>

        <p>
          To observe the interference and how the probability of finding a particle at a specific location changes, we
          need to solve for the probability density which is <BlockMath math="|\Psi(x,t)|^2=\Psi^*(x,t)\Psi(x,t)" />.
        </p>

        <p>
          Start with multiplying <InlineMath math="\Psi^*\Psi" /> from equation <InlineMath math="(1)" /> term-by-term:
          <BlockMath
            math="\begin{aligned}
        |\Psi(x,t)|^2
        &=\Big(c_n^*\psi_n e^{iE_nt/\hbar}+c_m^*\psi_m e^{iE_mt/\hbar}\Big)
          \Big(c_n\psi_n e^{-iE_nt/\hbar}+c_m\psi_m e^{-iE_mt/\hbar}\Big)\\[6pt]
        &=|c_n|^2\,\psi_n^2 + |c_m|^2\,\psi_m^2
        + c_n c_m^*\,\psi_n\psi_m\,e^{-i(E_n-E_m)t/\hbar}
        + c_n^* c_m\,\psi_n\psi_m\,e^{+i(E_n-E_m)t/\hbar}.
        \end{aligned}"
          />
        </p>
        <p className="smallNote">
          (Note: <InlineMath math="\psi_n(x)" /> is real for the infinite well, so{" "}
          <InlineMath math="\psi_n^*(x)=\psi_n(x)" />
          .)
        </p>

        <p>
          The last two terms are complex conjugates of each other, so their sum is twice their real component, which we
          write as <InlineMath math="2\mathrm{Re}[\ldots]" />:
          <div className="importantEquation">
            <BlockMath
              math="\begin{equation}|\Psi(x,t)|^2
          =|c_n|^2\,\psi_n^2(x)+|c_m|^2\,\psi_m^2(x)
          +2\,\mathrm{Re}\!\left[c_n c_m^*\,\psi_n(x)\psi_m(x)\,e^{-i(E_n-E_m)t/\hbar}\right]\end{equation}"
            />
          </div>
        </p>

        <p>
          Now, we will focus on simplifying this last term. Write the complex coefficients in polar form (magnitude +
          phase):
          <BlockMath math="c_n=|c_n|\,e^{i\alpha_n},\qquad c_m=|c_m|\,e^{i\alpha_m}" />
          And find the complex conjugate of <InlineMath math="c_m^*" />:
          <BlockMath math="c_m^*=|c_m|\,e^{-i\alpha_m}" />
        </p>

        <p>
          Substituting these back inside <InlineMath math="\mathrm{Re}[\ldots]" />:
          <BlockMath
            math="c_n c_m^*\,\psi_n(x)\psi_m(x)\,e^{-i(E_n-E_m)t/\hbar}
    =\Big(|c_n|e^{i\alpha_n}\Big)\Big(|c_m|e^{-i\alpha_m}\Big)\psi_n(x)\psi_m(x)\,e^{-i(E_n-E_m)t/\hbar}"
          />
        </p>

        <p>
          Combining the magnitudes and exponentials:
          <BlockMath math="=|c_n||c_m|\,\psi_n(x)\psi_m(x)\,e^{\,i(\alpha_n-\alpha_m)}\,e^{-i(E_n-E_m)t/\hbar}" />
          <BlockMath math="\begin{equation}=|c_n||c_m|\,\psi_n(x)\psi_m(x)\,e^{-i\left(\frac{(E_n-E_m)t}{\hbar}-(\alpha_n-\alpha_m)\right)}\end{equation}" />
        </p>

        <p>
          To further simplify, if we let <InlineMath math="\theta=\frac{(E_n-E_m)t}{\hbar}+\alpha_n-\alpha_m" />, we can
          again use Euler's formula <InlineMath math="e^{-i\theta}=\cos\theta - i\sin\theta" />. So substituting{" "}
          <InlineMath math="\theta" /> into equation <InlineMath math="(3)" />:
          <BlockMath
            math="\begin{aligned}
                  &=|c_n||c_m|\,\psi_n(x)\psi_m(x)\,e^{-i\theta}\\[6pt]
                  &=|c_n||c_m|\,\psi_n(x)\psi_m(x)\big(\cos\theta-i\sin\theta\big),
                  \end{aligned}"
          />
        </p>

        <p>
          Since this term is contained within <InlineMath math="2\mathrm{Re}[\ldots]" />, we will only keep the real
          portion, resulting in:
          <BlockMath
            math="\mathrm{Re}\!\left[|c_n||c_m|\,\psi_n(x)\psi_m(x)\big(\cos\theta - i\sin\theta\big)\right]
    =|c_n||c_m|\,\psi_n(x)\psi_m(x)\cos\theta."
          />
        </p>

        <p>
          Finally substitute back <InlineMath math="\theta=\frac{(E_n-E_m)t}{\hbar}+\alpha_n-\alpha_m" /> and put it
          into <InlineMath math="|\Psi(x,t)|^2" />:
          <div className="importantEquation">
            <BlockMath
              math="|\Psi(x,t)|^2
      =|c_n|^2\,\psi_n^2(x)+|c_m|^2\,\psi_m^2(x)
      +2|c_n||c_m|\,\psi_n(x)\psi_m(x)\cos\!\left(\frac{(E_n-E_m)t}{\hbar}+\alpha_n-\alpha_m\right)."
            />
          </div>
        </p>

        <p>
          Finally, substituting the normalized spatial wavefunctions inside the box <InlineMath math="0&lt;x&lt;a" />{" "}
          from Chapter 2:
          <BlockMath math="\psi_n(x)=\sqrt{\frac{2}{a}}\sin\!\left(\frac{n\pi x}{a}\right),\quad n=1,2,3,\ldots" />
          <div className="importantEquation">
            <BlockMath
              math="\large\begin{equation}|\Psi(x,t)|^2
          =\frac{2}{a}\Bigg[
            |c_n|^2\sin^2\!\left(\frac{n\pi x}{a}\right)
            +|c_m|^2\sin^2\!\left(\frac{m\pi x}{a}\right)
            +2|c_n||c_m|\sin\!\left(\frac{n\pi x}{a}\right)\sin\!\left(\frac{m\pi x}{a}\right)
            \cos\!\left(\frac{(E_n-E_m)t}{\hbar}+\Delta\alpha\right)
          \Bigg]\end{equation}"
            />
          </div>
          This is the full wavefunction that describes the position of a particle within a box. Notice how the
          wavefunction is not simply the addition of the <InlineMath math="n" /> and <InlineMath math="m" />{" "}
          wavefunctions but rather also includes a cosine term which describes the interference of the two energy states
          over time. As a result, rather than simply being a stationary wavefunction, as observed in the stationary
          state of a single energy eigenstate, the wavefunction oscillates between the energy eigenstates over time
          according to a cosine term.
        </p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson5">3.5 Simulation of the Superposition of Two Energy States in the Infinite Square Well</h2>

        <p>
          Below a simulation of the superposition of two energy states in the infinite square well. Observe how changing
          the quantum numbers of <InlineMath math="n" /> and <InlineMath math="m" /> changes the shape of the wave and
          how the wave oscillates over time. Similarly, observe how changing the proportions of{" "}
          <InlineMath math="c_n" /> and <InlineMath math="c_m" /> shifts the probability towards the wavefunction with
          the high proportion.
        </p>
      </LessonSection>
      <TwoParticleWellSimulation />
    </LessonLayout>
  );
}
