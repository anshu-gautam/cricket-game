import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Stadium from "../../scenes/stadium/Stadium";
import Ball from "./Ball";
import Bat from "./Bat";
import Player from "./Player";
import { Suspense } from "react";
import LoadingScreen from "../ui/LoadingScreen";
import GameUI from "../ui/GameUI";
import useGameStore from "../../store/gameStore";

const CricketGame = () => {
  const isPlaying = useGameStore((state) => state.isPlaying);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#87CEEB" }}>
      <Canvas
        shadows
        camera={{ position: [20, 20, 20], fov: 50 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#87CEEB"]} />
          <fog attach="fog" args={["#87CEEB", 30, 100]} />

          {/* Lighting setup */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <hemisphereLight
            intensity={0.5}
            color="#87CEEB"
            groundColor="#2f6c2f"
          />

          <Physics
            gravity={[0, -9.81, 0]}
            defaultContactMaterial={{
              friction: 0.9,
              restitution: 0.7,
            }}
          >
            <Stadium />
            {isPlaying && (
              <>
                {/* Batting position at one end of the pitch */}
                <group position={[0, 0, 8]}>
                  <Player position={[0, 1, 0]} />
                  <Bat
                    position={[0.5, 1.2, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                  />
                </group>

                {/* Bowling position at the other end */}
                <Ball position={[0, 1.5, -8]} />
              </>
            )}
          </Physics>
          <OrbitControls
            makeDefault
            maxPolarAngle={Math.PI / 2}
            minDistance={5}
            maxDistance={50}
            target={[0, 1, 8]} // Focus camera on batting position
          />
        </Suspense>
      </Canvas>
      <div
        style={{
          position: "fixed",
          bottom: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          textAlign: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Press SPACE to swing the bat
      </div>
      <GameUI />
      <LoadingScreen />
    </div>
  );
};

export default CricketGame;
