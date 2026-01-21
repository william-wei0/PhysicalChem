import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Slider from "../../../../components/controls/Slider";
import useSliders from "../../../../hooks/useSlider";

type variableState = {
  id: string;
  label?: string;
  value: number[];
  updateValue: (value: number[]) => void;
  min?: number;
  max?: number;
};

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((_state, delta) => (meshRef.current.rotation.x += delta));
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(_event) => setActive(!active)}
      onPointerOver={(_event) => setHover(true)}
      onPointerOut={(_event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "#2f74c0"} />
    </mesh>
  );
}

function SimulationControls({controllableVariables} : {controllableVariables: variableState[]}) {
  return (
    <div className="absolute z-10 h-max-full overflow-scroll">
      {controllableVariables.map((variable) => {
        return (
          <Slider
            key={variable.id}
            value={variable.value}
            onValueChange={variable.updateValue}
            min={0}
            max={1000}
          />
        );
      })}
    </div>
  );
}

export default function Lesson1SimulationComponent() {
  const { variables, getVariables } = useSliders(
    {
      volume: 75,
      temp: 75,
      num: 75,
      particle: 75,
    },
    {
      volume: { label: "Volume (L)", min: 0, max: 1000 },
      temp: { label: "Temperature (K)", min: 0, max: 500 },
      num: { label: "Number of Particles", min: 1, max: 1000 },
      particle: { label: "Particle Size", min: 1, max: 100 },
    }
  );
  console.log(variables.volume, variables.temp);

  const camera: {
    fov: number;
    near: number;
    far: number;
    position: [number, number, number];
  } = { fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] };

  return (
    <>
      <div className="page-div min-h-165 flex p-0 border-2 border-amber-300 relative">
        <SimulationControls controllableVariables={getVariables()} />
        <div className="canvas-div flex-1 z-0">
          <Canvas camera={camera}>
            <OrbitControls makeDefault />
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              decay={0}
              intensity={Math.PI}
            />
            <pointLight
              position={[-10, -10, -10]}
              decay={0}
              intensity={Math.PI}
            />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
          </Canvas>
        </div>
      </div>
    </>
  );
}
