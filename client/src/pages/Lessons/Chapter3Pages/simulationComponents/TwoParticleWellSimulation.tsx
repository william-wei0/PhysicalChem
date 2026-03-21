import { useRef, useState, useEffect, useMemo } from "react";
import Slider from "../../../../components/simulationControls/Slider";
import SimulationControls from "../../../../components/simulationControls/SimulationControls";
import "../../styles/simulation.css";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/accordion/accordion";

type CanvasDimensions = {
  width: number;
  height: number;
};

type ControlAccordionProps = {
  id: string;
  title: string;
  triggerClassName?: string;
  content?: React.ReactNode;
};

type Particle = {
  quantumNumber: number;
  proportion: number;
  sqrtProportion: number;
};

type AnimationParams = {
  canvasDimensions: CanvasDimensions;
  animationSpeed: number;
  waveAmplitude: number;
  wellWidth: number;
  wellBaseHeight: number;
  leftBoundary: number;
  rightBoundary: number;
  horizontalGridLines: number;
  tickMarks: number;
  waveColor: [number, number, number];
  waveThickness: number;
  isRainbow: boolean;
  isFilled: boolean;
};

function drawGridHorizontal(ctx: CanvasRenderingContext2D, animationParams: AnimationParams) {
  const {
    horizontalGridLines: horizontal_lines,
    leftBoundary: left_boundary,
    rightBoundary: right_boundary,
    wellBaseHeight,
  } = animationParams;
  ctx.lineWidth = 1;

  for (let i = 0; i < horizontal_lines; i++) {
    ctx.beginPath();
    ctx.moveTo(left_boundary, (wellBaseHeight * i) / horizontal_lines);
    ctx.lineTo(right_boundary, (wellBaseHeight * i) / horizontal_lines);

    ctx.strokeStyle = `rgba(200, 200, 200, 0.5)`;
    ctx.stroke();
  }

  ctx.lineWidth = 1.0;
}

function drawTickMarks(ctx: CanvasRenderingContext2D, animationParams: AnimationParams) {
  const { leftBoundary, wellWidth, tickMarks, wellBaseHeight } = animationParams;
  ctx.lineWidth = 2;

  for (let i = 1; i < tickMarks; i++) {
    const x = leftBoundary + (wellWidth * i) / tickMarks;
    ctx.beginPath();
    ctx.moveTo(x, wellBaseHeight - 8);
    ctx.lineTo(x, wellBaseHeight + 8);

    ctx.strokeStyle = `rgba(200, 200, 200, 1)`;
    ctx.stroke();
  }
  ctx.lineWidth = 1.0;
}

