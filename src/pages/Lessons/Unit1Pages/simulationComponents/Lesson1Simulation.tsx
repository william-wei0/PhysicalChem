import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Slider from "../../../../components/simulationControls/Slider";
import SimulationControls from "../../../../components/simulationControls/SimulationControls";
import "../../styles/canvas.css"

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



export default function Lesson1SimulationComponent() {
  const [volumeValue, setVolumeValue] = useState([75]);
  const [tempValue, setTempValue] = useState([75]);
  const [numValue, setNumValue] = useState([75]);
  const [particleValue, setParticleValue] = useState([75]);

  const controllableSimulationVariables: React.ReactNode[] = [
    <Slider
      key={"1"}
      value={volumeValue}
      onValueChange={setVolumeValue}
      label="Volume"
      min={0}
      max={1000}
    />,
    <Slider
      key={"2"}
      value={tempValue}
      onValueChange={setTempValue}
      label="Temperature"
      min={0}
      max={1000}
    />,
    <Slider
      key={"3"}
      value={numValue}
      onValueChange={setNumValue}
      label="Number of Particles"
      min={0}
      max={1000}
    />,
    <Slider
      key={"4"}
      value={particleValue}
      onValueChange={setParticleValue}
      label="Particle Density"
      min={0}
      max={1000}
    />,
  ];

  const camera: {
    fov: number;
    near: number;
    far: number;
    position: [number, number, number];
  } = { fov: 75, near: 0.1, far: 1000, position: [0, 0, 5] };

  return (
    <>
      <div className="simulation-container">
        <SimulationControls controllableSimulationVariables={controllableSimulationVariables} />
        <div className="canvas">
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
