import Lesson2_Unit1_Simulation from "./simulationComponents/Lesson2_Unit1_Simulation";
import LessonSection from "../LessonSection";
import "../styles/lessons.css";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

export default function Lesson2_Unit1_Page() {
  return (
    <div className="lessonPage">
      <h1>Unit 2. Particles in 1-Dimensional Box</h1>
      <LessonSection>
        <h2>2.1 Single Particle in a 1-Dimensional Box</h2>
        <p>
          This section covers the derivation of the probablity density function a single particle in a 1D box with
          length <InlineMath math="l" /> by solving the time-dependent Schrödinger equation. We will focus on the
          derivation of the probablity density within the center of the well because it is the most interesting, and the
          the probability density outside the well can be shown to be zero. The derivation of the probablity density
          outside the well can found on page 23 in Quantum Chemistry 7th Edition by Ira Levine.
        </p>

        <p>
          In order to derive the probablity density function <InlineMath math="|\Psi(x)|^2"></InlineMath>, we will first
          need to solve for the state function <InlineMath math="\psi(x)"></InlineMath>, beginning with the general form
          of the time-dependent Schrödinger equation..
          <BlockMath math="\left(-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}+V(x)\right)\psi_n(x)=E_n\psi_n(x)"></BlockMath>
          Since we are focusing on the region within the well where <InlineMath math="0<x<l" />, the potential energy is
          defined to be 0, so <InlineMath math="V(x)=0"></InlineMath>.
          <BlockMath math="\left(-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}+0\right)\psi_n(x)=E_n\psi_n(x)"></BlockMath>
          <BlockMath math="\begin{equation}-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}\psi_n(x)=E_n\psi_n(x)\end{equation}"></BlockMath>
        </p>
        <p>
          Performing further simplifications, we can show that this equation is a linear homogenous second-order
          differential equation with constant coefficents that follows the form:{" "}
          <InlineMath math="\frac{d^2y}{dx^2}+p\frac{dy}{dx}+qy=0"></InlineMath>.
          <BlockMath math="-\frac{\hbar^2}{2m}\frac{d^2}{dx^2}\psi_n(x)-E_n\psi_n(x)=0"></BlockMath>
          <BlockMath math="\frac{d^2}{dx^2}\psi_n(x)+\frac{2m}{\hbar^2}E_n\psi_n(x)=0"></BlockMath>
          <BlockMath math="\frac{d^2\psi_n(x)}{dx^2}+\frac{2m}{\hbar^2}E_n\psi_n(x)=0"></BlockMath>
          <BlockMath math="\frac{d^2\psi_n(x)}{dx^2}+p\frac{d\psi_n(x)}{dx}+q\psi_n(x)=0"></BlockMath>
          where <InlineMath math="p=0" /> and <InlineMath math="q=\frac{2m}{\hbar^2}E_n" />.
        </p>
        <p>
          Thus, because the equation is a linear homogenous second-order differential equation with constant coefficents
          where <InlineMath math="p=0" /> and <InlineMath math="q=\frac{2m}{\hbar^2}E_n" />, we can solve the auxillary
          equation <InlineMath math="s^2+ps+q=0" /> to find <InlineMath math="s_1" /> and <InlineMath math="s_2" />{" "}
          which are:
          <BlockMath math="s=+i\frac{\sqrt{2mE}}{\hbar}, -i\frac{\sqrt{2mE}}{\hbar}"></BlockMath>
          So, using the general solution of a linear homogenous second-order differential equation with constant
          coefficents and the values for <InlineMath math="s_1" /> and <InlineMath math="s_2" />:
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
          <BlockMath math="\begin{equation}\psi(x)=A\cos{\frac{\sqrt{2mE}}{\hbar}x}+B\sin{\frac{\sqrt{2mE}}{\hbar}x}\end{equation}" />
        </p>

        <p>
          Now to solve for the coefficents <InlineMath math="A" /> and <InlineMath math="B" /> we can apply the boundary
          conditions. Starting from the left of the well where <InlineMath math="x=0" />, the state function is{" "}
          <InlineMath math="\psi_{left}=0"></InlineMath> which must be continuous with the state function in the center{" "}
          <InlineMath math="\psi_{center}"></InlineMath> so:
          <BlockMath
            math="\begin{align*}
                  \lim_{x\to 0}\psi_{left} &= \lim_{x\to 0}\psi_{center}\\[4pt]
                  0 &= \lim_{x\to 0}\left\{\,A\cos\left[\frac{\sqrt{2mE}}{\hbar}\,x\right]
                  \;+\;B\sin\left[\frac{\sqrt{2mE}}{\hbar}\,x\right]\,\right\}\\[4pt]
                  0 &= A\end{align*}"
          ></BlockMath>
          and the state function can be simplified to
          <BlockMath math="\begin{equation}\psi(x)=B\sin{\frac{\sqrt{2mE}}{\hbar}x}\end{equation}" />
        </p>

        <p>
          Now solving for <InlineMath math="B" />, we can start by using the boundary condition on the right wall when{" "}
          <InlineMath math="x=l"></InlineMath>. Similar to the left wall,{" "}
          <InlineMath math="\psi_{right}=0"></InlineMath> which must be continuous with the state function in the center{" "}
          <InlineMath math="\psi_{center}"></InlineMath> so:
        </p>
        <BlockMath
          math="\begin{align*}
                  \lim_{x\to 0}\psi_{right} &= \lim_{x\to 0}\psi_{center}\\[4pt]
                  0 &= B\sin{\frac{\sqrt{2mE}}{\hbar}l}\end{align*}"
        />

        <p>
          Since the zeros of the sine function occur at integer multiples of <InlineMath math="\pi" />,
          <BlockMath math="\frac{\sqrt{2mE}}{\hbar}l=\pm n\pi" />
          <BlockMath math="\frac{\sqrt{2mE}}{\hbar}=\frac{\pm n\pi}{l}" />
          and subbing this back into the state function in equation <InlineMath math="(4)" />:
          <BlockMath math="\begin{equation}\psi(x)=B\sin{\frac{n\pi}{l}x}\end{equation}" />
        </p>

        <p>
          Although is appears as though <InlineMath math="B"></InlineMath> has not yet been solved from our previous
          work, since the state function now depends on the length of the box <InlineMath math="l" />, we use the
          normalization of the probablity density function to solve for <InlineMath math="B"></InlineMath>.{" "}
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
          Thus subbing equation <InlineMath math="(7)" /> into equation <InlineMath math="(6)" />
          <BlockMath
            math="
          \begin{align*}
          |B|^2\frac{l}{2}&=1\\
          |B|&=\sqrt{\frac{2}{l}}\\\end{align*}"
          />
        </p>
        <p>
          Now the coefficient <InlineMath math="B"></InlineMath> has been found we can finally write the full state
          function and probablity density function:
          <BlockMath math="\begin{equation}\large\psi(x)=\sqrt{\frac{2}{l}}\sin{\left(\frac{n\pi x}{l}\right)}\end{equation}" />
          <BlockMath math="\begin{equation}\large |\bold{\Psi(x)}|^2=\frac{2}{l}\sin^2{\left(\frac{n\pi x}{l}\right)}\end{equation}" />
          where <InlineMath math="n = 1, 2, 3, \ldots" /> is the quantum number.
        </p>
      </LessonSection>

      <LessonSection>
        <h2>2.2 Simulation of a Particle in a 1-Dimensional Box</h2>
        <p>
          In order to better understand the node and antinode locations of the probablity density function, below is an
          interactive simulation of the particle in a box. Observe how modifying the quantum number{" "}
          <InlineMath math="n" /> changes the shape of the function and identify how the location of the nodes and antinodes move.
        </p>
      </LessonSection>

      <Lesson2_Unit1_Simulation />
    </div>
  );
}
