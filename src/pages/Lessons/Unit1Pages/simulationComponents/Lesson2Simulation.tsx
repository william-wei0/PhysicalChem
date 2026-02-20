import React, { useRef, useState, useEffect, useMemo } from "react";
import "../../styles/canvas.css";
import Slider from "@/components/simulationControls/Slider";
import SimulationControls from "@/components/simulationControls/SimulationControls";
import {
  makeInitialRippleRenderer,
  makeRippleRenderer,
  drawDiffractionWall,
  blurIntersectionBetweenWaves,
  drawReceptorWall,
  drawLightIntensityCurve,
  animateParticles,
  drawLightIntensityOnWall,
  type AnimationParams,
  type DiffractionWall,
  type ReceptorWall,
  type Particle,
  type ParticlesOnWall,
} from "./Lesson2SimulationComponents/Lesson2SimulationAnimations";

const AnimatedCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundColor = "rgba(26, 32, 44, 0.4)";
  const slitMinimum = 60;
  const slitMaximum = 250;

  const animationFrameRef = useRef<number>(0);
  const currentTime = useRef<number>(0);
  const startTime = useRef<number | null>(null);
  const elapsedTime = useRef<number>(0);

  const [isWaveActive, setIsWavesActive] = useState(true);
  const [isParticleActive, setIsParticleActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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

  const [receptorWall, _setReceptorWall] = useState<ReceptorWall>({
    x: canvasDimensions.width * 0.8,
    width: canvasDimensions.width - canvasDimensions.width * 0.8,
    color: "rgba(255, 255, 255, 1)",
  });

  const particlesRef = useRef<Particle[]>([]);
  const [particleCount, _setParticleCount] = useState(1500);
  const [particleSize, _setParticleSize] = useState(5);

  const particlesOnWallRef = useRef<ParticlesOnWall>({
    particlePositions: Array(canvasDimensions.height).fill(0),
    totalParticles: 0,
  });

  const handleCanvasClick = () => {
    setIsPaused(!isPaused);
  };

  const handleDiffractionSlitWidth = (wallWidth: number[]) => {
    setdiffractionWall({ ...diffractionWall, slitSize: wallWidth[0] });
  };

  const animationParams = useMemo<AnimationParams>(
    () => ({
      diffractionWall,
      receptorWall,
      canvasDimensions,
      slitMinimum,
      slitMaximum,
      contrast,
      wavelength,
      speed,
    }),
    [
      diffractionWall,
      receptorWall,
      canvasDimensions,
      slitMinimum,
      slitMaximum,
      contrast,
      wavelength,
      speed,
    ],
  );

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: diffractionWall.x * Math.random(),
        y: canvasDimensions.height * Math.random(),
        vx: 5 * Math.random() + 2,
        vy: 5 * (Math.random() - 0.5),
        size: particleSize,
        hue: 51,
      });
    }
    particlesRef.current = particles;

    particlesOnWallRef.current.particlePositions.fill(0);
    particlesOnWallRef.current.totalParticles = 0;
  }, [
    canvasRef,
    animationParams,
    canvasDimensions,
    receptorWall,
    particleCount,
    particleSize,
    diffractionWall,
  ]);

  useEffect(() => {
    const lightColor = [0, 83, 250];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Render waves at 1/4 scale to improve performance
    const scaleFactor = 4;
    const drawCircularRipple = makeRippleRenderer(
      scaleFactor,
      receptorWall.x - diffractionWall.x - diffractionWall.wallWidth,
      canvasDimensions.height,
      lightColor,
    );

    const drawInitialWaveRipple = makeInitialRippleRenderer(
      scaleFactor,
      diffractionWall.x + diffractionWall.wallWidth / 2,
      canvasDimensions.height,
      lightColor,
    );

    const animate = (timestamp: number) => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      if (!isPaused) {
        if (startTime.current === null) {
          startTime.current = timestamp;
        }
        currentTime.current = elapsedTime.current + (timestamp - startTime.current);
      } else {
        if (startTime.current !== null) {
          elapsedTime.current += timestamp - startTime.current;
          startTime.current = null;
        }
      }

      if (isWaveActive) {
        drawInitialWaveRipple(
          ctx,
          currentTime.current,
          0,
          0,
          (wavelength[0] * 3) / 2,
          speed[0],
          animationParams,
        );

        drawCircularRipple(
          ctx,
          currentTime.current,
          diffractionWall.x,
          0,
          wavelength[0],
          speed[0],
          animationParams,
        );
        blurIntersectionBetweenWaves(ctx, canvasRef.current, animationParams);
      }

      if (isParticleActive) {
        const yPositionofParticlesOnWall = animateParticles(
          ctx,
          particlesRef.current,
          animationParams,
          isPaused,
        );

        yPositionofParticlesOnWall.forEach((index) => {
          particlesOnWallRef.current.particlePositions[Math.round(index)] += 1;
        });
        particlesOnWallRef.current.totalParticles += yPositionofParticlesOnWall.length;
      }


      drawDiffractionWall(ctx, animationParams);
      drawReceptorWall(ctx, animationParams);
      drawLightIntensityOnWall(ctx, particlesOnWallRef.current, animationParams);
      drawLightIntensityCurve(ctx, animationParams);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    isParticleActive,
    isWaveActive,
    canvasRef,
    animationParams,
    receptorWall,
    diffractionWall,
    canvasDimensions,
    isPaused,
    speed,
    wavelength,
    contrast,
  ]);

  return (
    <div>
      <button
        className="hover:cursor-pointer"
        onClick={() => {
          setIsWavesActive((prev) => !prev);
        }}
      >
        Waves
      </button>
      <button
        className="hover:cursor-pointer"
        onClick={() => {
          setIsParticleActive((prev) => !prev);
        }}
      >
        Particles
      </button>
      <div ref={containerRef} className="simulation-container">
        <SimulationControls controllableSimulationVariables={controllableSimulationVariables} />
        <canvas
          ref={canvasRef}
          width={canvasDimensions.width}
          height={canvasDimensions.height}
          onClick={handleCanvasClick}
          style={{
            border: "2px solid #4A5568",
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
    </div>
  );
};

export default AnimatedCanvas;
