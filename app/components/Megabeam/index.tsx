import * as THREE from 'three'
import { useRef } from 'react'
import { ThreeElements, useFrame } from '@react-three/fiber'
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment.glsl?raw'

// https://youtu.be/a_2fEMJeXhM?t=599
export const MegaBeam = (props: ThreeElements['mesh']) => {
  // This reference will give us direct access to the mesh
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  // Set up state for the hovered and active state
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // Return view, these are regular three.js elements expressed in JSX

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  })

  return (
    <mesh {...props}>
      <planeGeometry args={[10, 0.3]} />
      <shaderMaterial
        ref={materialRef}
        side={THREE.DoubleSide}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        depthWrite
        transparent
        uniforms={{
          u_resolution: { value: [window.innerWidth, window.innerHeight] },
          u_time: { value: 0.0 }
        }}
      />
    </mesh>
  )
}