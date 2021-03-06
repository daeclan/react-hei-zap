import React, { Suspense, useRef } from "react";
import {
  Canvas,
  useLoader,
  useFrame,
  extend,
  useThree
} from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./styles.css";

extend({ OrbitControls });

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="black"
        transparent
        opacity={1.0}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function DaZapper() {
  const group = useRef();
  const { nodes } = useLoader(GLTFLoader, "./models/zapper.gltf");
  return (
    <group>
      <mesh visible geometry={nodes.geometry}>
        <meshStandardMaterial
          attach="material"
          color="black"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(state => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={false}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={0}
    />
  );
};

export default function App() {
  return (
    <>
      <Canvas style={{ background: "white" }}>
        <CameraControls />
        <directionalLight intensity={0.5} />
        <Suspense fallback={<Loading />}>
          <DaZapper />
        </Suspense>
      </Canvas>
    </>
  );
}