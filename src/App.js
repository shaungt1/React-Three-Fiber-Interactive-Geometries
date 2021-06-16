import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Hex(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 2 : 1}
      onClick={(e) => setActive(!active || console.log("Box # 1 was clicked"))}
      // when <Hex/> is clicked I want to identify with a popup of conole each individual compnent clockwise
      // onClick={(e) => { if  (window.confirm('You Selected box # 1')) this.setActive(!active) } }
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <sphereGeometry args={[1, 8, 5]} />
      <meshStandardMaterial color={hovered ? 0x49ef4 : 0x10e5dc} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas style={{ height: "100%", background: "000000", width: "auto" }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/* <Modal/>  to to activate pop up when sphere is clicked*/}
      <Hex position={[-2.8, 0, 0]} />
      <Hex position={[2.8, 0, 0]} />
      <Hex position={[0, -2.8, 0]} />
      <Hex position={[0, 2.8, 0]} />
    </Canvas>
  );
}
