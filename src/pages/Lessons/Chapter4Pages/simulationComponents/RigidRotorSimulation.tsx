import * as THREE from "three";
import { useRef, useState, useMemo, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Slider from "../../../../components/simulationControls/Slider";
import SimulationControls from "../../../../components/simulationControls/SimulationControls";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/accordion/accordion";

interface AtomConfig {
  color: string;
  outlineColor: string;
  showOutline: boolean;
  size: number;
}

interface SimConfig {
  rotationalSpeed: number;
  distanceBetweenAtoms: number;
  showCenterBar: boolean;
  enableGrid: boolean;
  phiAngle: number;
  lQuantumNumber: number;
  mQuantumNumber: number;
}

function RotorArrow({ eulerRotation }: { eulerRotation: THREE.Euler }) {
  const shaftHeight = 20;
  const shaftRadius = 0.4;
  const coneRadius = 1;
  const coneHeight = 3;

  return (
    <group rotation={eulerRotation}>
      <mesh position={[0, shaftHeight / 2, 0]}>
        <cylinderGeometry args={[shaftRadius, shaftRadius, shaftHeight, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <mesh position={[0, shaftHeight + coneHeight / 2, 0]}>
        <coneGeometry args={[coneRadius, coneHeight, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  );
}

function CenterBar({
  distance,
  eulerRotation,
  frameRef,
}: {
  distance: number;
  eulerRotation: THREE.Euler;
  frameRef: RefObject<number>;
}) {
  const length = distance * 2;
  const innerGroupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (innerGroupRef.current) {
      innerGroupRef.current.rotation.y = frameRef.current;
    }
  });

  return (
    <group rotation={eulerRotation}>
      <group ref={innerGroupRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, length, 32]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </group>
    </group>
  );
}

function XYZAxes() {
  const axisRadius = 0.1;
  const axisLength = 500;

  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[axisRadius, axisRadius, axisLength, 12]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh>

      <mesh>
        <cylinderGeometry args={[axisRadius, axisRadius, axisLength, 12]} />
        <meshBasicMaterial color={0x00ff00} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[axisRadius, axisRadius, axisLength, 12]} />
        <meshBasicMaterial color={0x0000ff} />
      </mesh>
    </group>
  );
}

function SceneGrid() {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(5000, 100, 0x000000, 0x6f6f6f);
    const colors = g.geometry.attributes.color;

    for (let i = 0; i < colors.count; i++) {
      if (i < 4) {
        colors.setXYZ(i, 0, 0, 0);
      }
    }

    colors.needsUpdate = true;
    return g;
  }, []);

  return <primitive object={grid} />;
}

function RotorScene({
  sim,
  atom1Config,
  atom2Config,
}: {
  sim: SimConfig;
  atom1Config: AtomConfig;
  atom2Config: AtomConfig;
}) {
  const frameRef = useRef(0);
  const atom1GroupRef = useRef<THREE.Group>(null!);
  const atom2GroupRef = useRef<THREE.Group>(null!);

  const thetaAngleRadians = useMemo(() => {
    const l = sim.lQuantumNumber;
    const m = sim.mQuantumNumber;

    if (l === 0) return 0;

    const cosTheta = THREE.MathUtils.clamp(m / Math.sqrt(l * (l + 1)), -1, 1);

    return Math.acos(cosTheta);
  }, [sim.lQuantumNumber, sim.mQuantumNumber]);

  const axisEuler = useMemo(
    () => new THREE.Euler(0, sim.phiAngle * (Math.PI / 180), -thetaAngleRadians),
    [sim.phiAngle, thetaAngleRadians],
  );

  const position = useMemo(() => new THREE.Vector3(), []);

  useFrame((_state, delta) => {
    const effectiveSpeed = sim.lQuantumNumber === 0 ? 0 : sim.rotationalSpeed;
    frameRef.current += delta * effectiveSpeed;

    const r = sim.distanceBetweenAtoms;
    const angle = frameRef.current;

    if (atom1GroupRef.current) {
      position.set(r * Math.cos(-angle), 0, r * Math.sin(-angle));
      position.applyEuler(axisEuler);
      atom1GroupRef.current.position.copy(position);
    }

    if (atom2GroupRef.current) {
      position.set(-r * Math.cos(-angle), 0, -r * Math.sin(-angle));
      position.applyEuler(axisEuler);
      atom2GroupRef.current.position.copy(position);
    }
  });

  return (
    <>
      <RotorArrow eulerRotation={axisEuler} />

      {sim.showCenterBar && (
        <CenterBar distance={sim.distanceBetweenAtoms} eulerRotation={axisEuler} frameRef={frameRef} />
      )}

      <group ref={atom1GroupRef}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[atom1Config.size, 48, 32]} />
          <meshStandardMaterial color={atom1Config.color} roughness={1} metalness={0} />
        </mesh>

        {atom1Config.showOutline && (
          <mesh scale={1.05}>
            <sphereGeometry args={[atom1Config.size, 48, 32]} />
            <meshBasicMaterial color={atom1Config.outlineColor} side={THREE.BackSide} />
          </mesh>
        )}
      </group>
      <group ref={atom2GroupRef}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[atom2Config.size, 48, 32]} />
          <meshStandardMaterial color={atom2Config.color} roughness={1} metalness={0} />
        </mesh>

        {atom2Config.showOutline && (
          <mesh scale={1.05}>
            <sphereGeometry args={[atom2Config.size, 48, 32]} />
            <meshBasicMaterial color={atom2Config.outlineColor} side={THREE.BackSide} />
          </mesh>
        )}
      </group>

      {sim.enableGrid && <SceneGrid />}

      <XYZAxes />
      <ambientLight intensity={0.25} />
      <directionalLight position={[30, 40, 20]} intensity={1.2} castShadow />
      <directionalLight position={[-20, 15, -25]} intensity={0.35} />
    </>
  );
}

