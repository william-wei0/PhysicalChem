import React, { useRef, useEffect, useState } from "react";
import "../../styles/canvas.css";
import Slider from "@/components/simulationControls/Slider";
import SimulationControls from "@/components/simulationControls/SimulationControls";
import {
  makeInitialRippleRenderer,
  makeRippleRenderer,
  drawDiffractionWall,
  drawReceptorWall,
  drawLightIntensityOnWall,
  type AnimationParams,
} from './Lesson2SimulationAnimations';


interface DiffractionWall {
  x: number;
  slitWidth: number;
  wallWidth: number;
}

interface ReceptorWall {
  x: number;
  width: number;
}

const AnimatedCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasDimensions, _setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [diffractionWall, setdiffractionWall] = useState<DiffractionWall>({
    x: canvasDimensions.width * 0.2,
    slitWidth: 20,
    wallWidth: 20,
  });

  const handleDiffractionSlitWidth = (wallWidth: number[]) => {
    setdiffractionWall({ ...diffractionWall, slitWidth: wallWidth[0] });
  };

  const [receptorWall, _setReceptorWall] = useState<ReceptorWall>({
    x: canvasDimensions.width * 0.8,
    width: canvasDimensions.width - canvasDimensions.width * 0.8,
  });

  const animationFrameRef = useRef<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const slitMinimum = 5;
  const slitMaximum = 250;
  const controllableSimulationVariables: React.ReactNode[] = [
    <Slider
      key={"1"}
      value={[diffractionWall.slitWidth]}
      onValueChange={handleDiffractionSlitWidth}
      label="Diffraction"
      min={slitMinimum}
      max={slitMaximum}
    />,
  ];


useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const animationParams: AnimationParams = {
    diffractionWall,
    receptorWall,
    canvasDimensions,
    slitMinimum,
    slitMaximum,
  };

  const drawCircularRipple = makeRippleRenderer(
    175 * 2,
    150 * 2,
    receptorWall.x - diffractionWall.x - diffractionWall.wallWidth,
    canvasDimensions.height,
    [255, 231, 0]
  );

  const drawInitialWaveRipple = makeInitialRippleRenderer(
    100 * 3,
    246 * 3,
    diffractionWall.x,
    canvasDimensions.height,
    [255, 231, 0]
  );

  // Animation parameters
  const wavelength = 15;
  const speed = 0.5;

  const animate = (tMs: number) => {
    // Clear canvas with a slight trail effect
    ctx.fillStyle = "rgba(26, 32, 44, 0.4)";
    ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);

    if (!isPaused) {
      drawInitialWaveRipple(
        ctx,
        tMs,
        0,
        0,
        (wavelength * 3) / 2,
        speed,
        animationParams
      );
      
      drawCircularRipple(
        ctx,
        tMs,
        diffractionWall.x,
        0,
        wavelength,
        speed,
        animationParams
      );
      
      drawDiffractionWall(ctx, animationParams);
      drawReceptorWall(ctx, animationParams);
      drawLightIntensityOnWall(ctx, animationParams);
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  animationFrameRef.current = requestAnimationFrame(animate);

  return () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };
}, [diffractionWall, receptorWall, canvasDimensions, isPaused, slitMinimum, slitMaximum]);

  const handleCanvasClick = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div ref={containerRef} className="simulation-container">
      <SimulationControls
        controllableSimulationVariables={controllableSimulationVariables}
      />
      <canvas
        ref={canvasRef}
        width={canvasDimensions.width}
        height={canvasDimensions.height}
        onClick={handleCanvasClick}
        style={{
          border: "2px solid #4A5568",
          borderRadius: "8px",
          cursor: "pointer",
          backgroundColor: "#1a202c",
          width: "100%",
          height: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "rgba(0, 0, 0, 0.5)",
          color: "white",
          padding: "8px 12px",
          borderRadius: "4px",
          fontSize: "12px",
        }}
      >
        {isPaused ? "Paused (click to resume)" : "Click to pause"}
      </div>
    </div>
  );
};

export default AnimatedCanvas;
