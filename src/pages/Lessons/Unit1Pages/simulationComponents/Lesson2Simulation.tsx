import React, { useRef, useEffect, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface DiffractionWall {
  x: number;
  slitWidth: number;
  wallWidth: number;
}

interface ReceptorWall {
  x: number;
  width: number;
}

interface AnimatedCanvasProps {
  canvasWidth?: number;
  canvasHeight?: number;
  particleCount?: number;
}

const AnimatedCanvas: React.FC<AnimatedCanvasProps> = ({
  canvasWidth = 1200,
  canvasHeight = 600,
  particleCount = 200,
}) => {
  const beamWidth = canvasHeight * 0.10;
  const widthToReceptorWall = canvasWidth * 0.8;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const diffractionWallRef = useRef<DiffractionWall>({
    x: canvasWidth * 0.2,
    slitWidth: beamWidth,
    wallWidth: 10,
  });
  const ReceptorWall = useRef<ReceptorWall>({
    x: widthToReceptorWall,
    width: canvasWidth - widthToReceptorWall,
  });
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);
  const [isPaused, setIsPaused] = useState(false);

  // Initialize particles
  useEffect(() => {
    const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];

    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * widthToReceptorWall,
      y: Math.random() * beamWidth + canvasHeight / 2 - beamWidth / 2,
      vx: (Math.random() - 0.5) * 2,
      vy: 0,
      radius: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [widthToReceptorWall, canvasHeight, particleCount, beamWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateParticles = () => {
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (
          particle.x <= particle.radius ||
          particle.x >= widthToReceptorWall - particle.radius
        ) {
          particle.vx *= -1;
        }
        if (
          particle.y <= particle.radius ||
          particle.y >= canvasHeight - particle.radius
        ) {
          particle.vy *= -1;
        }

        // Keep within bounds
        particle.x = Math.max(
          particle.radius,
          Math.min(widthToReceptorWall - particle.radius, particle.x),
        );
        particle.y = Math.max(
          particle.radius,
          Math.min(canvasHeight - particle.radius, particle.y),
        );
      });
    };

    const drawParticles = () => {
      particlesRef.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
    };

    const drawDiffractionWall = () => {
      const x = diffractionWallRef.current.x;
      const diffractionWallWidth = diffractionWallRef.current.wallWidth;
      const diffractionSlitWidth = diffractionWallRef.current.slitWidth;

      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillRect(
        x,
        0,
        diffractionWallWidth,
        canvasHeight / 2 - diffractionSlitWidth/2,
      );
      ctx.fillRect(
        x,
        canvasHeight / 2 + diffractionSlitWidth/2,
        diffractionWallWidth,
        canvasHeight,
      );
    };

    const drawReceptorWall = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillRect(
        ReceptorWall.current.x,
        0,
        ReceptorWall.current.width,
        canvasHeight,
      );
    };
    
    
    const slitMiniumum = 10;
    const slitMaxiumum = 1000;
    const scalefactor = 30;
    const getLightIntensity = (y: number) => {
        const diffractionSlitWidth = (4*(((diffractionWallRef.current.slitWidth-slitMiniumum)/(slitMaxiumum-slitMiniumum))));
        console.log(diffractionSlitWidth)
        y = y-canvasHeight/2;
        return (200*(Math.sin(diffractionSlitWidth*(y/scalefactor))/(diffractionSlitWidth*(y/scalefactor)))**2)
    };

    const drawLightIntensity = () => {
      ctx.fillStyle = "rgba(255, 0, 0, 1)";
      for (let y = 0; y < canvasHeight; y += 0.5) {
        const lightIntensity = getLightIntensity(y);
        ctx.fillRect(ReceptorWall.current.x, y, lightIntensity, 0.5);
      }
    };

    const animate = () => {
      // Clear canvas with a slight trail effect
      ctx.fillStyle = "rgba(26, 32, 44, 0.4)";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      if (!isPaused) {
        updateParticles();
      }

      drawParticles();
      drawDiffractionWall();
      drawReceptorWall();
      drawLightIntensity();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initial background
    ctx.fillStyle = "#1a202c";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [widthToReceptorWall, canvasWidth, canvasHeight, isPaused, beamWidth]);

  const handleCanvasClick = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onClick={handleCanvasClick}
        style={{
          border: "2px solid #4A5568",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
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
