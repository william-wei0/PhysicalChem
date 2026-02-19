import React, { useRef, useState, useMemo } from "react";
import "../../styles/canvas.css";
import Slider from "@/components/simulationControls/Slider";
import SimulationControls from "@/components/simulationControls/SimulationControls";
import WavesComponent from "./Lesson2SimulationComponents/WavesComponent";
import ParticleComponent from "./Lesson2SimulationComponents/ParticleComponent";
import {
  type AnimationParams,
  type DiffractionWall,
  type ReceptorWall,
} from "./Lesson2SimulationComponents/Lesson2SimulationAnimations";

type CanvasView = "Waves" | "Particles";

const AnimatedCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<CanvasView>("Particles")
  const [wavelength, setWavelength] = useState([50]);
  const [speed, setSpeed] = useState([0.5]);
  const [contrast, setConstrast] = useState([1.0]);
  const [canvasDimensions, _setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [diffractionWall, setdiffractionWall] = useState<DiffractionWall>({
    x: canvasDimensions.width * 0.2,
    slitSize: 125,
    wallWidth: 20,
    color: "rgba(255, 255, 255, 1)",
  });

  const handleDiffractionSlitWidth = (wallWidth: number[]) => {
    setdiffractionWall({ ...diffractionWall, slitSize: wallWidth[0] });
  };

  const [receptorWall, _setReceptorWall] = useState<ReceptorWall>({
    x: canvasDimensions.width * 0.8,
    width: canvasDimensions.width - canvasDimensions.width * 0.8,
    color: "rgba(255, 255, 255, 1)",
  });

  const slitMinimum = 60;
  const slitMaximum = 250;

  const animationParams = useMemo<AnimationParams>(() => ({
  diffractionWall,
  receptorWall,
  canvasDimensions,
  slitMinimum,
  slitMaximum,
  contrast,
  wavelength,
  speed,
  }), [diffractionWall, receptorWall, canvasDimensions, slitMinimum, slitMaximum, contrast, wavelength, speed]);


  const controllableSimulationVariables: React.ReactNode[] = [
    <Slider
      key={"Diffraction"}
      value={[diffractionWall.slitSize]}
      onValueChange={handleDiffractionSlitWidth}
      label="Diffraction Slit Size (nm)"
      min={slitMinimum}
      max={slitMaximum}
    />,
    <Slider
      key={"Wavelength"}
      value={wavelength}
      onValueChange={setWavelength}
      label="Wavelength"
      min={20}
      max={80}
      step={0.01}
    />,
    <Slider
      key={"Speed"}
      value={speed}
      onValueChange={setSpeed}
      label="Speed"
      min={0.1}
      max={4}
      step={0.01}
    />,
    <Slider
      key={"Contrast"}
      value={contrast}
      onValueChange={setConstrast}
      label="Constrast"
      min={0.1}
      max={2.5}
      step={0.01}
    />,
  ];

  return (
    <div>
      <button className="hover:cursor-pointer" onClick={() => {setView("Waves")}}> Waves </button>
      <button className="hover:cursor-pointer" onClick={() => {setView("Particles")}}> Particles </button>
      <div ref={containerRef} className="simulation-container">
        <SimulationControls controllableSimulationVariables={controllableSimulationVariables} />
        {view === "Waves" && <WavesComponent animationParams = {animationParams}/>}
        {view === "Particles" && <ParticleComponent animationParams = {animationParams}/>}
      </div>
    </div>
  );
};

export default AnimatedCanvas;
