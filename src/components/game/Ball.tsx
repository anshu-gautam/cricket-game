import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import useGameStore from "../../store/gameStore";

const Ball = () => {
  const ballRef = useRef();
  const initialPosition = [0, 1.2, -10]; // Start from bowling end
  const position = useRef(initialPosition);

  const [ref, api] = useSphere(() => ({
    mass: 0.163, // Mass of a cricket ball in kg
    position: initialPosition,
    args: [0.036], // Radius of a cricket ball in meters
    linearDamping: 0.3,
    angularDamping: 0.2,
    onCollide: (e) => {
      if (e.body.mass === 0) {
        // Collision with ground or static objects
        useGameStore.getState().actions.updateOvers();
      }
    },
  }));

  const velocity = useRef([0, 0, 0]);
  const isBowling = useRef(false);
  const gameStore = useGameStore();

  useEffect(() => {
    const unsubPosition = api.position.subscribe((pos) => {
      position.current = pos;
    });
    const unsubVelocity = api.velocity.subscribe((v) => {
      velocity.current = v;
    });

    const bowl = () => {
      if (!isBowling.current && gameStore.isPlaying) {
        isBowling.current = true;

        // Realistic bowling variations
        const bowlingSpeed = 30 + Math.random() * 10; // 30-40 m/s (108-144 km/h)
        const swing = (Math.random() - 0.5) * 4; // Random swing
        const spin = Math.random() * 2 - 1; // Random spin

        api.velocity.set(
          swing, // Sideways movement
          4 + Math.random(), // Upward component for bounce
          bowlingSpeed // Forward speed
        );
        api.angularVelocity.set(spin * 10, 0, 0); // Add spin
        api.position.set(...initialPosition);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "KeyB" && gameStore.gameMode === "MULTIPLAYER") {
        bowl();
      }
    };

    // Set up AI bowling for single-player mode
    let bowlingInterval: NodeJS.Timeout;
    if (gameStore.gameMode === "SINGLE_PLAYER" && gameStore.isPlaying) {
      bowlingInterval = setInterval(() => {
        if (!isBowling.current) {
          bowl();
        }
      }, 5000); // Bowl every 5 seconds
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (bowlingInterval) clearInterval(bowlingInterval);
      unsubPosition();
      unsubVelocity();
    };
  }, [api, gameStore.gameMode, gameStore.isPlaying]);

  // Reset ball if it goes too far
  useFrame(() => {
    const [x, y, z] = velocity.current;
    const speed = Math.sqrt(x * x + y * y + z * z);

    if (speed < 0.1) {
      isBowling.current = false;
    }

    // Reset ball if it goes out of bounds
    const [px, py, pz] = position.current;
    if (Math.abs(px) > 50 || Math.abs(pz) > 50 || py < 0) {
      api.position.set(...initialPosition);
      api.velocity.set(0, 0, 0);
      isBowling.current = false;
    }
  });

  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.036, 32, 32]} />
      <meshStandardMaterial color="#c41e3a" roughness={0.3} />
    </mesh>
  );
};

export default Ball;
