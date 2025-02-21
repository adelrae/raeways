import * as THREE from "three";
import { Environment, shaderMaterial, Sphere } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { Gradient, LayerMaterial } from "lamina";
import { useRef } from "react";

const Background = ({ backgroundColors }) => {
  const texture = useLoader(
    RGBELoader,
    "./environmentMaps/autumn_field_puresky_1k.hdr"
  );

  // const colorA = "#020EC1";
  // const colorB = "#F8F9FF";
  const start = 0.2;
  const end = -0.7;

  const gradientRef = useRef();
  const gradientEnvRef = useRef();

  useFrame(() => {
    if (backgroundColors.current) {
      gradientRef.current.colorA = new THREE.Color(
        backgroundColors.current.colorA
      );
      gradientRef.current.colorB = new THREE.Color(
        backgroundColors.current.colorB
      );

      gradientEnvRef.current.colorA = new THREE.Color(
        backgroundColors.current.colorA
      );
      gradientEnvRef.current.colorB = new THREE.Color(
        backgroundColors.current.colorB
      );
    }
  });

  return (
    <>
      {/* <Environment
        background
        resolution={256}
        blur={0.1}
        environmentIntensity={1}
      >
        <mesh rotation={[0, 0, 1.2]} scale={2}>
          <sphereGeometry />
          <meshBasicMaterial opacity={1} map={texture} side={THREE.BackSide} />
        </mesh>
      </Environment> */}

      <Sphere scale={[500, 500, 500]} rotation-y={Math.PI / 2}>
        <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
          <Gradient ref={gradientRef} axes={"y"} start={start} end={end} />
        </LayerMaterial>
      </Sphere>
      <Environment resolution={256} frames={Infinity}>
        <Sphere
          scale={[100, 100, 100]}
          rotation-y={Math.PI / 2}
          rotation-x={Math.PI}
        >
          <LayerMaterial color={"#ffffff"} side={THREE.BackSide}>
            <Gradient ref={gradientEnvRef} axes={"y"} start={start} end={end} />
          </LayerMaterial>
        </Sphere>
      </Environment>
    </>
  );
};

export default Background;
