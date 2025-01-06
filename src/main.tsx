import { createRoot } from 'react-dom/client'
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './styles.css'
import type { Mesh } from 'three'

interface BoxProps {
  position: [number, number, number]
}

function Box(props: BoxProps) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh | null>(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta
  })
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(_event) => setActive(!active)}
      onPointerOver={(_event) => setHover(true)}
      onPointerOut={(_event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const root = document.getElementById('root')
if (!root) throw new Error('No root element')

createRoot(root).render(
  <Canvas>
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <mesh>
      <planeGeometry args={[5, 0.5]} />
      <meshBasicMaterial color="lightblue" />
    </mesh>
  </Canvas>,
)
