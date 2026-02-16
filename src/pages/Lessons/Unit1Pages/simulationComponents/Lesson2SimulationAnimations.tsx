type WavePrecomp = {
  A: Float32Array;
  B: Float32Array;
  omega: number;
  width: number;
  height: number;
};

export type ParticlesOnWall = {
  particlePositions : number[];
  binSize: number;
  totalParticles: number;
}

export interface DiffractionWall {
  x: number;
  wallWidth: number;
  slitSize: number;
  color: string;
}

export interface ReceptorWall {
  x: number;
  width: number;
  color: string;
}

interface CanvasDimensions {
  width: number;
  height: number;
}

export interface AnimationParams {
  diffractionWall: DiffractionWall;
  receptorWall: ReceptorWall;
  canvasDimensions: CanvasDimensions;
  slitMinimum: number;
  slitMaximum: number;
  contrast: number[];
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
}

function contrast255(x: number, c: number, mid = 128) {
  x = (x - mid) * c + mid;
  return x < 0 ? 0 : x > 255 ? 255 : x;
}

function gamma255(x: number, gamma: number) {
  const t = x / 255;
  return Math.max(0, Math.min(255, Math.pow(t, gamma) * 255));
}

export function drawDiffractionWall(ctx: CanvasRenderingContext2D, params: AnimationParams) {
  const { diffractionWall, canvasDimensions } = params;
  const x = diffractionWall.x;
  const diffractionWallWidth = diffractionWall.wallWidth;
  const diffractionSlitWidth = diffractionWall.slitSize;

  ctx.fillStyle = diffractionWall.color;
  ctx.fillRect(x, 0, diffractionWallWidth, canvasDimensions.height / 2 - diffractionSlitWidth / 2);
  ctx.fillRect(
    x,
    canvasDimensions.height / 2 + diffractionSlitWidth / 2,
    diffractionWallWidth,
    canvasDimensions.height,
  );
}

export function drawReceptorWall(ctx: CanvasRenderingContext2D, params: AnimationParams) {
  const { receptorWall, canvasDimensions } = params;
  ctx.fillStyle = receptorWall.color;
  ctx.fillRect(receptorWall.x, 0, receptorWall.width, canvasDimensions.height);
}

const calculateLightIntensity = (y: number, params: AnimationParams) => {
  const {diffractionWall, canvasDimensions, slitMinimum, slitMaximum} = params;
  const scalefactor = 30;
  const diffractionSlitWidth =
    4 * ((diffractionWall.slitSize - slitMinimum + 10) / (slitMaximum - slitMinimum));
  y = y - canvasDimensions.height / 2;
  return (
    200 *
    (Math.sin(diffractionSlitWidth * (y / scalefactor)) /
      (diffractionSlitWidth * (y / scalefactor))) **
      2
  );
};

export function drawLightIntensityOnWall(ctx: CanvasRenderingContext2D, particlesOnWall : ParticlesOnWall, params: AnimationParams) {
  const { receptorWall } = params;
  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  const maxHeight = receptorWall.width - 50;
  const maxBinSize = 50;
  const minBinSize = 10;
  const binSize = Math.min(minBinSize*(750/particlesOnWall.totalParticles), maxBinSize);

  for (let y = 0; y < particlesOnWall.particlePositions.length; y += 0.5) {
    const lightIntensity = Math.min((particlesOnWall.particlePositions[y]/particlesOnWall.totalParticles)*40000, maxHeight);
    ctx.fillRect(receptorWall.x, y, lightIntensity, binSize);
  }
}

export function drawLightIntensityCurve(ctx: CanvasRenderingContext2D, params: AnimationParams) {
  const { receptorWall, canvasDimensions} = params;

  ctx.fillStyle = "rgba(255, 0, 255, 0.2)";
  for (let y = 0; y < canvasDimensions.height; y += 0.5) {
    const lightIntensity = calculateLightIntensity(y, params);
    ctx.fillRect(receptorWall.x, y, lightIntensity, 0.5);
  }
}

