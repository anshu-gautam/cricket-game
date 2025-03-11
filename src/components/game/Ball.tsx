import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import useGameStore from "../../store/gameStore";

interface BallProps {
  position?: [number, number, number];
  velocity?: [number, number, number];
}

const Ball = ({ position = [0, 1, 0], velocity = [0, 0, 0] }: BallProps) => {
  const [ref, api] = useSphere(() => ({
    mass: 0.163, // Mass of a cricket ball in kg
    position,
    args: [0.036], // Radius of a cricket ball in meters
    linearDamping: 0.1,
    angularDamping: 0.1,
    material: {
      friction: 0.5,
      restitution: 0.8,
    },
  }));

  const velocity_ref = useRef(new Vector3(...velocity));
  const isBowling = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "KeyB" && !isBowling.current) {
        isBowling.current = true;
        // Bowl the ball towards the batsman with some speed and spin
        api.velocity.set(0, 2, 16); // Upward and forward motion
        api.angularVelocity.set(10, 0, 0); // Top spin
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "KeyB") {
        isBowling.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [api]);

  useFrame(() => {
    api.velocity.subscribe((v) => {
      velocity_ref.current.set(v[0], v[1], v[2]);
    });
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[0.036, 32, 32]} />
      <meshStandardMaterial
        color="#cc0000"
        roughness={0.3}
        metalness={0.4}
        envMapIntensity={1}
      />
    </mesh>
  );
};

export default Ball;
