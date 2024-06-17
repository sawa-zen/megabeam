import * as THREE from 'three'
import { useRef, useState } from 'react'
import { ThreeElements, useFrame } from '@react-three/fiber'

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec2 u_resolution;
  uniform float u_time;
  varying vec2 vUv;

  void main() {
    vec2 st = vUv * u_resolution;
    st.x *= u_resolution.x / u_resolution.y;

    float barWidth = 5.0;
    float speed = 50.0;
    float color = step(5.0, mod(st.x + u_time * speed, 10.0));

    gl_FragColor = vec4(vec3(color, 1.0, 1.0), 1.0);
  }
`;


// https://youtu.be/a_2fEMJeXhM?t=599
export const MegaBeam = (props: ThreeElements['mesh']) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null!)
  // Set up state for the hovered and active state
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // Return view, these are regular three.js elements expressed in JSX

  useFrame(({ clock }) => {
    if (meshRef.current) {
      console.log('clock', clock.getElapsedTime());
      meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();
    }
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
    >
      <planeGeometry args={[10, 0.3]} />
      <shaderMaterial
        side={THREE.DoubleSide}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        uniforms={{
          u_resolution: { value: [window.innerWidth, window.innerHeight] },
          u_time: { value: 0.0 }
        }}
      />
    </mesh>
  )
}