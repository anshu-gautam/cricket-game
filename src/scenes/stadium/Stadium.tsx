import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { usePlane } from "@react-three/cannon";
import { MeshStandardMaterial } from "three";
import { TextureLoader, RepeatWrapping } from 'three'
import { useLoader } from '@react-three/fiber'

const Stadium = () => {
  // Create a physics-enabled ground plane
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    type: "Static",
  }));

  // Cricket pitch dimensions (in meters)
  const pitchLength = 20.12; // Standard cricket pitch length
  const pitchWidth = 3.05; // Standard cricket pitch width

  // Create the field dimensions
  const fieldRadius = 70; // Typical cricket field radius

  return (
    <group>
      {/* Main Ground */}
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[150, 150]} />
        <meshStandardMaterial
          color="#2f6c2f"
          roughness={1}
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
          color="#d4b886"
          roughness={0.8}
        />
      </mesh>

      {/* Crease Lines */}
      <group>
        {/* Batting Crease */}
        <mesh
          position={[0, 0.02, pitchLength/2 - 1.22]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[pitchWidth + 0.5, 0.1]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* Bowling Crease */}
        <mesh
          position={[0, 0.02, -pitchLength/2 + 1.22]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[pitchWidth + 0.5, 0.1]} />
          <meshStandardMaterial color="white" />
        </mesh>
      </group>

      {/* Boundary Rope */}
      <mesh
        position={[0, 0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[fieldRadius - 0.2, fieldRadius, 64]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};

export default Stadium;
