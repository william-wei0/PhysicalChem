type WavePrecomp = {
  A: Float32Array;
  B: Float32Array;
  omega: number;
  width: number;
  height: number;
};

interface DiffractionWall {
  x: number;
  wallWidth: number;
  slitWidth: number;
}

interface ReceptorWall {
  x: number;
  width: number;
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
}

function contrast255(x: number, c: number, mid = 128) {
  x = (x - mid) * c + mid;
  return x < 0 ? 0 : x > 255 ? 255 : x;
}

function gamma255(x: number, gamma: number) {
  const t = x / 255;
  return Math.max(0, Math.min(255, Math.pow(t, gamma) * 255));
}

export function drawDiffractionWall(
  ctx: CanvasRenderingContext2D,
  params: AnimationParams,
) {
  const { diffractionWall, canvasDimensions } = params;
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
}

export function drawReceptorWall(
  ctx: CanvasRenderingContext2D,
  params: AnimationParams,
) {
  const { receptorWall, canvasDimensions } = params;
  ctx.fillStyle = "rgba(255, 255, 255, 1)";
  ctx.fillRect(receptorWall.x, 0, receptorWall.width, canvasDimensions.height);
}

export function drawLightIntensityOnWall(
  ctx: CanvasRenderingContext2D,
  params: AnimationParams,
) {
  const {
    receptorWall,
    canvasDimensions,
    diffractionWall,
    slitMinimum,
    slitMaximum,
  } = params;

  const getLightIntensity = (y: number) => {
    const scalefactor = 30;
    const diffractionSlitWidth =
      4 *
      ((diffractionWall.slitWidth - slitMinimum + 10) /
        (slitMaximum - slitMinimum));
    y = y - canvasDimensions.height / 2;
    return (
      200 *
      (Math.sin(diffractionSlitWidth * (y / scalefactor)) /
        (diffractionSlitWidth * (y / scalefactor))) **
        2
    );
  };

  ctx.fillStyle = "rgba(255, 0, 0, 1)";
  for (let y = 0; y < canvasDimensions.height; y += 0.5) {
    const lightIntensity = getLightIntensity(y);
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
    const invDen = 1;
    A[x] = invDen * Math.cos(phi);
    B[x] = invDen * Math.sin(phi);
  }

  return { A, B, omega, width, height };
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

// Renderer factory functions
export function makeInitialRippleRenderer(
  simW: number,
  simH: number,
  outW: number,
  outH: number,
  rgb = [255, 231, 0],
) {
  const simCanvas = document.createElement("canvas");
  simCanvas.width = simW;
  simCanvas.height = simH;
  const simCtx = simCanvas.getContext("2d", { willReadFrequently: true })!;

  const phase = 5.0;

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
    const slitWidth = params.diffractionWall.slitWidth;

    // Rebuild precompute if needed
    if (!pre || slitWidth !== lastSlitWidth || canvasH !== lastCanvasH) {
      lastSlitWidth = slitWidth;
      lastCanvasH = canvasH;

      pre = precomputeInitialRipple(simW, simH, wavelength, 1 / speed, phase);
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

export function makeRippleRenderer(
  simW: number,
  simH: number,
  outW: number,
  outH: number,
  rgb = [255, 231, 0],
) {
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

  const sourceStep = 10;
  const phase = 0.785398;

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
    const slitWidth = params.diffractionWall.slitWidth;

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
        sourceStep * scaleY,
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
    for (let p = 0; p < numberOfPixels; p++, alphaIndex += 4) {
      let v = (A[p] * c + B[p] * s) * brightness;
      if (v < 0) v = 0;
      else if (v > 255) v = 255;
      v = gamma255(v, 1.2);
      v = contrast255(v, 1.3, 80);
      data[alphaIndex] = v | 0;
    }

    simCtx.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(simCanvas, x0, y0, outW, outH);
  };
}
