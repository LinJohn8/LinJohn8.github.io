"use client"

import { useEffect, useRef, useCallback } from "react"

/**
 * Neural Universe Visualization
 * Combines: neural-network nodes with glowing synaptic connections,
 * cosmic nebula particle clouds, and morphing geometric attractors.
 * All rendered with Three.js additive blending for a premium glow effect.
 */

const CORE_POINTS = 18000
const NEBULA_POINTS = 6000
const NODE_COUNT = 60
const CONNECTION_OPACITY = 0.12
const TRANSITION_SPEED = 0.0025

// Shape generators for the core particle system
type ShapeGen = () => Float32Array

const shapes: Record<string, ShapeGen> = {
  // Neural network / brain-like cluster
  neuralBrain: () => {
    const p = new Float32Array(CORE_POINTS * 3)
    for (let i = 0; i < CORE_POINTS; i++) {
      // Brain-like two-lobe gaussian distribution
      const lobe = Math.random() > 0.5 ? 1 : -1
      const r = 22 * Math.pow(Math.random(), 0.6)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta) + lobe * 8
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8
      p[i * 3 + 2] = r * Math.cos(phi) * 0.7 + (Math.random() - 0.5) * 4
    }
    return p
  },
  // Cosmic galaxy spiral
  galaxySpiral: () => {
    const p = new Float32Array(CORE_POINTS * 3)
    const arms = 3
    for (let i = 0; i < CORE_POINTS; i++) {
      const arm = i % arms
      const t = (i / CORE_POINTS) * 6 + (arm * Math.PI * 2) / arms
      const r = 5 + t * 4.5
      const scatter = (1 + t * 0.3) * (Math.random() - 0.5) * 2.5
      const scatter2 = (1 + t * 0.2) * (Math.random() - 0.5) * 2.5
      p[i * 3] = r * Math.cos(t) + scatter
      p[i * 3 + 1] = (Math.random() - 0.5) * (2 + t * 0.3)
      p[i * 3 + 2] = r * Math.sin(t) + scatter2
    }
    return p
  },
  // DNA double helix
  dnaHelix: () => {
    const p = new Float32Array(CORE_POINTS * 3)
    const radius = 12, height = 55, turns = 8
    for (let i = 0; i < CORE_POINTS; i++) {
      const t = (i / CORE_POINTS) * Math.PI * 2 * turns
      const z = (i / CORE_POINTS) * height - height / 2
      const strand = i % 3
      if (strand === 0) {
        p[i * 3] = radius * Math.cos(t) + (Math.random() - 0.5) * 1.5
        p[i * 3 + 1] = z
        p[i * 3 + 2] = radius * Math.sin(t) + (Math.random() - 0.5) * 1.5
      } else if (strand === 1) {
        p[i * 3] = radius * Math.cos(t + Math.PI) + (Math.random() - 0.5) * 1.5
        p[i * 3 + 1] = z
        p[i * 3 + 2] = radius * Math.sin(t + Math.PI) + (Math.random() - 0.5) * 1.5
      } else {
        // Cross-links
        const blend = Math.random()
        p[i * 3] = radius * Math.cos(t) * blend + radius * Math.cos(t + Math.PI) * (1 - blend)
        p[i * 3 + 1] = z + (Math.random() - 0.5) * 0.5
        p[i * 3 + 2] = radius * Math.sin(t) * blend + radius * Math.sin(t + Math.PI) * (1 - blend)
      }
    }
    return p
  },
  // Lorenz attractor (chaos/butterfly)
  lorenzChaos: () => {
    const p = new Float32Array(CORE_POINTS * 3)
    let x = 0.1, y = 0, z = 0
    const dt = 0.006, sigma = 10, rho = 28, beta = 8 / 3
    for (let i = 0; i < CORE_POINTS; i++) {
      const dx = sigma * (y - x) * dt
      const dy = (x * (rho - z) - y) * dt
      const dz = (x * y - beta * z) * dt
      x += dx; y += dy; z += dz
      p[i * 3] = x * 0.7
      p[i * 3 + 1] = y * 0.7
      p[i * 3 + 2] = (z - 25) * 0.7
    }
    return p
  },
  // Torus surface
  cosmicTorus: () => {
    const p = new Float32Array(CORE_POINTS * 3)
    const R = 22, r = 9
    for (let i = 0; i < CORE_POINTS; i++) {
      const u = Math.random() * Math.PI * 2
      const v = Math.random() * Math.PI * 2
      p[i * 3] = (R + r * Math.cos(v)) * Math.cos(u)
      p[i * 3 + 1] = (R + r * Math.cos(v)) * Math.sin(u)
      p[i * 3 + 2] = r * Math.sin(v)
    }
    return p
  },
}