// Precompute functions
function precomputeInitialRipple(
  width: number,
  height: number,
  wavelength: number,
  period: number,
  phase = 0.785398,
): WavePrecomp {
  const A = new Float32Array(width);
  const B = new Float32Array(width);

  const k = (2 * Math.PI) / wavelength;
  const omega = (2 * Math.PI) / period;

  for (let x = 0; x < width; x++) {
    const phi = k * x - phase;
    A[x] = Math.cos(phi);
    B[x] = Math.sin(phi);
  }

  return { A, B, omega, width, height };
}

// Renderer factory functions
export function makeInitialRippleRenderer(
  scaleFactor: number,
  outW: number,
  outH: number,
  rgb = [255, 231, 0],
) {
  const simW = Math.round(outW / scaleFactor);
  const simH = Math.round(outH / scaleFactor);

  const simCanvas = document.createElement("canvas");
  simCanvas.width = simW;
  simCanvas.height = simH;
  const simCtx = simCanvas.getContext("2d", { willReadFrequently: true })!;

  const phase = 0.785398;

  let pre: WavePrecomp | null = null;
  let lastSlitWidth = NaN;
  let lastCanvasH = NaN;

  return function draw(
    ctx: CanvasRenderingContext2D,
    tMs: number,
    x0: number,
    y0: number,
    wavelength: number,
    speed: number,
    params: AnimationParams,
  ) {
    const imageData = simCtx.createImageData(simW, simH);
    const data = imageData.data;

    const canvasH = params.canvasDimensions.height;
    const slitWidth = params.diffractionWall.slitSize;

    // Rebuild precompute if needed
    if (!pre || slitWidth !== lastSlitWidth || canvasH !== lastCanvasH) {
      lastSlitWidth = slitWidth;
      lastCanvasH = canvasH;

      pre = precomputeInitialRipple(simW, simH, wavelength, 1 / speed, phase);
    }

    // Fast per-frame render
    const time = tMs / 1000;
    const ot = pre.omega * time;
    const cosine = Math.cos(ot);
    const sine = Math.sin(ot);

    const A = pre.A;
    const B = pre.B;
    const brightness = 150;

    for (let x = 0; x < simW; x++) {
      let v = (A[x] * cosine + B[x] * sine) * brightness;
      if (v < 0) v = 0;
      else if (v > 255) v = 255;
      v = gamma255(v, params.contrast[0]);
      v = contrast255(v, 1.3, 80);

      for (let y = 0; y < simH; y++) {
        const index = (y * simW + x) * 4;
        data[index] = rgb[0];
        data[index + 1] = rgb[1];
        data[index + 2] = rgb[2];
        data[index + 3] = v | 0;
      }
    }

    simCtx.putImageData(imageData, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(simCanvas, x0, y0, outW, outH);
  };
}

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
  for (let pointSource = slitTop; pointSource < slitBottom; pointSource += sourceStep)
    wavePointSources.push(pointSource);

  // Compute for top half only
  for (let y = 0; y < height / 2; y++) {
    const row = y * width;

    for (let x = 0; x < width; x++) {
      const p = row + x;

      let sumA = 0;
      let sumB = 0;

      for (let sourceIndex = 0; sourceIndex < wavePointSources.length; sourceIndex++) {
        const sy = wavePointSources[sourceIndex];
        const dy = y - sy;
        const dx = x;

        const r = Math.hypot(dx, dy);
        const inc = 1;
        const invDen = 1 / Math.sqrt(r + 7);
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

export function makeRippleRenderer(
  scaleFactor: number,
  outW: number,
  outH: number,
  rgb = [255, 231, 0],
) {
  const simW = Math.round(outW / scaleFactor);
  const simH = Math.round(outH / scaleFactor);

  const img = new ImageData(simW, simH);
  const data = img.data;

  for (let p = 0; p < simW * simH; p++) {
    const i = p * 4;
    data[i + 0] = rgb[0];
    data[i + 1] = rgb[1];
    data[i + 2] = rgb[2];
    data[i + 3] = 255;
  }

  const simCanvas = document.createElement("canvas");
  simCanvas.width = simW;
  simCanvas.height = simH;
  const simCtx = simCanvas.getContext("2d", { willReadFrequently: true })!;

  const sourceStep = 5;
  const phase = 5;

  let pre: WavePrecomp | null = null;
  let lastSlitWidth = NaN;
  let lastCanvasH = NaN;

  const numberOfPixels = simW * simH;

  return function draw(
    ctx: CanvasRenderingContext2D,
    tMs: number,
    x0: number,
    y0: number,
    wavelength: number,
    speed: number,
    params: AnimationParams,
  ) {
    const canvasH = params.canvasDimensions.height;
    const slitWidth = params.diffractionWall.slitSize;
    const slitWidthSim = slitWidth / scaleFactor;

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
        sourceStep / scaleFactor,
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

    let alphaIndex = 3;
    for (let p = 0; p < numberOfPixels; p++, alphaIndex += 4) {
      let v = (A[p] * c + B[p] * s) * brightness;
      if (v < 0) v = 0;
      else if (v > 255) v = 255;
      v = gamma255(v, params.contrast[0]);
      v = contrast255(v, 1.3, 80);
      data[alphaIndex] = v | 0;
    }

    simCtx.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(simCanvas, x0, y0, outW, outH);
  };
}

export function animateParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  params: AnimationParams,
) : number[] {
  const { receptorWall } = params;
  const yPositionofParticlesOnWall : number[] = []

  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > receptorWall.x) {
      particle.vx = 0;
      particle.vy = 0;
      particle.x = Math.max(0, Math.min(receptorWall.x, particle.x));
      yPositionofParticlesOnWall.push(particle.y)
    }
    // if (particle.y < 0 || particle.y > canvasDimensions.height) {
    //   particle.vy = 0;
    //   particle.vx = 0;
    //   particle.y = Math.max(0, Math.min(canvasDimensions.height, particle.y));
    // }

    const gradient = ctx.createRadialGradient(
      particle.x,
      particle.y,
      0,
      particle.x,
      particle.y,
      particle.size * 2,
    );
    gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 60%, 0.5)`);
    gradient.addColorStop(0.5, `hsla(${particle.hue}, 80%, 50%, 0.25)`);
    gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 40%, 0)`);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
    ctx.fill();
    
  });
  return yPositionofParticlesOnWall
}

