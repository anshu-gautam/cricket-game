import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Stadium from "../../scenes/stadium/Stadium";
import Ball from "./Ball";
import Batsman from "./Batsman";
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
        camera={{ position: [0, 15, 20], fov: 45 }}
        gl={{ antialias: true }}
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
                <Batsman />
                <Ball />
              </>
            )}
          </Physics>
          <OrbitControls
            makeDefault
            maxPolarAngle={Math.PI / 2.5}
            minDistance={10}
            maxDistance={50}
            target={[0, 1, 8]} // Focus camera on batting position
          />
        </Suspense>
      </Canvas>
      <div
        style={{
          position: "fixed",
          bottom: "120px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "15px",
          borderRadius: "8px",
          textAlign: "center"
        }}
      >
        <p>Press <strong>B</strong> to bowl</p>
        <p>Press <strong>SPACE</strong> to bat</p>
      </div>
      <GameUI />
      <LoadingScreen />
    </div>
  );
};

export default CricketGame;
