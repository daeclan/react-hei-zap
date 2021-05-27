import React, { Suspense } from "react";
import { Canvas, useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./styles.css";


export default function App() {
  return <Canvas style={{ background: "#171717" }}></Canvas>;
}

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function daZapper() {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, "./models/zapper.gltf");
  useFrame(() => {
    group.current.rotation.y += 0.004;
  });
  return (
    <group>
      <mesh visible geometry={nodes.Default.geometry}>
        <meshStandardMaterial
          attach="material"
          color="white"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

export default function App() {
  return (
    <Canvas style={{ background: "#171717" }}>
      <directionalLight intensity={0.5} />
      <Suspense fallback={<Loading />}>
        <daZapper />
      </Suspense>
    </Canvas>
  );
}