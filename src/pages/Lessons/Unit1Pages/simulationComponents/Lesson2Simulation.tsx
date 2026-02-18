import React, { useRef, useEffect, useState, useMemo } from "react";
import "../../styles/canvas.css";
import Slider from "@/components/simulationControls/Slider";
import SimulationControls from "@/components/simulationControls/SimulationControls";
import {
  makeInitialRippleRenderer,
  makeRippleRenderer,
  drawDiffractionWall,
  drawReceptorWall,
  drawLightIntensityOnWall,
  animateParticles,
  blurIntersectionBetweenWaves,
  randomVelocityXY,
  drawLightIntensityCurve,
  type AnimationParams,
  type ParticlesOnWall,
  type DiffractionWall,
  type ReceptorWall,
  type Particle,
} from "./Lesson2SimulationAnimations";

const AnimatedCanvas = () => {
  const backgroundColor = "rgba(26, 32, 44, 0.4)";
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [wavelength, setWavelength] = useState([10]);
  const [speed, setSpeed] = useState([0.5]);
  const [contrast, setConstrast] = useState([1.2]);
  const [particleCount, _setParticleCount] = useState(1000);
  const [particleSize, _setParticleSize] = useState(3);

  const [canvasDimensions, _setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const particlesOnWallRef = useRef<ParticlesOnWall>({
    particlePositions: Array(canvasDimensions.height).fill(0),
    totalParticles: 0,
  });

  const [diffractionWall, setdiffractionWall] = useState<DiffractionWall>({
    x: canvasDimensions.width * 0.2,
    slitSize: 20,
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

  const animationFrameRef = useRef<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const slitMinimum = 5;
  const slitMaximum = 250;
  const particlesRef = useRef<Particle[]>([]);

  const animationParams = useMemo<AnimationParams>(() => ({
  diffractionWall,
  receptorWall,
  canvasDimensions,
  slitMinimum,
  slitMaximum,
  contrast,
  wavelength,
  }), [diffractionWall, receptorWall, canvasDimensions, slitMinimum, slitMaximum, contrast, wavelength]);


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
      min={5}
      max={20}
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
      const newParticlePositionY = diffractionWall.slitSize * (Math.random() - 0.5) + (canvasDimensions.height / 2);
      const speed = (randomVelocityXY(5, newParticlePositionY, animationParams))
      particles.push({
        x: diffractionWall.x + diffractionWall.wallWidth,
        y: newParticlePositionY,
        vx: speed[0],
        vy: speed[1],
        size: particleSize,
        hue: 51,
      });
    }
    particlesRef.current = particles;

    particlesOnWallRef.current.particlePositions.fill(0);
    particlesOnWallRef.current.totalParticles = 0;


  }, [animationParams, canvasDimensions, diffractionWall, receptorWall, particleCount, particleSize]);

  useEffect(() => {
    const lightColor = [0, 83, 250];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Create animation parameters object
    const scaleFactor = 4;
    // Initialize the renderer functions
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

    // Track time properly for pause/resume
    let startTime: number | null = null;
    let elapsedTime = 0;

    const animate = (timestamp: number) => {
      // Clear canvas with a slight trail effect
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);
      let currentTime = 0;

      if (!isPaused) {
        // Initialize start time on first frame or after unpause
        if (startTime === null) {
          startTime = timestamp;
        }

        // Calculate current animation time
        currentTime = elapsedTime + (timestamp - startTime);
      } else {
        // When paused, save elapsed time and reset start time
        if (startTime !== null) {
          elapsedTime += timestamp - startTime;
          startTime = null;
        }
      }
      drawInitialWaveRipple(
        ctx,
        currentTime,
        0,
        0,
        (wavelength[0] * 3) / 2,
        speed[0],
        animationParams,
      );

      drawCircularRipple(
        ctx,
        currentTime,
        diffractionWall.x,
        0,
        wavelength[0],
        speed[0],
        animationParams,
      );

      blurIntersectionBetweenWaves(ctx, canvasRef.current, animationParams);
      drawDiffractionWall(ctx, animationParams);
      drawReceptorWall(ctx, animationParams);
      

      const yPositionofParticlesOnWall = animateParticles(
        ctx,
        particlesRef.current,
        animationParams,
      );

      yPositionofParticlesOnWall.forEach((index) => {
        particlesOnWallRef.current.particlePositions[Math.round(index)] += 1
      })
      particlesOnWallRef.current.totalParticles += yPositionofParticlesOnWall.length;
      drawLightIntensityOnWall(ctx, particlesOnWallRef.current, animationParams);

      animationFrameRef.current = requestAnimationFrame(animate);
      drawLightIntensityCurve(ctx, animationParams)
    };

    // Start the animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    animationParams,
    diffractionWall,
    receptorWall,
    canvasDimensions,
    isPaused,
    slitMinimum,
    slitMaximum,
    speed,
    wavelength,
    contrast,
  ]);

  const handleCanvasClick = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div ref={containerRef} className="simulation-container">
      <SimulationControls controllableSimulationVariables={controllableSimulationVariables} />
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
