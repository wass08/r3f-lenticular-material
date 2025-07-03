import {
  Environment,
  OrbitControls,
  useTexture,
  useVideoTexture,
} from "@react-three/drei";
import { useControls } from "leva";
import { LenticularMaterial } from "./LenticularMaterial";

export const Experience = () => {
  const { textureSet, nbDivisions, height } = useControls({
    textureSet: {
      value: "evil-angel",
      options: ["evil-angel", "summer-winter", "mathematics-twerk"],
    },
    nbDivisions: {
      min: 10,
      max: 90,
      value: 90,
      step: 10,
      label: "Number of Divisions",
    },
    height: {
      min: 0.001,
      max: 0.2,
      value: 0.05,
      step: 0.001,
      label: "Height",
    },
  });

  const videoA = useVideoTexture("textures/mathematics-twerk/twerk-course.mp4");
  const videoB = useVideoTexture(
    "textures/mathematics-twerk/mathematics-numbers.mp4"
  );

  const textureEvilAngelA = useTexture("textures/evil-angel/evil.png");
  const textureEvilAngelB = useTexture("textures/evil-angel/angel.png");

  const textureSummerWinterA = useTexture("textures/summer-winter/summer.png");
  const textureSummerWinterB = useTexture("textures/summer-winter/winter.png");

  const textureA = {
    ["evil-angel"]: textureEvilAngelA,
    ["summer-winter"]: textureSummerWinterA,
    ["mathematics-twerk"]: videoA,
  }[textureSet];

  const textureB = {
    ["evil-angel"]: textureEvilAngelB,
    ["summer-winter"]: textureSummerWinterB,
    ["mathematics-twerk"]: videoB,
  }[textureSet];

  return (
    <>
      <OrbitControls />
      <Environment preset="sunset" />
      <mesh>
        <planeGeometry args={[1, 1, nbDivisions * 2, 1]} />
        <LenticularMaterial
          key={textureSet}
          textureA={textureA}
          textureB={textureB}
          nbDivisions={nbDivisions}
          height={height}
        />
      </mesh>
    </>
  );
};
