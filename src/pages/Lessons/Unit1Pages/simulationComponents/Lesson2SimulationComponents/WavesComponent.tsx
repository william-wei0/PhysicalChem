import { useRef, useEffect, useState } from "react";
import "../../../styles/canvas.css";
import {
  makeInitialRippleRenderer,
  makeRippleRenderer,
  drawDiffractionWall,
  drawReceptorWall,
  blurIntersectionBetweenWaves,
  drawLightIntensityCurve,
  type AnimationParams,
} from "./Lesson2SimulationAnimations";

const WavesComponent = ({ animationParams }: { animationParams: AnimationParams }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { canvasDimensions, diffractionWall, receptorWall, wavelength, contrast, speed } = animationParams;
  const backgroundColor = "rgba(26, 32, 44, 0.4)";

  const animationFrameRef = useRef<number>(0);

  const currentTime = useRef<number>(0);;
  const [isPaused, setIsPaused] = useState(false);


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


      if (!isPaused) {
        // Initialize start time on first frame or after unpause
        if (startTime === null) {
          startTime = timestamp;
        }

        // Calculate current animation time
        currentTime.current = elapsedTime + (timestamp - startTime);
      } else {
        // When paused, save elapsed time and reset start time
        if (startTime !== null) {
          elapsedTime += timestamp - startTime;
          startTime = null;
        }
      }
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
      drawDiffractionWall(ctx, animationParams);
      drawReceptorWall(ctx, animationParams);
      drawLightIntensityCurve(ctx, animationParams);
      animationFrameRef.current = requestAnimationFrame(animate);

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
    receptorWall,
    diffractionWall,
    canvasDimensions,
    isPaused,
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

export default WavesComponent;