const triggerClass =
  "relative w-full text-xl font-bold border-t-2 border-zinc-500 pl-4 pt-4 pb-2 hover:cursor-pointer hover:text-zinc-400 transition-colors duration-200";

export default function RigidRotorSimulation2() {
  const [rotationalSpeed, setRotationalSpeed] = useState([5]);
  const [distanceBetweenAtoms, setDistanceBetweenAtoms] = useState([30]);
  const [phiAngle, setPhiAngle] = useState([0]);

  const [lQuantumNumber, setLQuantumNumber] = useState([5]);
  const [mQuantumNumber, setMQuantumNumber] = useState([0]);

  const [showCenterBar, setShowCenterBar] = useState(true);
  const [enableGrid, setEnableGrid] = useState(true);

  const [atom1Color, setAtom1Color] = useState("#389fff");
  const [atom1OutlineColor, setAtom1OutlineColor] = useState("#ffffff");
  const [atom1Outline, setAtom1Outline] = useState(false);
  const [atom1Size, setAtom1Size] = useState([7]);

  const [atom2Color, setAtom2Color] = useState("#389fff");
  const [atom2OutlineColor, setAtom2OutlineColor] = useState("#ffffff");
  const [atom2Outline, setAtom2Outline] = useState(false);
  const [atom2Size, setAtom2Size] = useState([7]);

  const l = lQuantumNumber[0];

  // Do not mutate state here; just derive a valid m from the current l.
  const effectiveM = Math.max(-l, Math.min(l, mQuantumNumber[0]));

  const sim: SimConfig = {
    rotationalSpeed: rotationalSpeed[0],
    distanceBetweenAtoms: distanceBetweenAtoms[0],
    showCenterBar,
    enableGrid,
    phiAngle: phiAngle[0],
    lQuantumNumber: l,
    mQuantumNumber: effectiveM,
  };

  const atom1Config: AtomConfig = {
    color: atom1Color,
    outlineColor: atom1OutlineColor,
    showOutline: atom1Outline,
    size: atom1Size[0],
  };

  const atom2Config: AtomConfig = {
    color: atom2Color,
    outlineColor: atom2OutlineColor,
    showOutline: atom2Outline,
    size: atom2Size[0],
  };

  const camera = {
    fov: 75,
    near: 0.1,
    far: 200000,
    position: [0, 50, 70] as [number, number, number],
  };

  const controllableVariables = (
    <div className="scrollContainer max-h-[700px]">
      <Accordion allowMultiple={true}>
        <AccordionItem id="sim-settings">
          <AccordionTrigger className={triggerClass}>Simulation Settings</AccordionTrigger>
          <AccordionContent>
            <Slider
              key="l-quantum"
              value={lQuantumNumber}
              onValueChange={setLQuantumNumber}
              label="Angular Quantum Number (l)"
              min={1}
              max={100}
              step={1}
            />

            <Slider
              key="m-quantum"
              value={[effectiveM]}
              onValueChange={setMQuantumNumber}
              label="Magnetic Quantum Number (m)"
              min={-l}
              max={l}
              step={1}
            />

            <Slider
              key="speed"
              value={rotationalSpeed}
              onValueChange={setRotationalSpeed}
              label="Rotational Speed"
              min={-10}
              max={10}
              step={0.01}
            />

            <Slider
              key="dist"
              value={distanceBetweenAtoms}
              onValueChange={setDistanceBetweenAtoms}
              label="Distance Between Atoms"
              min={5}
              max={60}
              step={0.5}
            />
            <Slider
              key="phi"
              value={phiAngle}
              onValueChange={setPhiAngle}
              label="Azimuth (Φ)"
              min={0}
              max={360}
              step={1}
            />

            <div className="flex flex-col gap-2 mt-3 px-2">
              {(
                [
                  ["Show Center Bar", showCenterBar, setShowCenterBar],
                  ["Enable Grid", enableGrid, setEnableGrid],
                ] as [string, boolean, (v: boolean) => void][]
              ).map(([label, value, setter]) => (
                <label key={label} className="flex justify-center gap-2 text-sm cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setter(e.target.checked)}
                    className="accent-blue-500 w-4 h-4"
                  />
                  {label}
                </label>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                className=" mt-4 mb-2 px-3 py-1 text-sm bg-zinc-200 hover:bg-zinc-600 rounded transition-colors"
                onClick={() => {
                  setPhiAngle([0]);
                  setLQuantumNumber([5]);
                  setMQuantumNumber([0]);
                  setRotationalSpeed([5]);
                  setDistanceBetweenAtoms([30]);
                  setShowCenterBar(true);
                  setEnableGrid(true);
                }}
              >
                Reset to Defaults
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="atom1-settings">
          <AccordionTrigger className={triggerClass}>Atom 1 Settings</AccordionTrigger>
          <AccordionContent>
            <Slider
              key="atom1-size"
              value={atom1Size}
              onValueChange={setAtom1Size}
              label="Size"
              min={1}
              max={20}
              step={0.5}
            />
            <div className="flex flex-col gap-3 mt-2 px-2">
              <label className="flex flex-col gap-1 text-sm">
                Color
                <input
                  type="color"
                  value={atom1Color}
                  onChange={(e) => setAtom1Color(e.target.value)}
                  className="w-10 h-7 cursor-pointer rounded border border-zinc-600"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Outline Color
                <input
                  type="color"
                  value={atom1OutlineColor}
                  onChange={(e) => setAtom1OutlineColor(e.target.value)}
                  className="w-10 h-7 cursor-pointer rounded border border-zinc-600"
                />
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={atom1Outline}
                  onChange={(e) => setAtom1Outline(e.target.checked)}
                  className="accent-blue-500 w-4 h-4"
                />
                Show Outline
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="atom2-settings">
          <AccordionTrigger className={triggerClass}>Atom 2 Settings</AccordionTrigger>
          <AccordionContent>
            <Slider
              key="atom2-size"
              value={atom2Size}
              onValueChange={setAtom2Size}
              label="Size"
              min={1}
              max={20}
              step={0.5}
            />
            <div className="flex flex-col gap-3 mt-2 px-2">
              <label className="flex flex-col gap-1 text-sm">
                Color
                <input
                  type="color"
                  value={atom2Color}
                  onChange={(e) => setAtom2Color(e.target.value)}
                  className="w-10 h-7 cursor-pointer rounded border border-zinc-600"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                Outline Color
                <input
                  type="color"
                  value={atom2OutlineColor}
                  onChange={(e) => setAtom2OutlineColor(e.target.value)}
                  className="w-10 h-7 cursor-pointer rounded border border-zinc-600"
                />
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={atom2Outline}
                  onChange={(e) => setAtom2Outline(e.target.checked)}
                  className="accent-blue-500 w-4 h-4"
                />
                Show Outline
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="simulationContainer">
      <SimulationControls controllableSimulationVariables={controllableVariables} />
      <div className="threeCanvas">
        <Canvas camera={camera} scene={{ background: new THREE.Color(0x000000) }}>
          <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
          <RotorScene sim={sim} atom1Config={atom1Config} atom2Config={atom2Config} />
        </Canvas>
      </div>
    </div>
  );
}
