import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { usePlane } from "@react-three/cannon";
import { MeshStandardMaterial } from "three";

const Stadium = () => {
  // Create a reference for the ground
  const groundRef = useRef();

  // Create a physics-enabled ground plane
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: "Static",
  }));

  // Create the cricket pitch dimensions (in meters)
  const pitchLength = 20.12; // Length of a cricket pitch
  const pitchWidth = 3.05; // Width of a cricket pitch

  return (
    <group>
      {/* Ground */}
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#2f6c2f"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Cricket Pitch */}
      <mesh
        position={[0, 0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[pitchWidth, pitchLength]} />
        <meshStandardMaterial
          color="#c4a484"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Boundary Circle */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 45, 64]} />
        <meshStandardMaterial
          color="#ffffff"
          opacity={0.5}
          transparent
          roughness={0.4}
        />
      </mesh>
    </group>
  );
};

export default Stadium;
