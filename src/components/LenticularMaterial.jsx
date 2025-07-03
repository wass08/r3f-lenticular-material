import { extend } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import {
  mix,
  positionLocal,
  step,
  texture,
  uniform,
  uv,
  vec3,
} from "three/tsl";
import { MeshStandardNodeMaterial } from "three/webgpu";

extend({
  MeshStandardNodeMaterial,
});

export const LenticularMaterial = ({
  textureA,
  textureB,
  nbDivisions,
  height,
}) => {
  const { nodes, uniforms } = useMemo(() => {
    const uniforms = {
      uNbDivisions: uniform(nbDivisions),
      uHeight: uniform(height),
    };
    const texA = texture(textureA);
    const texB = texture(textureB);

    const repeatedUvs = uv().x.mul(uniforms.uNbDivisions).fract();
    const linedUvs = step(0.5, repeatedUvs);

    return {
      uniforms,
      nodes: {
        colorNode: mix(texA, texB, linedUvs),
        positionNode: positionLocal.add(
          vec3(
            0,
            0,
            mix(uniforms.uHeight.negate(), uniforms.uHeight, repeatedUvs.x)
          )
        ),
      },
    };
  }, []);

  useEffect(() => {
    uniforms.uHeight.value = height;
    uniforms.uNbDivisions.value = nbDivisions;
  }, [height, nbDivisions]);

  return <meshStandardNodeMaterial {...nodes} />;
};