const shapeNames = Object.keys(shapes)

// Color palettes: [startR, startG, startB, endR, endG, endB] (0-1)
const palettes = [
  [0.0, 0.83, 0.96, 0.96, 0.47, 0.66],   // cyan -> pink
  [0.0, 0.83, 0.96, 0.66, 0.53, 0.98],   // cyan -> violet
  [0.20, 0.83, 0.60, 0.0, 0.83, 0.96],    // green -> cyan
  [0.96, 0.47, 0.66, 0.98, 0.74, 0.14],   // pink -> gold
  [0.66, 0.53, 0.98, 0.20, 0.83, 0.60],   // violet -> green
]

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)

  const initScene = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const THREE = await import("three")

    // --- Scene Setup ---
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x06060f, 0.0012)

    const camera = new THREE.PerspectiveCamera(
      70, canvas.clientWidth / canvas.clientHeight, 0.1, 1200
    )
    camera.position.z = 80

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)

    // --- Core Particle System ---
    let currentPositions = shapes.neuralBrain()
    let targetPositions = currentPositions.slice()
    let transitionAlpha = 1.0
    let shapeIdx = 0

    const coreGeo = new THREE.BufferGeometry()
    coreGeo.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3))

    const coreColors = new Float32Array(CORE_POINTS * 3)
    const pal = palettes[0]
    for (let i = 0; i < CORE_POINTS; i++) {
      const t = i / CORE_POINTS
      coreColors[i * 3] = pal[0] * (1 - t) + pal[3] * t
      coreColors[i * 3 + 1] = pal[1] * (1 - t) + pal[4] * t
      coreColors[i * 3 + 2] = pal[2] * (1 - t) + pal[5] * t
    }
    coreGeo.setAttribute("color", new THREE.BufferAttribute(coreColors, 3))

    const coreMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.65,
    })
    const corePoints = new THREE.Points(coreGeo, coreMat)
    const coreGroup = new THREE.Group()
    coreGroup.add(corePoints)
    scene.add(coreGroup)

    // --- Neural Network Nodes & Connections ---
    const nodePositions: THREE.Vector3[] = []
    const nodeGeo = new THREE.BufferGeometry()
    const nodePos = new Float32Array(NODE_COUNT * 3)
    const nodeCol = new Float32Array(NODE_COUNT * 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      const r = 20 + Math.random() * 30
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      nodePos[i * 3] = x
      nodePos[i * 3 + 1] = y
      nodePos[i * 3 + 2] = z
      nodePositions.push(new THREE.Vector3(x, y, z))
      // Soft cyan-white glow
      nodeCol[i * 3] = 0.5 + Math.random() * 0.5
      nodeCol[i * 3 + 1] = 0.8 + Math.random() * 0.2
      nodeCol[i * 3 + 2] = 0.9 + Math.random() * 0.1
    }
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3))
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeCol, 3))
    const nodeMat = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.8,
    })
    const nodeMesh = new THREE.Points(nodeGeo, nodeMat)
    scene.add(nodeMesh)

    // Synaptic connections (lines between nearby nodes)
    const linePositions: number[] = []
    const lineColors: number[] = []
    const connectionDist = 28
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < connectionDist) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          )
          lineColors.push(0, 0.83, 0.96, CONNECTION_OPACITY, 0, 0.83, 0.96, CONNECTION_OPACITY)
        }
      }
    }

    let lineMesh: THREE.LineSegments | null = null
    if (linePositions.length > 0) {
      const lineGeo = new THREE.BufferGeometry()
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3))
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00d4f5,
        transparent: true,
        opacity: CONNECTION_OPACITY,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      lineMesh = new THREE.LineSegments(lineGeo, lineMat)
      scene.add(lineMesh)
    }

    // --- Nebula Cloud ---
    const nebulaGeo = new THREE.BufferGeometry()
    const nebulaPos = new Float32Array(NEBULA_POINTS * 3)
    const nebulaCol = new Float32Array(NEBULA_POINTS * 3)
    for (let i = 0; i < NEBULA_POINTS; i++) {
      const r = 60 + Math.random() * 200
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      nebulaPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      nebulaPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      nebulaPos[i * 3 + 2] = r * Math.cos(phi)
      // Vary colors: some cyan, some pink, some white
      const colorRoll = Math.random()
      if (colorRoll < 0.4) {
        nebulaCol[i * 3] = 0; nebulaCol[i * 3 + 1] = 0.6 + Math.random() * 0.3; nebulaCol[i * 3 + 2] = 0.8 + Math.random() * 0.2
      } else if (colorRoll < 0.7) {
        nebulaCol[i * 3] = 0.8 + Math.random() * 0.2; nebulaCol[i * 3 + 1] = 0.3 + Math.random() * 0.2; nebulaCol[i * 3 + 2] = 0.5 + Math.random() * 0.3
      } else {
        const b = 0.15 + Math.random() * 0.15
        nebulaCol[i * 3] = b; nebulaCol[i * 3 + 1] = b; nebulaCol[i * 3 + 2] = b
      }
    }
    nebulaGeo.setAttribute("position", new THREE.Float32BufferAttribute(nebulaPos, 3))
    nebulaGeo.setAttribute("color", new THREE.Float32BufferAttribute(nebulaCol, 3))
    const nebulaMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.35,
    })
    const nebulaMesh = new THREE.Points(nebulaGeo, nebulaMat)
    scene.add(nebulaMesh)

    // --- Interaction ---
    let mouseX = 0, mouseY = 0, isMouseOver = false

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    const onEnter = () => { isMouseOver = true }
    const onLeave = () => { isMouseOver = false }
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mouseenter", onEnter)
    canvas.addEventListener("mouseleave", onLeave)

    // --- Shape Transition ---
    const transitionToNew = () => {
      if (transitionAlpha < 1 && transitionAlpha > 0) return
      shapeIdx = (shapeIdx + 1) % shapeNames.length
      targetPositions = shapes[shapeNames[shapeIdx]]()
      transitionAlpha = 0

      // Update colors
      const p = palettes[shapeIdx % palettes.length]
      const cols = coreGeo.attributes.color.array as Float32Array
      for (let i = 0; i < CORE_POINTS; i++) {
        const t = i / CORE_POINTS
        cols[i * 3] = p[0] * (1 - t) + p[3] * t
        cols[i * 3 + 1] = p[1] * (1 - t) + p[4] * t
        cols[i * 3 + 2] = p[2] * (1 - t) + p[5] * t
      }
      coreGeo.attributes.color.needsUpdate = true
    }

    const intervalId = setInterval(transitionToNew, 10000)

    // --- Animation Loop ---
    let time = 0
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate)
      time += 0.008

      // Morph transition
      if (transitionAlpha < 1) {
        transitionAlpha = Math.min(1, transitionAlpha + TRANSITION_SPEED)
        const arr = coreGeo.attributes.position.array as Float32Array
        const t = transitionAlpha
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        for (let i = 0; i < CORE_POINTS * 3; i++) {
          arr[i] = currentPositions[i] * (1 - ease) + targetPositions[i] * ease
        }
        coreGeo.attributes.position.needsUpdate = true
        if (transitionAlpha >= 1) currentPositions = targetPositions.slice()
      }

      // Rotate core
      coreGroup.rotation.z += 0.001
      coreGroup.rotation.y += 0.0005
      coreGroup.position.y = Math.sin(time * 0.4) * 1.5

      // Pulse nodes
      const nArr = nodeGeo.attributes.position.array as Float32Array
      for (let i = 0; i < NODE_COUNT; i++) {
        const originalNode = nodePositions[i]
        const pulse = 1 + Math.sin(time * 2 + i * 0.5) * 0.03
        nArr[i * 3] = originalNode.x * pulse
        nArr[i * 3 + 1] = originalNode.y * pulse
        nArr[i * 3 + 2] = originalNode.z * pulse
      }
      nodeGeo.attributes.position.needsUpdate = true

      // Pulse node brightness
      nodeMat.opacity = 0.6 + Math.sin(time * 1.5) * 0.2

      // Rotate network nodes slowly
      nodeMesh.rotation.y += 0.0008
      nodeMesh.rotation.x += 0.0003
      if (lineMesh) {
        lineMesh.rotation.y = nodeMesh.rotation.y
        lineMesh.rotation.x = nodeMesh.rotation.x
        lineMesh.material.opacity = CONNECTION_OPACITY + Math.sin(time * 0.8) * 0.03
      }

      // Nebula drift
      nebulaMesh.rotation.y += 0.00015
      nebulaMesh.rotation.x += 0.00008

      // Mouse interaction - smooth follow
      if (isMouseOver) {
        coreGroup.rotation.y += 0.08 * (mouseX * 0.5 - coreGroup.rotation.y + 0.0005)
        coreGroup.rotation.x += 0.08 * (-mouseY * 0.3 - coreGroup.rotation.x)
        camera.position.x += 0.02 * (mouseX * 5 - camera.position.x)
        camera.position.y += 0.02 * (-mouseY * 3 - camera.position.y)
      } else {
        coreGroup.rotation.y += 0.005 * (0 - coreGroup.rotation.y + 0.0005)
        coreGroup.rotation.x += 0.005 * (0 - coreGroup.rotation.x)
        camera.position.x += 0.01 * (0 - camera.position.x)
        camera.position.y += 0.01 * (0 - camera.position.y)
      }
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    // --- Resize ---
    const onResize = () => {
      if (!canvas.parentElement) return
      const w = canvas.parentElement.clientWidth
      const h = canvas.parentElement.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener("resize", onResize)

    return () => {
      clearInterval(intervalId)
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("resize", onResize)
      canvas.removeEventListener("mousemove", onMouseMove)
      canvas.removeEventListener("mouseenter", onEnter)
      canvas.removeEventListener("mouseleave", onLeave)
      renderer.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      nodeGeo.dispose()
      nodeMat.dispose()
      nebulaGeo.dispose()
      nebulaMat.dispose()
    }
  }, [])

  useEffect(() => {
    let cleanup: (() => void) | undefined
    initScene().then((fn) => { cleanup = fn })
    return () => cleanup?.()
  }, [initScene])

  return (
    <div className="relative h-full w-full">
      {/* Radial vignette */}
      <div className="absolute inset-0 pointer-events-none z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_100%)]" />
      {/* Top blend */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-[2] bg-gradient-to-b from-background via-background/50 to-transparent" />
      {/* Bottom blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-[2] bg-gradient-to-t from-background via-background/50 to-transparent" />
      {/* Left blend */}
      <div className="absolute top-0 bottom-0 left-0 w-24 pointer-events-none z-[2] bg-gradient-to-r from-background to-transparent" />
      {/* Scanlines subtle */}
      <div className="absolute inset-0 pointer-events-none z-[3] opacity-[0.015]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,245,0.1) 2px, rgba(0,212,245,0.1) 4px)" }} />
      <canvas ref={canvasRef} className="h-full w-full cursor-crosshair" />
      {/* Label */}
      <div className="absolute bottom-8 right-8 z-[4] text-[9px] font-mono text-muted-foreground/30 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse" />
        {"NEURAL_UNIVERSE.render()"}
      </div>
    </div>
  )
}
