import { useRef, useEffect, useState } from "react";
import "../../../styles/canvas.css";
import {
  drawDiffractionWall,
  drawReceptorWall,
  drawLightIntensityOnWall,
  animateParticles,
  blurIntersectionBetweenWaves,
  randomVelocityXY,
  drawLightIntensityCurve,
  type AnimationParams,
  type ParticlesOnWall,
  type ReceptorWall,
  type Particle,
} from "./Lesson2SimulationAnimations";

const ParticleComponent = ({ animationParams }: { animationParams: AnimationParams }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvasDimensions, diffractionWall, wavelength, contrast, speed } = animationParams;
  const backgroundColor = "rgba(26, 32, 44, 0.4)";
  const [particleCount, _setParticleCount] = useState(1000);
  const [particleSize, _setParticleSize] = useState(5);

  const particlesOnWallRef = useRef<ParticlesOnWall>({
    particlePositions: Array(canvasDimensions.height).fill(0),
    totalParticles: 0,
  });

  const [receptorWall, _setReceptorWall] = useState<ReceptorWall>({
    x: canvasDimensions.width * 0.8,
    width: canvasDimensions.width - canvasDimensions.width * 0.8,
    color: "rgba(255, 255, 255, 1)",
  });

  const animationFrameRef = useRef<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const slitMinimum = 60;
  const slitMaximum = 250;
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const newParticlePositionY =
        diffractionWall.slitSize * (Math.random() - 0.5) + canvasDimensions.height / 2;
      const speed = randomVelocityXY(5, newParticlePositionY, animationParams);
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
  }, [
    canvasRef,
    animationParams,
    canvasDimensions,
    receptorWall,
    particleCount,
    particleSize,
    diffractionWall.x,
    diffractionWall.wallWidth,
    diffractionWall.slitSize,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;


    const animate = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      blurIntersectionBetweenWaves(ctx, canvasRef.current, animationParams);
      drawDiffractionWall(ctx, animationParams);
      drawReceptorWall(ctx, animationParams);

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
      drawLightIntensityOnWall(ctx, particlesOnWallRef.current, animationParams);

      animationFrameRef.current = requestAnimationFrame(animate);
      drawLightIntensityCurve(ctx, animationParams);
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
    canvasRef,
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
    <div>
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
  );
};

export default ParticleComponent;
