import React, { useRef, useEffect, useState } from "react";
import "../../styles/canvas.css";
import Slider from "@/components/simulationControls/Slider";
import SimulationControls from "@/components/simulationControls/SimulationControls";

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
    slitWidth: 100,
    wallWidth: 50,
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
  const slitMiniumum = 25;
  const slitMaxiumum = 900;
  const controllableSimulationVariables: React.ReactNode[] = [
    <Slider
      key={"1"}
      value={[diffractionWall.slitWidth]}
      onValueChange={handleDiffractionSlitWidth}
      label="Diffraction"
      min={slitMiniumum}
      max={slitMaxiumum}
    />,
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawDiffractionWall = () => {
      const x = diffractionWall.x;
      const diffractionWallWidth = diffractionWall.wallWidth;
      const diffractionSlitWidth = diffractionWall.slitWidth;

      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(
        x,
        0,
        diffractionWallWidth,
        canvasDimensions.height / 2 - diffractionSlitWidth / 2,
      );
      ctx.fillRect(
        x,
        canvasDimensions.height / 2 + diffractionSlitWidth / 2,
        diffractionWallWidth,
        canvasDimensions.height,
      );
    };

    const drawReceptorWall = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 1)";
      ctx.fillRect(
        receptorWall.x,
        0,
        receptorWall.width,
        canvasDimensions.height,
      );
    };

    const scalefactor = 30;
    const getLightIntensity = (y: number) => {
      const diffractionSlitWidth =
        4 *
        ((diffractionWall.slitWidth - slitMiniumum + 10) /
          (slitMaxiumum - slitMiniumum));
      y = y - canvasDimensions.height / 2;
      return (
        200 *
        (Math.sin(diffractionSlitWidth * (y / scalefactor)) /
          (diffractionSlitWidth * (y / scalefactor))) **
          2
      );
    };

    const drawLightIntensity = () => {
      ctx.fillStyle = "rgba(255, 0, 0, 1)";
      for (let y = 0; y < canvasDimensions.height; y += 0.5) {
        const lightIntensity = getLightIntensity(y);
        ctx.fillRect(receptorWall.x, y, lightIntensity, 0.5);
      }
    };

    function makeRippleRenderer(
      width: number,
      height: number,
      rgb = [255, 231, 0],
    ) {
      // Cache ImageData + its data buffer
      const img = new ImageData(width, height);
      const data = img.data;

      // Fill RGB ONCE
      for (let p = 0; p < width * height; p++) {
        const i = p * 4;
        data[i + 0] = rgb[0];
        data[i + 1] = rgb[1];
        data[i + 2] = rgb[2];
        data[i + 3] = 255; // initial alpha (will be overwritten each frame)
      }

      // Per-frame draw: update ONLY alpha bytes
      return function draw(
        ctx: CanvasRenderingContext2D,
        tMs: number,
        x0: number,
        y0: number,
        freq = 0.8,
        speed = 2.0,
      ) {
        const time = (tMs / 1000) * speed;

        for (let y = 0; y < height; y++) {
          const row = y * width; // precompute row offset
          for (let x = 0; x < width; x++) {
            const p = row + x; // pixel index
            const i = p * 4; // byte index

            // compute alpha (ensure it's 0..255 integer)
            const a = getWaveAmplitude(x, y, time); // ideally returns 0..255
            data[i + 3] = a;
          }
        }

        ctx.putImageData(img, x0, y0);
      };
    }

    const wavelength = 10;
    const period = 10;
    const slitTop = canvasDimensions.height / 2 - diffractionWall.slitWidth / 2;
    const slitBottom =
      canvasDimensions.height / 2 + diffractionWall.slitWidth / 2;
    const _iterations = (slitBottom - slitTop) / 10;

    const getWaveAmplitude = (x: number, y: number, time: number) => {
      let waveAmplitude = 0.0;
      for (
        let waveSourcePoint = slitTop;
        waveSourcePoint < slitBottom;
        waveSourcePoint += 100
      ) {
        const radius = Math.sqrt(
          (x - waveSourcePoint) * (x - waveSourcePoint) +
            (y - slitTop) * (y - slitTop),
        );
        const wn = (2.0 * Math.PI * radius) / wavelength;
        const omegat = (2.0 * Math.PI * time) / period;
        const inclinationFactor = 1.0 + (slitTop - y) / (radius + 0.001);
        waveAmplitude += Math.cos(wn - omegat - 0.785398) * inclinationFactor;
      }
      return Math.min(Math.max(waveAmplitude*50, 0), 255);
    };

    const drawCircularRipple = makeRippleRenderer(
      receptorWall.x - diffractionWall.x - diffractionWall.wallWidth,
      canvasDimensions.height,
      [255, 231, 0],
    );

    const tMs = 0;

    const animate = (tMs: number) => {
      // Clear canvas with a slight trail effect
      ctx.fillStyle = "rgba(26, 32, 44, 0.4)";
      ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      if (!isPaused) {
        //drawLightBeamRipple(ctx, tMs, 0, 0, 0.03, 1.0);
        drawDiffractionWall();
        drawReceptorWall();
        drawLightIntensity();
        drawCircularRipple(
          ctx,
          tMs,
          diffractionWall.x + diffractionWall.wallWidth,
          0,
          0.03,
          10.0,
        );
        tMs += 1;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate(tMs);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    diffractionWall.slitWidth,
    diffractionWall.x,
    diffractionWall.wallWidth,
    receptorWall.width,
    receptorWall.x,
    canvasDimensions.width,
    canvasDimensions.height,
    isPaused,
  ]);

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