function draw_labels(ctx: CanvasRenderingContext2D, animationParams: AnimationParams) {
  const { canvasDimensions, wellBaseHeight, leftBoundary, wellWidth } = animationParams;
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Position (x)", canvasDimensions.width / 2, wellBaseHeight + 40);
  ctx.fillText("0", leftBoundary, wellBaseHeight + 40);
  ctx.fillText("L", leftBoundary + wellWidth, wellBaseHeight + 40);

  ctx.save();
  ctx.translate(leftBoundary - 25, wellBaseHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("Probability Density |ψ|\u00B2", 0, 0);

  ctx.restore();
}

function draw_well(ctx: CanvasRenderingContext2D, animationParams: AnimationParams) {
  const { leftBoundary, wellBaseHeight, rightBoundary } = animationParams;
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.moveTo(leftBoundary, 0);
  ctx.lineTo(leftBoundary, wellBaseHeight);
  ctx.lineTo(rightBoundary, wellBaseHeight);
  ctx.lineTo(rightBoundary, 0);

  ctx.strokeStyle = `rgba(200, 200, 200)`;
  ctx.stroke();
  ctx.lineWidth = 1.0;
}

function drawWave(
  ctx: CanvasRenderingContext2D,
  currentTime: number,
  animationParams: AnimationParams,
  particle1: Particle,
  particle2: Particle,
) {
  function drawFilledWaveLine(x: number, y: number, ctx: CanvasRenderingContext2D, animationParams: AnimationParams) {
    const { wellBaseHeight } = animationParams;
    ctx.beginPath();
    ctx.moveTo(x, wellBaseHeight);
    ctx.lineTo(x, wellBaseHeight - y);
    ctx.stroke();
  }

  const { wellWidth, leftBoundary, isRainbow, isFilled, wellBaseHeight, animationSpeed, waveColor, waveThickness } =
    animationParams;
  const points = 4500;
  const SPEED_FACTOR = 0.0000009;

  ctx.strokeStyle = `rgba(${waveColor[0]},${waveColor[1]},${waveColor[2]},1.0)`;
  ctx.lineWidth = waveThickness;
  ctx.beginPath();
  ctx.moveTo(animationParams.leftBoundary, animationParams.wellBaseHeight);

  for (let i = 0; i < points; i++) {
    const x = (i * wellWidth) / points + leftBoundary;
    const y =
      animationParams.waveAmplitude *
      (particle1.proportion * Math.sin((i / points) * particle1.quantumNumber * Math.PI) ** 2 +
        particle2.proportion * Math.sin((i / points) * particle2.quantumNumber * Math.PI) ** 2 +
        particle1.sqrtProportion *
          particle2.sqrtProportion *
          Math.sin((i / points) * particle1.quantumNumber * Math.PI) *
          Math.sin((i / points) * particle2.quantumNumber * Math.PI) *
          Math.cos(
            Math.min(Math.abs(particle2.quantumNumber ** 2 - particle1.quantumNumber ** 2), 10) *
              currentTime *
              SPEED_FACTOR *
              animationSpeed,
          ));

    if (isRainbow) {
      const hue = ((y / animationParams.waveAmplitude / 1.8) * 360) % 360;
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    }

    if (isFilled) drawFilledWaveLine(x, y, ctx, animationParams);
    else ctx.lineTo(x, wellBaseHeight - y);
  }

  if (!isFilled) {
    ctx.stroke();
  }
}

export default function TwoParticleWellSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const WAVE_PERIOD = 1000000;
  const BACKGROUND_COLOR = "rgba(26, 32, 44, 1)";
  const CANVAS_DIMENSIONS = useMemo<CanvasDimensions>(() => ({ width: 1400, height: 800 }), []);

  const animationFrameRef = useRef<number>(0);
  const currentTime = useRef<number>(0);
  const startTime = useRef<number | null>(null);
  const elapsedTime = useRef<number>(0);
  const previousTime = useRef<number | null>(null);

  const [particle1, setParticle1] = useState<Particle>({
    quantumNumber: 1,
    proportion: 0.5,
    sqrtProportion: 1 / Math.SQRT2,
  });
  const [particle2, setParticle2] = useState<Particle>({
    quantumNumber: 2,
    proportion: 0.5,
    sqrtProportion: 1 / Math.SQRT2,
  });
  const [animationSpeed, setAnimationSpeed] = useState([0.5]);
  const [waveAmplitude, setWaveAmplitude] = useState([300]);
  const [wellWidth, setWellWidth] = useState([(CANVAS_DIMENSIONS.width * 7) / 10]);
  const [wellBaseHeight, setWellBaseHeight] = useState([(CANVAS_DIMENSIONS.height * 8.5) / 10]);

  const animationParams = useMemo<AnimationParams>(
    () => ({
      canvasDimensions: CANVAS_DIMENSIONS,
      animationSpeed: animationSpeed[0] * 2000,
      waveAmplitude: waveAmplitude[0],
      wellWidth: wellWidth[0],
      wellBaseHeight: wellBaseHeight[0],
      leftBoundary: (CANVAS_DIMENSIONS.width - wellWidth[0]) / 2.0,
      rightBoundary: (CANVAS_DIMENSIONS.width - wellWidth[0]) / 2.0 + wellWidth[0],
      horizontalGridLines: 6,
      tickMarks: 6,
      waveColor: [28, 90, 190],
      waveThickness: 5,
      isRainbow: false,
      isFilled: true,
    }),
    [animationSpeed, waveAmplitude, wellWidth, wellBaseHeight, CANVAS_DIMENSIONS],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = (timestamp: number) => {
      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, CANVAS_DIMENSIONS.width, CANVAS_DIMENSIONS.height);

      if (startTime.current === null) startTime.current = timestamp;

      elapsedTime.current = (elapsedTime.current + (timestamp - startTime.current)) % WAVE_PERIOD;
      currentTime.current = elapsedTime.current;
      startTime.current = timestamp;
      previousTime.current = timestamp;

      draw_well(ctx, animationParams);
      drawGridHorizontal(ctx, animationParams);
      draw_labels(ctx, animationParams);
      drawWave(ctx, currentTime.current, animationParams, particle1, particle2);
      drawTickMarks(ctx, animationParams);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [CANVAS_DIMENSIONS, animationParams, particle1, particle2]);

  const handleParticle1ProportionChange = (proportion: number[]) => {
    setParticle1((prev: Particle) => {
      return { ...prev, proportion: proportion[0], sqrtProportion: Math.sqrt(proportion[0]) };
    });
    setParticle2((prev: Particle) => {
      return { ...prev, proportion: 1 - proportion[0], sqrtProportion: Math.sqrt(1 - proportion[0]) };
    });
  };

  const handleParticle2ProportionChange = (proportion: number[]) => {
    setParticle2((prev: Particle) => {
      return { ...prev, proportion: proportion[0], sqrtProportion: Math.sqrt(proportion[0]) };
    });
    setParticle1((prev: Particle) => {
      return { ...prev, proportion: 1 - proportion[0], sqrtProportion: Math.sqrt(1 - proportion[0]) };
    });
  };

  const accordionTriggerClassName =
    "relative w-full text-xl font-bold border-t-2 border-zinc-500 pl-4 pt-4 pb-2 hover:cursor-pointer hover:text-zinc-400 transition-colors duration-200";

  const WaveParticleSettings = useMemo<ControlAccordionProps[]>(
    () => [
      {
        id: "Particle 1 Settings",
        title: "Particle 1 Settings",
        triggerClassName: accordionTriggerClassName,
        content: (
          <>
            <Slider
              key={"Particle 1 Energy"}
              value={[particle1.quantumNumber]}
              onValueChange={(energy: number[]) => {
                setParticle1((prev: Particle) => {
                  return { ...prev, quantumNumber: energy[0] };
                });
              }}
              label={"Particle 1 Energy"}
              min={1}
              max={12}
            />
            <Slider
              key={"Particle 1 Proportion"}
              value={[parseFloat(particle1.proportion.toFixed(2))]}
              onValueChange={handleParticle1ProportionChange}
              label={"Particle 1 Proportion"}
              min={0}
              max={1}
              step={0.01}
            />
          </>
        ),
      },
      {
        id: "Particle 2 Settings",
        title: "Particle 2 Settings",
        triggerClassName: accordionTriggerClassName,
        content: (
          <>
            <Slider
              key={"Particle 2 Energy"}
              value={[particle2.quantumNumber]}
              onValueChange={(energy: number[]) => {
                setParticle2((prev: Particle) => {
                  return { ...prev, quantumNumber: energy[0] };
                });
              }}
              label="Particle 2 Energy"
              min={1}
              max={12}
            />
            <Slider
              key={"Particle 2 Proportion"}
              value={[parseFloat(particle2.proportion.toFixed(2))]}
              onValueChange={handleParticle2ProportionChange}
              label={"Particle 2 Proportion"}
              min={0}
              max={1}
              step={0.01}
            />
          </>
        ),
      },
      {
        id: "General Settings",
        title: "General Settings",
        triggerClassName: accordionTriggerClassName,
        content: (
          <>
            <Slider
              key={"Animation Speed"}
              value={animationSpeed}
              onValueChange={setAnimationSpeed}
              label={"Animation Speed"}
              min={0}
              max={1}
              step={0.01}
            />
            <Slider
              key={"Wave Amplitude"}
              value={waveAmplitude}
              onValueChange={setWaveAmplitude}
              label={"Wave Amplitude"}
              min={1}
              max={500}
              step={1}
            />
            <Slider
              key={"Well Width"}
              value={wellWidth}
              onValueChange={setWellWidth}
              label={"Well Width"}
              min={300}
              max={1000}
              step={1}
            />
            <Slider
              key={"Well Base Height"}
              value={wellBaseHeight}
              onValueChange={setWellBaseHeight}
              label={"Well Base Height"}
              min={400}
              max={700}
              step={1}
            />
          </>
        ),
      },
    ],
    [particle1, particle2, animationSpeed, waveAmplitude, wellWidth, wellBaseHeight],
  );

  return (
    <div className="simulationCanvasLayout">
      <div
        ref={containerRef}
        className="canvasContainer my-4"
        style={{
          width: CANVAS_DIMENSIONS.width,
          height: CANVAS_DIMENSIONS.height,
        }}
      >
        <SimulationControls
          controllableSimulationVariables={
            <div className="scrollContainer max-h-[700px]">
              <Accordion key="accordion" allowMultiple={true}>
                {WaveParticleSettings.map((setting) => (
                  <AccordionItem id={setting.id} key={setting.id}>
                    <AccordionTrigger className={setting.triggerClassName}>{setting.title}</AccordionTrigger>
                    <AccordionContent>{setting.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          }
        />
        <div className="canvasScrollPane">
          {/*-6 to account for the extra border space*/}
          <canvas
            ref={canvasRef}
            width={CANVAS_DIMENSIONS.width - 6}
            height={CANVAS_DIMENSIONS.height}
            style={{
              border: "3px solid black",
              backgroundColor: "#1a202c",
            }}
          />
        </div>
      </div>
    </div>
  );
}
