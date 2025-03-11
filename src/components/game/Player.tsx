import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useBox } from '@react-three/cannon'

const Player = ({ position = [0, 1, 0] }) => {
  const [ref] = useBox(() => ({
    mass: 70, // Average human mass in kg
    position,
    type: "Dynamic",
    fixedRotation: true,
    args: [0.5, 1.8, 0.5], // Width, height, depth in meters
  }))

  return (
    <group>
      {/* Body */}
      <mesh ref={ref} castShadow>
        <boxGeometry args={[0.5, 1.8, 0.5]} />
        <meshStandardMaterial color="#1e88e5" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Cricket Helmet */}
      <mesh position={[0, 2.2, 0]} scale={1.1} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#2f3640" opacity={0.9} transparent />
      </mesh>

      {/* Leg Guards */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.6, 1, 0.3]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

export default Player 