import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { ScrollControls } from "@react-three/drei";
import Overlay from "./components/Overlay";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { usePlay } from "./contexts/Play";

function App() {
  const { play, end } = usePlay();

  return (
    <>
      <Canvas
        gl={{
          antialias: true,
        }}
      >
        <color attach="background" args={["#ececec"]} />
        <ScrollControls
          pages={play && !end ? 20 : 0}
          damping={0.5}
          style={{
            top: "10px",
            left: "0px",
            bottom: "10px",
            right: "10px",
            width: "auto",
            height: "auto",
            animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
            opacity: 0,
          }}
        >
          <Experience />
        </ScrollControls>
        <EffectComposer multisampling={0}>
          <Noise opacity={0.2} />
        </EffectComposer>
      </Canvas>
      <Overlay />
    </>
  );
}

export default App;
