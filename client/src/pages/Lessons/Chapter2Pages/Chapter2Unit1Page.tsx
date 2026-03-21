import WavefunctionSimulation from "./simulationComponents/WavefunctionSimulation";
import WavefunctionSquaredSimulation from "./simulationComponents/WavefunctionSquaredSimulation";
import LessonSection from "../LessonSection";
import "../styles/lessons.css";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
import LessonLayout from "../LessonLayout";


export default function Chapter2Unit1Page() {
  return (
    <LessonLayout>
      <h1 id="lesson1">Unit 2. A Single Particle in 1-Dimensional Box</h1>
      <LessonSection>
        <h2>2.1 The Single Particle in a 1-Dimensional Box</h2>
        <p>
          This section covers the derivation of the probability density function a single particle in a 1D box with
          length <InlineMath math="l" /> by solving the time-independent Schrödinger equation. We will focus on the
          derivation of the probability density within the center of the well because it is the most interesting and the
          probability density outside the well is zero. The derivation of the probability density
          outside the well can found on page 23 in Quantum Chemistry 7th Edition by Ira Levine.
        </p>

        <p>
          In order to derive the probability density function <InlineMath math="|\Psi(x)|^2"></InlineMath>, we will first
          need to solve for the spatial wavefunction <InlineMath math="\psi(x)"></InlineMath>, beginning with the general form
          of the time-independent Schrödinger equation.
          <BlockMath math="\left(-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}+V(x)\right)\psi_n(x)=E_n\psi_n(x)"></BlockMath>
          Since we are focusing on the region within the well where <InlineMath math="0<x<l" />, the potential energy is
          defined to be 0, so <InlineMath math="V(x)=0"></InlineMath>.
          <BlockMath math="\left(-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}+0\right)\psi_n(x)=E_n\psi_n(x)"></BlockMath>
          <BlockMath math="\begin{equation}-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}\psi_n(x)=E_n\psi_n(x)\end{equation}"></BlockMath>
        </p>
        <p>
          Performing further simplifications, we can show that this equation is a linear homogenous second-order
          differential equation with constant coefficients that follows the form:{" "}
          <InlineMath math="\frac{d^2y}{dx^2}+p\frac{dy}{dx}+qy=0"></InlineMath>.
          <BlockMath math="-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}\psi_n(x)-E_n\psi_n(x)=0"></BlockMath>
          <BlockMath math="\frac{d^2}{dx^2}\psi_n(x)+\frac{2m}{\hbar^2}E_n\psi_n(x)=0"></BlockMath>
          <BlockMath math="\frac{d^2\psi_n(x)}{dx^2}+\frac{2m}{\hbar^2}E_n\psi_n(x)=0"></BlockMath>
          <BlockMath math="\frac{d^2\psi_n(x)}{dx^2}+p\frac{d\psi_n(x)}{dx}+q\psi_n(x)=0"></BlockMath>
          where <InlineMath math="p=0" /> and <InlineMath math="q=\frac{2m}{\hbar^2}E_n" />.
        </p>
        <p>
          Thus, because the equation is a linear homogenous second-order differential equation with constant coefficients
          where <InlineMath math="p=0" /> and <InlineMath math="q=\frac{2m}{\hbar^2}E_n" />, we can solve the auxiliary
          equation <InlineMath math="s^2+ps+q=0" /> to find <InlineMath math="s_1" /> and <InlineMath math="s_2" />{" "}
          which are:
          <BlockMath math="s=+i\frac{\sqrt{2mE}}{\hbar}, -i\frac{\sqrt{2mE}}{\hbar}"></BlockMath>
          So, using the general solution of a linear homogenous second-order differential equation with constant
          coefficients and the values for <InlineMath math="s_1" /> and <InlineMath math="s_2" />:
          <BlockMath math="\begin{equation}\psi(x)=c_1e^{\frac{i\sqrt{2mE}}{\hbar}x}+c_2e^{-i\frac{i\sqrt{2mE}}{\hbar}x}\end{equation}" />
          .
        </p>
        <p>
          To further simplify equation <InlineMath math="(2)"></InlineMath>, we can apply Euler's Identity if we set{" "}
          <InlineMath math="\frac{\sqrt{2mE}}{\hbar}x=\theta" />, so equation <InlineMath math="(2)"></InlineMath> now
          becomes: <BlockMath math="\psi(x)=c_1e^{i\theta}+c_2e^{-i\theta}" />
          And applying Euler's Identity: <InlineMath math="(e^{i\theta}=\cos{\theta}+i\sin{\theta})" />
          <BlockMath math="\psi(x)=c_1(\cos{\theta}+i\sin{\theta})+c_2(\cos{(-\theta)}+i\sin{(-\theta)})" />
          <BlockMath math="\psi(x)=c_1(\cos{\theta}+i\sin{\theta})+c_2(\cos{(\theta)}-i\sin{(\theta)})" />
          <BlockMath math="\psi(x)=c_1\cos{\theta}+c_1i\sin{\theta}+c_2\cos{(\theta)}-c_2i\sin{(\theta)}" />
          <BlockMath math="\psi(x)=(c_1+c_2)\cos{\theta}+(c_1i-c_2i)\sin{\theta}" />
          <BlockMath math="\psi(x)=A\cos{\theta}+B\sin{\theta}" />
        </p>
        <p>
          And converting back into our original variables where <InlineMath math="\theta=\frac{\sqrt{2mE}}{\hbar}x" />,
          we have found an equation for the wavefunction that only depends on the particle's position{" "}
          <InlineMath math="x"></InlineMath>. However, we still need to solve for the coefficients{" "}
          <InlineMath math="A"></InlineMath> and <InlineMath math="B"></InlineMath>.
          <div className="importantEquation">
            <BlockMath math="\begin{equation}\psi(x)=A\cos{\frac{\sqrt{2mE}}{\hbar}x}+B\sin{\frac{\sqrt{2mE}}{\hbar}x}\end{equation}" />
          </div>
        </p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson2">2.2 Applying Boundary Conditions</h2>
        <p className="relative">
          To solve for the coefficients <InlineMath math="A" /> and <InlineMath math="B" />, we can apply the boundary
          conditions of the well at <InlineMath math="x=0"></InlineMath> and <InlineMath math="x=l"></InlineMath>.
          Starting from the region to the left of the well where <InlineMath math="x\le 0" />, the wavefunction{" "}
          <InlineMath math="\psi_{left}=0"></InlineMath> because the potential{" "}
          <InlineMath math="V(x)=\infty"></InlineMath> which must also be continuous with the wavefunction in the center{" "}
          <InlineMath math="\psi_{center}"></InlineMath>. So, using this boundary condition, we can solve for{" "}
          <InlineMath math="A"></InlineMath>:
          <BlockMath
            math="\begin{align*}
                  \lim_{x\to 0}\psi_{left} &= \lim_{x\to 0}\psi_{center}\\[4pt]
                  0 &= \lim_{x\to 0}\left\{\,A\cos\left[\frac{\sqrt{2mE}}{\hbar}\,x\right]\;+\;B\sin\left[\frac{\sqrt{2mE}}{\hbar}\,x\right]\,\right\}\\[4pt]
                  0 &= {\,A\cos\left[\frac{\sqrt{2mE}}{\hbar}\,0\right]\;+\;B\sin\left[\frac{\sqrt{2mE}}{\hbar}\,0\right]\,}\\[4pt]
                  0 &= {\,A\cos\left[0\right]\;+\;B\sin\left[0\right]\,}\\[4pt]
                  0 &= {A(1)\;+\;B(0)}\\[4pt]
                  0 &= A\end{align*}"
          ></BlockMath>
        </p>

        <p>
          Subbing in <InlineMath math="A=0"></InlineMath> into equation <InlineMath math="(3)"></InlineMath>, the
          wavefunction in the center simplifies to
          <BlockMath math="\begin{equation}\psi(x)_{center}=B\sin{\frac{\sqrt{2mE}}{\hbar}x}\end{equation}" />
        </p>

        <p>
          Now solving for <InlineMath math="B" />, we can start by using the boundary condition on the right wall when{" "}
          <InlineMath math="x=l"></InlineMath>. Similar to the left wall,{" "}
          <InlineMath math="\psi_{right}=0"></InlineMath> which also must be continuous with the wavefunction in the
          center <InlineMath math="\psi_{center}"></InlineMath> so:
        </p>
        <BlockMath
          math="\begin{align*}
                  \lim_{x\to 0}\psi_{right} &= \lim_{x\to 0}\psi_{center}\\[4pt]
                  0 &= B\sin\left\{\frac{\sqrt{2mE}}{\hbar}l\right\}\end{align*}"
        />

        <p>
          Since the zeros of the sine function occur at all integer <InlineMath math="n" /> multiples of{" "}
          <InlineMath math="\pi" />, we can write that <InlineMath math="\frac{\sqrt{2mE}}{\hbar}l" /> must equal some
          integer multiple of <InlineMath math="\pi" />.
        </p>
        <p>So:</p>
        <p>
          <BlockMath math="\frac{\sqrt{2mE}}{\hbar}l=\pm n\pi" />
          <BlockMath math="\begin{equation}\frac{\sqrt{2mE}}{\hbar}=\frac{\pm n\pi}{l}\end{equation}" />
        </p>
        <p>
          where <InlineMath math="n = 1, 2, 3, \ldots" />
        </p>
        <p>
          and subbing equation <InlineMath math="(5)" /> back into equation <InlineMath math="(4)" /> results in a
          simplified version of equation <InlineMath math="(4)" /> that depends on the length of the box instead of the
          particle's energy.
          <BlockMath math="\begin{equation}\psi(x)=B\sin{\frac{n\pi}{l}x}\end{equation}" />
        </p>

        <p>
          Although is appears as though <InlineMath math="B"></InlineMath> has not yet been solved from our previous
          work, since the wavefunction now depends on the length of the box <InlineMath math="l" />, we use the
          normalization of the probability density function to solve for <InlineMath math="B"></InlineMath>.{" "}
          <BlockMath
            math="\begin{align}
          \int_{-\infty}^{\infty}|\Psi|^2\,dx&=1\notag\\
          \int_{-\infty}^{\infty}|\psi|^2\,dx&=1\notag\\[6pt]
          \int_{-\infty}^{0}|\psi_{left}|^2\,dx
          +\int_{0}^{l}|\psi_{center}|^2\,dx
          +\int_{l}^{\infty}|\psi_{right}|^2\,dx&=1\notag\\[6pt]
          |B|^2\int_{0}^{l}\sin^2\!\left(\frac{n\pi x}{l}\right)\,dx&=1\\\end{align}"
          ></BlockMath>
          Now to solve for <InlineMath math="\int_{0}^{l}\sin^2\!\left(\frac{n\pi x}{l}\right)\,dx" />:
          <BlockMath
            math="\begin{align}
          \int_{0}^{l}\sin^2\!\left(\frac{n\pi x}{l}\right)\,dx
          &=\int_{0}^{l}\frac{1-\cos\!\left(\frac{2n\pi x}{l}\right)}{2}\,dx\notag\\[6pt]
          &=\frac{1}{2}\left[\int_{0}^{l}1\,dx-\int_{0}^{l}\cos\!\left(\frac{2n\pi x}{l}\right)\,dx\right]\notag\\[6pt]
          &=\frac{1}{2}\left[x-\frac{l}{2n\pi}\sin\!\left(\frac{2n\pi x}{l}\right)\right]_{0}^{l}\notag\\[6pt]
          &=\frac{1}{2}\left(l-\frac{l}{2n\pi}\sin(2n\pi)\right)\notag\\
          \int_{0}^{l}\sin^2\!\left(\frac{n\pi x}{l}\right)\,dx&=\frac{l}{2}
          \end{align}"
          />
          Thus, subbing equation <InlineMath math="(7)" /> into equation <InlineMath math="(6)" />
          <BlockMath
            math="
          \begin{align*}
          |B|^2\frac{l}{2}&=1\\
          |B|&=\sqrt{\frac{2}{l}}\\\end{align*}"
          />
        </p>
        <p>
          Now the coefficient <InlineMath math="B"></InlineMath> has been found we can finally write the full spatial
          wavefunction and probability density function:
          <div className="importantEquation">
            <BlockMath math="\begin{equation}\large\psi(x)=\sqrt{\frac{2}{l}}\sin{\left(\frac{n\pi x}{l}\right)},\quad n=1,2,3,\ldots\end{equation}" />
            <BlockMath math="\begin{equation}\large |\bold{\Psi(x)}|^2=\frac{2}{l}\sin^2{\left(\frac{n\pi x}{l}\right)},\quad n=1,2,3,\ldots\end{equation}" />
          </div>
          where <InlineMath math="n = 1, 2, 3, \ldots" /> is the quantum number.
        </p>
      </LessonSection>

      <LessonSection>
        <h2 id="lesson3">2.3 A Simulation of a Particle in a 1-Dimensional Box</h2>
        <p>
          In order to better understand the node and antinode locations of the probability density function, below is an
          interactive simulation of the particle in a box. Observe how modifying the quantum number{" "}
          <InlineMath math="n" /> changes the shape of the function and identify how the location of the nodes and
          antinodes move.
        </p>
      </LessonSection>

      <WavefunctionSimulation />
      <WavefunctionSquaredSimulation />
    </LessonLayout>
  );
}