export function blurIntersectionBetweenWaves(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement | null,
  params: AnimationParams,
) {
  if (!canvas) return;

  const { diffractionWall, canvasDimensions } = params;

  const x = diffractionWall.x - 10;
  const y = canvasDimensions.height / 2 - diffractionWall.slitSize / 2;
  const width = 15;
  const height = diffractionWall.slitSize;

  ctx.save();
  // Define the blur region
  ctx.rect(x, y, width, height);
  ctx.clip();

  // Redraw the area with blur
  ctx.filter = "blur(4px)";
  ctx.drawImage(canvas, 0, 0); // Draw entire canvas onto itself
  ctx.filter = "none";

  ctx.restore();
}


  export function randomAngle(params: AnimationParams) {
    const {canvasDimensions, diffractionWall, receptorWall} = params
    const xMin = 0;
    const xMax = canvasDimensions.height;

    // The maximum value of (sin(x)/x)^2 is 1 at x=0
    const maxPDF = 300;

    while (true) {
      // Generate random x in our range
      const x = Math.random() * (xMax - xMin);

      // Generate random y between 0 and maxPDF
      const y = Math.random() * maxPDF;

      // Calculate (sin(x)/x)^2
      // Handle the special case at x=0 where sinc(0) = 1
      let sincSquared;
      if (Math.abs(x) < 1e-10) {
        sincSquared = 200;
      } else {
        sincSquared = calculateLightIntensity(x, params)
      }

      // Accept this sample if y is below the PDF curve
      if (y <= sincSquared) {
        const angle = Math.atan((x-canvasDimensions.height/2)/(receptorWall.x-diffractionWall.x-diffractionWall.wallWidth))
        return angle;
      } else{
        return Math.random() - 0.5
      }
      // Otherwise reject and try again
    }
  };