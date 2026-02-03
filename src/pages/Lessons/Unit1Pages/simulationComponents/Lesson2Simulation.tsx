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
  const slitMiniumum = 5;
  const slitMaxiumum = 250;
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

    const drawLightIntensityOnWall = () => {
      ctx.fillStyle = "rgba(255, 0, 0, 1)";
      for (let y = 0; y < canvasDimensions.height; y += 0.5) {
        const lightIntensity = getLightIntensity(y);
        ctx.fillRect(receptorWall.x, y, lightIntensity, 0.5);
      }
    };

    function contrast255(x: number, c: number, mid = 128) {
      // x in [0,255]
      x = (x - mid) * c + mid;
      return x < 0 ? 0 : x > 255 ? 255 : x;
    }
    function gamma255(x: number, gamma: number) {
      const t = x / 255;
      return Math.max(0, Math.min(255, Math.pow(t, gamma) * 255));
    }

    // -------------------DRAW RIPPLE BEFORE WALL -------------------
    // -------------------DRAW RIPPLE BEFORE WALL -------------------
    // -------------------DRAW RIPPLE BEFORE WALL -------------------
    // -------------------DRAW RIPPLE BEFORE WALL -------------------

    const precomputeInitialRipple = (
      width: number,
      height: number,
      wavelength: number,
      period: number,
      phase = 0.785398,
    ): WavePrecomp => {
      const A = new Float32Array(width);
      const B = new Float32Array(width);

      const k = (2 * Math.PI) / wavelength;
      const omega = (2 * Math.PI) / period;

      for (let x = 0; x < width; x++) {
        const phi = k * x - phase;
        const invDen = 1;
        A[x] = invDen * Math.cos(phi);
        B[x] = invDen * Math.sin(phi);
      }

      return { A, B, omega, width, height };
    };

    function makeInitalRippleRenderer(
      simW: number, // 700
      simH: number, // 600
      outW: number, // 1100
      outH: number, // 945
      rgb = [255, 231, 0],
    ) {
      // --- 2) Offscreen canvas to accept putImageData ---
      const simCanvas = document.createElement("canvas");
      simCanvas.width = simW;
      simCanvas.height = simH;
      const simCtx = simCanvas.getContext("2d", { willReadFrequently: true })!;
      // (willReadFrequently isn't required here, but it's harmless)

      // Params that affect precompute
      const phase = 5.0;

      let pre: WavePrecomp | null = null;
      let lastSlitWidth = NaN;
      let lastCanvasH = NaN;

      return function draw(
        ctx: CanvasRenderingContext2D,
        tMs: number,
        x0: number, // top-left destination on the output canvas
        y0: number,
        wavelength = 10,
        speed = 2.0,
      ) {
        const imageData = simCtx.createImageData(simW, simH);
        const data = imageData.data;

        const canvasH = canvasDimensions.height;
        const slitWidth = diffractionWall.slitWidth;

        // --- IMPORTANT: scale slitWidth into sim-space ---

        // Rebuild precompute if needed
        if (!pre || slitWidth !== lastSlitWidth || canvasH !== lastCanvasH) {
          lastSlitWidth = slitWidth;
          lastCanvasH = canvasH;

          pre = precomputeInitialRipple(
            simW,
            simH,
            wavelength,
            1 / speed,
            phase,
          );
        }

        // Fast per-frame render
        const time = tMs / 1000;
        const ot = pre.omega * time;
        const c = Math.cos(ot);
        const s = Math.sin(ot);

        const A = pre.A;
        const B = pre.B;
        const brightness = 100;
        for (let x = 0; x < simW; x++) {
          let v = (A[x] * c + B[x] * s) * brightness;
          if (v < 0) v = 0;
          else if (v > 255) v = 255;

          for (let y = 0; y < simH; y++) {
            const index = (y * simW + x) * 4;
            data[index] = rgb[0]; // R
            data[index + 1] = rgb[1]; // G
            data[index + 2] = rgb[2]; // B
            data[index + 3] = v; // A (0-255) - this overwrites!
          }
        }

        simCtx.putImageData(imageData, 0, 0); // Replaces all pixels
        // --- 4) Upscale to output canvas ---
        // Smoothing choice:
        ctx.imageSmoothingEnabled = true; // smoother
        // ctx.imageSmoothingEnabled = false; // pixelated

        ctx.drawImage(simCanvas, x0, y0, outW, outH);
      };
    }

    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.fillRect(
      receptorWall.x,
      0,
      receptorWall.width,
      canvasDimensions.height,
    );

    // -------------------DRAW RIPPLE -------------------
    // -------------------DRAW RIPPLE -------------------
    // -------------------DRAW RIPPLE -------------------
    // -------------------DRAW RIPPLE -------------------
    // -------------------DRAW RIPPLE -------------------
    // -------------------DRAW RIPPLE -------------------

    type WavePrecomp = {
      A: Float32Array;
      B: Float32Array;
      omega: number;
      width: number;
      height: number;
    };

    function precomputeWaveAB(
      width: number,
      height: number,
      slitTop: number,
      slitBottom: number,
      wavelength: number,
      period: number,
      sourceStep: number,
      phase = 0.785398,
    ): WavePrecomp {
      const nPix = width * height;
      const A = new Float32Array(nPix);
      const B = new Float32Array(nPix);

      const k = (2 * Math.PI) / wavelength;
      const omega = (2 * Math.PI) / period;

      const wavePointSources: number[] = [];
      for (
        let pointSource = slitTop;
        pointSource < slitBottom;
        pointSource += sourceStep
      )
        wavePointSources.push(pointSource);

      // Compute for top half only
      for (let y = 0; y < height / 2; y++) {
        const row = y * width;

        for (let x = 0; x < width; x++) {
          const p = row + x;

          let sumA = 0;
          let sumB = 0;

          for (
            let sourceIndex = 0;
            sourceIndex < wavePointSources.length;
            sourceIndex++
          ) {
            const sy = wavePointSources[sourceIndex];
            const dy = y - sy;
            const dx = x;

            const r = Math.hypot(dx, dy);
            const inc = 1;
            const invDen = 1 / Math.sqrt(r + 0.001);
            const phi = k * r - phase;

            sumA += inc * invDen * Math.cos(phi);
            sumB += inc * invDen * Math.sin(phi);
          }

          A[p] = sumA;
          B[p] = sumB;
        }
      }

      // Mirror to bottom half
      const halfHeight = height / 2;
      for (let y = 0; y < halfHeight; y++) {
        const mirrorY = height - 1 - y;
        const sourceRow = y * width;
        const destRow = mirrorY * width;

        for (let x = 0; x < width; x++) {
          const sourceP = sourceRow + x;
          const destP = destRow + x;

          A[destP] = A[sourceP];
          B[destP] = B[sourceP];
        }
      }

      return { A, B, omega, width, height };
    }

    function makeRippleRenderer(
      simW: number, // 700
      simH: number, // 600
      outW: number, // 1100
      outH: number, // 945
      rgb = [255, 231, 0],
    ) {
      // --- 1) Simulation ImageData at sim size ---
      const img = new ImageData(simW, simH);
      const data = img.data;

      for (let p = 0; p < simW * simH; p++) {
        const i = p * 4;
        data[i + 0] = rgb[0];
        data[i + 1] = rgb[1];
        data[i + 2] = rgb[2];
        data[i + 3] = 255;
      }

      // --- 2) Offscreen canvas to accept putImageData ---
      const simCanvas = document.createElement("canvas");
      simCanvas.width = simW;
      simCanvas.height = simH;
      const simCtx = simCanvas.getContext("2d", { willReadFrequently: true })!;
      // (willReadFrequently isn't required here, but it's harmless)

      // Params that affect precompute
      const sourceStep = 10;
      const phase = 0.785398;

      let pre: WavePrecomp | null = null;
      let lastSlitWidth = NaN;
      let lastCanvasH = NaN;

      const numberofPixels = simW * simH;

      return function draw(
        ctx: CanvasRenderingContext2D,
        tMs: number,
        x0: number, // top-left destination on the output canvas
        y0: number,
        wavelength = 0.8,
        speed = 2.0,
      ) {
        const canvasH = canvasDimensions.height;
        const slitWidth = diffractionWall.slitWidth;

        // --- IMPORTANT: scale slitWidth into sim-space ---
        const scaleY = simH / canvasH;
        const slitWidthSim = slitWidth * scaleY;

        // Rebuild precompute if needed
        if (!pre || slitWidth !== lastSlitWidth || canvasH !== lastCanvasH) {
          lastSlitWidth = slitWidth;
          lastCanvasH = canvasH;

          const slitTopSim = simH / 2 - slitWidthSim / 2;
          const slitBottomSim = simH / 2 + slitWidthSim / 2;

          pre = precomputeWaveAB(
            simW,
            simH,
            slitTopSim,
            slitBottomSim,
            wavelength,
            1 / speed,
            sourceStep * scaleY, // optional; keeps spacing consistent when scaling
            phase,
          );
        }

        // Fast per-frame render
        const time = tMs / 1000;
        const ot = pre.omega * time;
        const c = Math.cos(ot);
        const s = Math.sin(ot);

        const A = pre.A;
        const B = pre.B;
        const brightness = 150;

        let alphaIndex = 3;
        for (let p = 0; p < numberofPixels; p++, alphaIndex += 4) {
          let v = (A[p] * c + B[p] * s) * brightness;
          if (v < 0) v = 0;
          else if (v > 255) v = 255;
          v = gamma255(v, 1.2); // boost highlights
          v = contrast255(v, 1.3, 80); // stretch around lower mid
          data[alphaIndex] = v | 0;
        }

        // --- 3) Put pixels into sim canvas (no scaling) ---
        simCtx.putImageData(img, 0, 0);

        // --- 4) Upscale to output canvas ---
        // Smoothing choice:
        ctx.imageSmoothingEnabled = true; // smoother
        // ctx.imageSmoothingEnabled = false; // pixelated

        ctx.drawImage(simCanvas, x0, y0, outW, outH);
      };
    }

    const drawCircularRipple = makeRippleRenderer(
      175 * 2,
      150 * 2, // sim size
      receptorWall.x - diffractionWall.x - diffractionWall.wallWidth,
      canvasDimensions.height, // output size
      [255, 231, 0],
    );

    const drawInitialWaveRipple = makeInitalRippleRenderer(
      100 * 3,
      246 * 3, // sim size
      diffractionWall.x,
      canvasDimensions.height, // output size
      [255, 231, 0],
    );
    // -------------------DRAW RIPPLE -------------------
    // -------------------DRAW RIPPLE -------------------
    // -------------------DRAW RIPPLE -------------------
    // -------------------DRAW RIPPLE -------------------
    // -------------------DRAW RIPPLE -------------------
    // -------------------DRAW RIPPLE -------------------
    // -------------------DRAW RIPPLE -------------------
    const tMs = 0;

    const wavelength = 15;
    const speed = 0.5;
    const animate = (tMs: number) => {
      // Clear canvas with a slight trail effect
      ctx.fillStyle = "rgba(26, 32, 44, 0.4)";
      ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height);

      if (!isPaused) {
        drawInitialWaveRipple(ctx, tMs, 0, 0, (wavelength * 3) / 2, speed);
        drawCircularRipple(ctx, tMs, diffractionWall.x, 0, wavelength, speed);
        drawDiffractionWall();
        drawReceptorWall();
        drawLightIntensityOnWall();

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
