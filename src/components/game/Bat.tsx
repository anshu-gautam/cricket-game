import { useRef, useEffect } from "react";
import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { Vector3, Quaternion } from "three";
import useGameStore from "../../store/gameStore";

interface BatProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const Bat = ({ position = [0, 1, 2], rotation = [0, 0, 0] }: BatProps) => {
  const [ref, api] = useBox(() => ({
    mass: 1.2, // Mass of a cricket bat in kg
    position,
    rotation,
    args: [0.108, 0.6, 0.04], // Width, length, depth in meters
    type: "Dynamic",
  }));

  const velocity = useRef(new Vector3());
  const angularVel = useRef(new Vector3());
  const swingPower = useRef(0);
  const isSwinging = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isSwinging.current) {
        isSwinging.current = true;
        swingPower.current = 10;
        api.velocity.set(0, 2, -5); // Upward and forward motion
        api.angularVelocity.set(0, 0, -5); // Rotational swing
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        isSwinging.current = false;
        api.velocity.set(0, 0, 0);
        api.angularVelocity.set(0, 0, 0);
        // Reset bat position
        api.position.set(position[0], position[1], position[2]);
        api.rotation.set(rotation[0], rotation[1], rotation[2]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [api, position, rotation]);

  useFrame(() => {
    api.velocity.subscribe((v) => velocity.current.set(v[0], v[1], v[2]));
    api.angularVelocity.subscribe((v) =>
      angularVel.current.set(v[0], v[1], v[2])
    );
  });

  return (
    <mesh ref={ref} castShadow>
      {/* Bat handle */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.3, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>

      {/* Bat blade */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.108, 0.4, 0.04]} />
        <meshStandardMaterial color="#DEB887" roughness={0.6} />
      </mesh>
    </mesh>
  );
};

export default Bat;
