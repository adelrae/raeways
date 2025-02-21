import { useGLTF } from "@react-three/drei";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Cloud = ({ sceneOpacity, ...props }) => {
  const { nodes, materials } = useGLTF("./models/cloud/cloud_22.glb");

  const materialRef = useRef();

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.opacity = sceneOpacity.current;
    }
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.secondballcloud001.geometry}
      >
        <meshStandardMaterial
          ref={materialRef}
          onBeforeCompile={fadeOnBeforeCompile}
          envMapIntensity={2}
          transparent={true}
        />
      </mesh>
    </group>
  );
};

export default Cloud;

useGLTF.preload("./models/cloud/cloud_22.glb");
