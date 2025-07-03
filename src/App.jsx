import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

import { useState } from "react";
import { WebGPURenderer } from "three/webgpu";

function App() {
  const [frameloop, setFrameloop] = useState("never");
  return (
    <Canvas
      shadows
      camera={{ position: [3, 3, 3], fov: 30 }}
      frameloop={frameloop}
      gl={(canvas) => {
        const renderer = new WebGPURenderer({
          canvas,
          powerPreference: "high-performance",
          antialias: true,
          alpha: false,
          stencil: false,
          shadowMap: true,
        });
        renderer.init().then(() => {
          setFrameloop("always");
        });
        return renderer;
      }}
    >
      <color attach="background" args={["#ececec"]} />
      <Experience />
    </Canvas>
  );
}

export default App;
