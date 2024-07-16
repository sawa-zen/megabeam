import { Canvas, ThreeElements } from '@react-three/fiber'
import { MegaBeam } from '~/components/Megabeam';
import { OrbitControls } from "@react-three/drei";

export default function Index() {
  return (
    <div>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {/** SkySphere */}
        <mesh>
          <sphereGeometry args={[100, 60, 40]} />
          <meshBasicMaterial side={2} color="skyblue" />
        </mesh>
        <MegaBeam position={[0, 0, 4]} />
      </Canvas>
    </div>
  );
}
