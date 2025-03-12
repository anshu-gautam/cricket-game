import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import useGameStore from "../../store/gameStore";
import { Quaternion, Vector3, Group } from "three";

const Batsman = () => {
  const batsmanRef = useRef();
  const batRef = useRef<Group>(null);
  const isSwinging = useRef(false);
  const initialBatPosition = [0.5, 1.2, 8];
  const initialBatRotation = [0, Math.PI / 2, 0];

  // Create batsman physics body (static, doesn't move)
  const [batsmanBody] = useBox(() => ({
    mass: 0,
    position: [0, 1, 8], // At batting crease
    args: [0.5, 1.8, 0.5], // Human dimensions
    type: "Static",
  }));

  // Create bat physics body
  const [batBody] = useBox(() => ({
    mass: 0, // Make bat massless since it's attached to batsman
    position: initialBatPosition,
    rotation: initialBatRotation,
    type: "Static", // Make bat static
    args: [0.1, 0.85, 0.1], // Cricket bat dimensions
    onCollide: (e) => {
      if (e.body.mass === 0.163) {
        // If colliding with cricket ball
        const hitPower = isSwinging.current ? 20 : 5;
        e.body.applyImpulse(
          [
            e.contact.ni[0] * hitPower,
            e.contact.ni[1] * hitPower + 2,
            e.contact.ni[2] * hitPower,
          ],
          [0, 0, 0]
        );
        // Update score based on hit power
        if (isSwinging.current) {
          const runs = Math.floor(Math.random() * 6) + 1; // Random runs between 1 and 6
          useGameStore.getState().actions.updateScore(runs);
        }
      }
    },
  }));

  // Handle bat swing animation
  useFrame(() => {
    if (!batRef.current) return;

    if (isSwinging.current) {
      // Animate bat swing
      batRef.current.rotation.x += 0.2;
      batRef.current.rotation.y += 0.1;

      // Reset swing after animation
      if (batRef.current.rotation.x > Math.PI / 2) {
        isSwinging.current = false;
        batRef.current.rotation.set(0, Math.PI / 2, 0);
      }
    }
  });

  useEffect(() => {
    const handleSwing = (e: KeyboardEvent) => {
      if (e.code === "Space" && !isSwinging.current) {
        isSwinging.current = true;
      }
    };

    window.addEventListener("keydown", handleSwing);
    return () => window.removeEventListener("keydown", handleSwing);
  }, []);

  return (
    <group ref={batsmanRef}>
      {/* Batsman body */}
      <mesh ref={batsmanBody} castShadow>
        {/* Body */}
        <boxGeometry args={[0.5, 1.8, 0.5]} />
        <meshStandardMaterial color="#1e3799" />

        {/* Head */}
        <mesh position={[0, 1.1, 0]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>

        {/* Cricket bat - attached to batsman */}
        <group
          ref={batRef}
          position={[0.5, 0.2, 0]}
          rotation={[0, Math.PI / 2, 0]}
        >
          {/* Bat handle */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.3, 16]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>

          {/* Bat blade */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.1, 0.55, 0.02]} />
            <meshStandardMaterial color="#DEB887" />
          </mesh>
        </group>
      </mesh>
    </group>
  );
};

export default Batsman;
